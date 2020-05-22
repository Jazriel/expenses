import MomentUtils from '@date-io/moment';
import {CssBaseline} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Root from './Root';
import Notifications from './notifications/notifications';
import store from './redux';


function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <Notifications>
          <Router>
            <CssBaseline />
            <Root />
          </Router>
        </Notifications>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
