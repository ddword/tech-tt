import React from "react";
import { render, screen } from '@testing-library/react';
import CommentItem from '../commentItem';
import StoryItem from './';
import {IStory} from '../interfaces/story';
import ApiService from '../services/ApiService';

type Props = {
    story: Partial<IStory>
}
const mockStory:Partial<IStory> = {
    id: 101,
    kids: [],
    score: 32,
    text: '',
    title: 'Mock title',
    type: 'story',
    url : "http://www.getdropbox.com/u/2/screencast.html"
}

test('renders test react import of StoryItem', () => {
    render(<StoryItem story={mockStory}/>);
    expect(CommentItem).toBeDefined();
    expect(ApiService).toBeDefined();
    
    //expect(link).toBeInTheDocument();
  });