import React, { useState } from 'react';

import {
  Redirect, 
  Route, 
  Switch, 
} from 'react-router-dom';

import AddExpenses from './add-expenses/AddExpenses';
import LoggedIn from './logged-in/LoggedIn';
import Expenses from './expenses/Expenses';
import Historic from './historic/Historic';
import MiniDrawer from './mini-drawer/MiniDrawer';

function Root() {
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(null);
  

  return (
    <MiniDrawer title='Expenses' user={user}>
      {redirect}
      <Switch>
        <Route exact path='/'>
        </Route>
        <Route path='/logged-in'>
          <LoggedIn/>
        </Route>
        <Route path='/expenses/add'>
          <AddExpenses onSubmit={() => {
            // addExpense
          }} />
        </Route>
        <Route path='/expenses'>
          <Expenses/>
        </Route>
        <Route path='/historic'>
          <Historic/>
        </Route>
      </Switch>
    </MiniDrawer>
  );
}

export default Root;
