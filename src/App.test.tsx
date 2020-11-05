import "@testing-library/jest-dom/extend-expect";
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import ListOfStories from './components/ListOfStories';
import StoryItem from './components/StoryItem';
import { render, waitForElement, waitForElementToBeRemoved} from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act} from 'react-dom/test-utils';
import App from './App';
import ApiService from './components/services/ApiService';
import axios, { AxiosResponse } from 'axios';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Done } from "@material-ui/icons";
Enzyme.configure({ adapter: new Adapter() });


const axiosResponse: AxiosResponse = {
  data: [ 24992517, 24990658, 24989094, 24991447, 24992552, 24993013, 24990233, 24989682, 24991908, 24990613, 24989],
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

const range = (n: number) => [...Array(n).keys()];
const mockedStories: number[] = range(10);

jest.mock('axios');


/*const mockAxios = {
  default: {
    get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
  },
  get: jest.fn(() => Promise.resolve(axiosResponse)),
};
*/
let container:any = null;

beforeEach(() => {
  (axios.get as any).mockResolvedValue(axiosResponse);
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterEach(() =>{
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})


jest.useFakeTimers();
describe("App component", () => {
  
  /* to mock useEffect from https://gist.github.com/marco-souza/d5243bd1ff1925176c5e1062f9bfd8fe
  

*/
  test('renders test react import of App subs with props[]', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
    expect(ListOfStories).toBeDefined();
    expect(StoryItem).toBeDefined();
    expect(ApiService).toBeDefined();
  });
  test('test App with mockedStories', async() => {
    expect.assertions(2);
    await act(async () => {
      render(<App />, container);
      //container = mount(<App />)
      expect(container).toBeDefined();
     // await new Promise(resolve => setImmediate(resolve));
      //container.update();
    }); 
    //console.log(container.debug());
    expect(container.instance()).toBeDefined() 
  });
  /*
  test('ListOfStories test useEffect', () => {
    expect(props.fetchStories).toHaveBeenCalledTimes(1);
    expect(props.fetchStories).toHaveReturned();

   
  });*/
 
  test('handles async useEffect', async () => {
    container = mount(<App />);
    await act(async () => {
        await Promise.resolve(container);
        await new Promise(resolve => setImmediate(resolve));
        container.update();
    });
    console.log(container.debug());
  });
  test('stories in ListOfStories', () => {
   // expect(container.find(ListOfStories).props().stories.length).toEqual(10);
  });
});
/*export interface IUseFetch {
  response: any;
  loading: boolean;
  error: boolean;
}*/