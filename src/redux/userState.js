const actions = {
    setUser: 'SET_USER',
    clearUser: 'CLEAR_USER',
}

const user = (state = {user: undefined}, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_TODO':
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }

  const actionCreators = {

  }
  
  const userSelector = (state) => state.user;

  export default todos
  