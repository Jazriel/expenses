import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import Notifications from './notifications/notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

configure({adapter: new Adapter()});

test('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CssBaseline)).toHaveLength(1);
    expect(wrapper.find(Provider)).toHaveLength(1);
    expect(wrapper.find(Notifications)).toHaveLength(1);
    expect(wrapper.find(Router)).toHaveLength(1);
    expect(wrapper.find(MuiPickersUtilsProvider)).toHaveLength(1);
});
