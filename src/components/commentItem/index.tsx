import React, { useState } from "react";
import {IComment} from '../interfaces/comment';

type Props = {
    comment: Partial<IComment>
}

const CommentItem: React.FC<Props> = ({comment}) => {
    //console.log('commentItem', comment)
    const {id, text, time, type} = comment;

    return (
        <div className="commentItem"> 
            { type === 'comment'&&
                <div key={id}>
                    <div>{text}</div> 
                    <p><b>time:</b>{time}</p> 
                </div>
            } 
        </div>
    );    
}
export default CommentItem;
