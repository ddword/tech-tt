import React from "react";
import { shallow, mount } from "enzyme";
import ListOfStories from './';
import ListItem from '@material-ui/core/ListItem';
import ApiService from '../services/ApiService';

const num = 20;
const rangeStories = (num: number) => [...Array(num).keys()];
const mockStories = rangeStories(num);

describe('tests in ListOfStories',() => {
    test('renders test react import of childs', () => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {Boolean}/>);
        expect(wrapper).toMatchSnapshot();
        expect(ApiService).toBeDefined();
    });
    test('children listItem with story', async() => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {Boolean}/>)
        wrapper.find(ListItem).at(0).simulate("click", {
            target: { value: 101 }
        });
        expect(wrapper.find(ListItem).at(0).props().selected).toEqual(true);
        expect(wrapper.find(ListItem).at(0).find('a').text().trim()).toEqual('0');
    });
    test('length of stories', async() => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {Boolean}/>);
        /** infortunatly state works just for class-based component
        expect(wrapper.state())*/
        expect(wrapper.find(ListItem).length).toBeLessThanOrEqual(num);
    });
    
});    