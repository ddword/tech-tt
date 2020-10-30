import React from "react";
import { shallow, mount } from "enzyme";
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
describe('tests in StoryItem', () =>{
    test('renders test react import of StoryItem', () => {
        const wrapper = shallow(<StoryItem story={mockStory}/>);
        expect(wrapper.exists()).toBeTruthy();
        expect(CommentItem).toBeDefined();
        expect(ApiService).toBeDefined();
        
        //expect(link).toBeInTheDocument();
    });
});    