import React from 'react';
import { shallow, mount } from "enzyme";
import ListOfStories from './components/ListOfStories';
import StoryItem from './components/StoryItem';
import ApiService from './components/services/ApiService';

import App from './App';

describe("App component", () => {
  test('renders test react import of App subs', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);

    expect(ListOfStories).toBeDefined();
    expect(StoryItem).toBeDefined();
    expect(ApiService).toBeDefined();
  });
  test('state stories', () => {

  });
});