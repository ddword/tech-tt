import React from "react";
import { shallow, mount } from "enzyme";
import ListOfStories from './';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ApiService from '../services/ApiService';

const mockStories = [1,3];

describe('tests in ListOfStories',() => {
    test('renders test react import of childs', () => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {Boolean}/>);
        expect(wrapper).toMatchSnapshot();
        expect(ApiService).toBeDefined();
    });
    test('children listItem with story', () => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {Boolean}/>)
        expect(wrapper.find('List').children(ListItem).length).toBeLessThanOrEqual(20);
    });
    test('state story', () => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {Boolean}/>);
        //expect(wrapper.contains('story')).toBeCalled();
    });
    
});    