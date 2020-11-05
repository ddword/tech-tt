import React, { useState, useEffect } from "react";
import ApiService from './components/services/ApiService';
import ListOfStories from './components/ListOfStories';
import StoryItem from './components/StoryItem';
import {IStory} from './components/interfaces/story';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { AxiosError, AxiosPromise } from "axios";

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

interface IResponse {
  data: any,
  status?: number,
  error?: any
}

function useStoriesAPI() {
  //state
  const[stories, setStories] = useState<number[]>([])

  React.useEffect(() => {
    let didCancel = false;
    ApiService.getListOfStories().then((res:Partial<IResponse>) => {
      let data = res.status == 200 ? res.data : [];
      // get first 10 top stories 
      if (!didCancel && data)
        setStories(data.splice(0, 10))
    })
    .catch((error:Promise<Error>) => {
      console.error('Error in getListOfStories' + error);
    })
    return () => {
      didCancel = true;
    };
  }, [])

  return [stories];
}

const App = () => {
  //state
  const[stories] = useStoriesAPI()
  const[story, setOneStory] = useState<Partial<IStory>>({});
  //const[comment, setOneComment] = useState<Partial<IComment>>({});

  function handleStory(id:number) {
    if (story?.id === id) {
      return false;
    }
    //Promise<T| Error>
    ApiService.getStory(id).then((res:Partial<IResponse>) => {
      const data = res.status == 200 ? res.data : [];
      //remove tags from text
      if (data.text) {
        data.text = data.text.replace( /(<([^>]+)>)/ig, '');
      }
      setOneStory(data);
      if (story?.id !== id) {
        //setOneComment({})
        //Todo find the way to reset comment & comments
      }
    })
    .catch((error:Promise<Error>) => {
      console.error('Error in getStory' + error);
    }) 
  }

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
              {story&& <StoryItem story={story}/>}
          </main>  
      </div>
    </div>  
  );
}

export default App;
