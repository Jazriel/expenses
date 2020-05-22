import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Route, 
  Switch, 
} from 'react-router-dom';

import AddExpenses from './add-expenses/AddExpenses';
import LoggedIn from './logged-in/LoggedIn';
import Expenses from './expenses/Expenses';
import Historic from './historic/Historic';
import MiniDrawer from './mini-drawer/MiniDrawer';
import {addExpense} from './firebase';
import {actionCreators} from './redux';
import {userSelector} from './redux/userState';

function Root() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  
  return (
    <MiniDrawer title='Expenses'>
      <Switch>
        <Route exact path='/'>
        </Route>
        <Route path='/logged-in'>
          <LoggedIn/>
        </Route>
        <Route path='/expenses/add'>
          <AddExpenses onSubmit={(expense) => {
            return addExpense(user.uid, expense).then(() => {
              dispatch(actionCreators.addExpense(expense));
            });
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
