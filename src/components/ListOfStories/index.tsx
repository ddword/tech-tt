import React, {useState} from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import { inherits } from "util";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listOfStories: {
        height: "inherit",
    },  
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    }
  }),
);

type Props = {
    stories: number[],
    selectStory(id:number): void
}

const ListOfStories: React.FC<Props> = ({stories, selectStory}) => {
    stories = stories||[];
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState<number>();
    
    const onSelect = (story: number, id: number) =>{
       //console.log('Select Story', story)
        selectStory(story);
        setSelectedIndex(id);
    }

    return (
        <div className={classes.listOfStories}>
            <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper}}
            anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <h4 style={{padding:"0 15px"}}>Stories:</h4>
                <List component="nav">
                { stories && stories.map((s,id) =>
                    <ListItem
                        button
                        selected={selectedIndex === id}
                        key={id} 
                        onClick={() => onSelect(s,id) }>
                        <a> { s }</a>   
                    </ListItem>
                )}
                </List>
            </Drawer>
        </div>
    );    
}
export default ListOfStories;
