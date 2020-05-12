import React from 'react';
import {CssBaseline} from '@material-ui/core';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Root from './Root';

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
        <CssBaseline />
        <Root />
        </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
