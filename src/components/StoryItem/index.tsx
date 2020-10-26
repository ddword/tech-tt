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

import ApiService from '../services/ApiService';

type Props = {
    story: Partial<IStory>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    storyItem: {
        maxHeight:'40%'
    },
    commentsList:{
        maxHeight: '60%',
        overflowY: 'scroll',
        position: 'absolute',
        width: `calc(100% - 300px)`,
    }
  })
); 

const StoryItem: React.FC<Props> = ({story}) => {
    console.log('Story', story)

    const {id, kids, score, text, title, time, type, url} = story;
    const [commentContent, setOneComment] = useState<Partial<IComment>>({});

    const [expanded, setExpanded] = useState<number | boolean>(false);

    
    //get first 20 comments
    let comments = kids?.slice(0,20);

    const onSelect = (comment: number) =>(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        event.stopPropagation();
        event.preventDefault();  
        setExpanded(isExpanded ? comment : false); 
        console.log('!!Comment select', comment)
        handleSelectComment(comment)
    }

    function handleSelectComment(id:number) {
        if (commentContent?.id === id) {
          return false;
        }

        ApiService.getComment(id).then((res:any) => {
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
                        <Accordion key={id}
                            expanded={expanded === comment}
                            onChange={onSelect(comment)}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={comment.toString() + '-content'}
                            id={comment.toString() + '-header'}>
                                <a>{comment}</a>
                            </AccordionSummary>
                            <AccordionDetails>
                                {commentContent ? <CommentItem comment={commentContent}/> : null}
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
