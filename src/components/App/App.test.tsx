import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import configureStore from '../../store';

const store = configureStore();

/**
 * @author Vishal Chavan
 */
describe('App component', () => {
    test('It should render without errors', () => {
        const component = shallow(<App {...store} />).dive();
        expect(component).toBeTruthy();
    });
})


