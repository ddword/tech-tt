import React, { useState } from "react";
import CommentItem from '../commentItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IStory} from '../interfaces/story';
import {IComment} from '../interfaces/comment';

type Props = {
    story: Partial<IStory>,
    commentContent: Partial<IComment>,
    selectComment(id:number): void
}
const storyHeight = 400;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    storyItem: {
        maxHeight:'40%'
    },
    commentsList:{
        //height: `calc(100% - ${storyHeight}px)`,
        maxHeight: '60%',
        overflowY: 'scroll',
        position: 'absolute',
        width: `calc(100% - 300px)`,
        // marginLeft: storyHeight,
    }
  })
); 

const StoryItem: React.FC<Props> = ({story, commentContent, selectComment}) => {
    console.log('storyItem', story)
    const{id, kids, score, text, title, time, type, url} = story;
    //get first 20 comments
    let comments = kids?.slice(0,20);

    const onSelect = (comment: number) =>{
        console.log('comment select', comment)
        selectComment(comment)
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>  
            { type === 'story'?
            <div className={classes.storyItem}>
                <Card variant="outlined" key={id}>
                    <CardContent>        
                        <p> <b>{title}</b></p>
                        <p> {text} </p> 
                        <p> <b>score:</b>{score} | <b>time:</b>{time}</p> 
                        <a href={url} target='blank'>{url}</a>
                    </CardContent> 
                </Card> 
                <h4 style={{padding:"0 15px"}}>Comments:</h4>    
                <div className={classes.commentsList}>  
                    {comments&& comments.map((comment,id) =>
                        <Accordion key={id}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="comment-content"
                            id="comment-header"
                            onClick={() => onSelect(comment)}>
                                <a>{comment}</a>
                            </AccordionSummary>
                            <AccordionDetails>
                                {commentContent && <CommentItem comment={commentContent}/>}
                            </AccordionDetails> 
                        </Accordion>    
                    )} 
                </div>  
                </div>
            :  <h4 style={{padding:"0 15px"}}>The story Item</h4>        
            }
        </div>
    );    
}
export default StoryItem;
