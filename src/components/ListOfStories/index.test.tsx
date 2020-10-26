import React from "react";
import { render, screen } from '@testing-library/react';
import ListOfStories from './';
import ApiService from '../services/ApiService';

const mockStories = [1,3];

test('renders test react import of ListOfStories', () => {
    render(<ListOfStories stories={mockStories} selectStory = {Boolean}/>);
    expect(ApiService).toBeDefined();
    
    //expect(link).toBeInTheDocument();
});