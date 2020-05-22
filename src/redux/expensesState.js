const actions = {
    setExpenses: 'SET_EXPENSES',
    clearExpenses: 'CLEAR_EXPENSES',
    addExpense: 'ADD_EXPENSE',
}

const expensesReducer = (state = [], action) => {
    switch (action.type) {
        case actions.setExpenses:
            return [...action.payload];
        case actions.clearExpenses:
            return [];
        case actions.addExpense:
            return [...state, action.payload];
        default:
            return state;
    }
}

const expensesActions = Object.freeze({
    setExpenses: (expenses) => ({type: actions.setExpenses, payload: expenses}),
    clearExpenses: () => ({type: actions.clearExpenses}),
    addExpense: (expense) => ({type: actions.addExpense, payload: expense}),
});

const expensesSelector = (state) => state.expenses;

export {
    expensesActions,
    expensesReducer,
    expensesSelector,
};
