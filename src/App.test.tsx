import React from 'react';
import { render, screen } from '@testing-library/react';
import ListOfStories from './components/ListOfStories';
import StoryItem from './components/StoryItem';
import ApiService from './components/services/ApiService';

import App from './App';

test('renders test react import of App subs', () => {
  render(<App />);
  expect(ListOfStories).toBeDefined();
  expect(StoryItem).toBeDefined();
  expect(ApiService).toBeDefined();
  
  //expect(link).toBeInTheDocument();
});
