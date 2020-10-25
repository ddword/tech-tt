import React, { useState, useEffect } from "react";
import ListOfStories from './components/ListOfStories';
import StoryItem from './components/StoryItem';
import {IStory} from './components/interfaces/story';
import {IComment} from './components/interfaces/comment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

// actions from https://github.com/HackerNews/API
const axios = require('axios').default;
const endpoint = 'https://hacker-news.firebaseio.com/v0/';

async function getListOfStories() {
  return await axios({
    method: 'get',
    url: `${endpoint}topstories.json` + `?print=pretty`,
  })
}

async function getStory(id:number){
  return await axios({
    method: 'get',
    url: `${endpoint}item/` + id + `.json?print=pretty`,
  })
}  

async function getComment(id:number){
  return await axios({
    method: 'get',
    url: `${endpoint}item/` + id + `.json?print=pretty`,
  })
}
// styles
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      //height: '100vh',
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

function App() {
  //state
  const[stories, setStories] = useState<number[]>([])
  const[story, setOneStory] = useState<Partial<IStory>>({});
  const[comment, setOneComment] = useState<Partial<IComment>>({});

  useEffect(() => {
    getListOfStories().then((res:any) => {
      let data = res.status == 200 ? res.data : [];
      // get first 10 top stories 
      setStories(data.splice(0, 10))
    })
    .catch((error:Promise<Error>) => {
      console.error('Error in getListOfStories' + error);
    })
  }, [])

  function handleStory(id:number) {
    if (story?.id === id) {
      return false;
    }
    //Promise<T| Error>
    getStory(id).then((res:any) => {
      const data = res.status == 200 ? res.data : [];
      //remove tags from text
      if (data.text) {
        data.text = data.text.replace( /(<([^>]+)>)/ig, '');
      }
      setOneStory(data);
      if (story?.id !== id) {
        setOneComment({})
      }
    })
    .catch((error:Promise<Error>) => {
      console.error('Error in getStory' + error);
    }) 
  }

  function handleComment(id:number) {
    if (comment?.id === id) {
      return false;
    }
    getComment(id).then((res:any) => {
      const data = res.status == 200 ? res.data : [];
      //remove tags from text
      if (data.text) {
        data.text = data.text.replace( /(<([^>]+)>)/ig, '');
      }
      setOneComment(data);
    })
    .catch((error:Promise<Error>) => {
      console.error('Error in getComment' + error);
    }) 
  }

 console.log('Comment', comment)
 const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <h3> First 10 top stories </h3>
          </Toolbar>
        </AppBar>    
          <ListOfStories stories={stories} selectStory = {handleStory}/>
          <main className={classes.content}>
            <div className={classes.toolbar} />
              {story&& <StoryItem story={story} selectComment = {handleComment} commentContent={comment}/>}
          </main>  
      </div>
    </div>  
  );
}

export default App;
