import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './Dashboard';
import { findByTestAttr } from '../../../utils/testing/testUtils';

const setUp = (props = {}) => {
    const component = shallow(<Dashboard {...props} />);
    return component;
}

describe('Dashboard component', () => {
    let component: any;
    beforeEach(() => {
        component = setUp();
    });

    test('It should render without errors', () => {
        const wrapper = findByTestAttr(component, 'dashboardComponent');
        expect(wrapper.length).toBe(1);
    });

})