import {combineReducers, createStore} from 'redux';

import {userReducer, userActions} from './userState';
import {expensesReducer, expensesActions } from './expensesState';

const rootReducer = combineReducers({
    user: userReducer,
    expenses: expensesReducer,
});

const store = createStore(rootReducer);

export const actionCreators = Object.freeze({
    ...userActions,
    ...expensesActions,
}) 

export {store as default};
