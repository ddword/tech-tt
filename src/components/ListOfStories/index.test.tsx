import React from "react";
import { shallow, mount } from "enzyme";
import ListOfStories from './';
import ListItem from '@material-ui/core/ListItem';
import ApiService from '../services/ApiService';

const num = 10;
const rangeStories = (num: number) => [...Array(num).keys()];
const mockStories = rangeStories(num);

describe('tests in ListOfStories',() => {
    test('renders test react import of childs', () => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {() => {}}/>);
        expect(wrapper).toMatchSnapshot();
        expect(ApiService).toBeDefined();
    });
    test('children listItem with story', async() => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {() => {}}/>)
        wrapper.find(ListItem).at(0).simulate("click", {
            target: { value: 0 }
        });
        expect(wrapper.find(ListItem).at(0).props().selected).toEqual(true);
        expect(wrapper.find(ListItem).at(0).find('a').text().trim()).toEqual('0');
    });
    test('length of stories', async() => {
        const wrapper = shallow(<ListOfStories stories={mockStories} selectStory = {() => {}}/>);
        /** infortunatly state works just for class-based component
         * expect(wrapper.state())*/
        expect(wrapper.find(ListItem).length).toBeLessThanOrEqual(num);
    });
    
});    