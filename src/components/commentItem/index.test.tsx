import React from "react";
import { render, screen } from '@testing-library/react';
import {IComment} from '../interfaces/comment';
import CommentItem from './';

type Props = {
    comment: Partial<IComment>
}
const mockComment: Partial<IComment> = {
    id: 18701,
    parent: 101,
    text : "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
    time : 1314211127,
    type: 'comment',
}

test('renders test react import of CommentItem', () => {
    render(<CommentItem comment={mockComment}/>);
    
    //expect(link).toBeInTheDocument();
  });