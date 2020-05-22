const actions = {
    setUser: 'SET_USER',
    clearUser: 'CLEAR_USER',
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.setUser:
            return {...action.payload};
        case actions.clearUser:
            return {};
        default:
            return state;
    }
}

const userActions = Object.freeze({
    setUser: (user) => ({type: actions.setUser, payload: user}),
    clearUser: () => ({type: actions.clearUser}),
});

const userSelector = (state) => state.user;

export {
    userActions,
    userReducer,
    userSelector,
};
