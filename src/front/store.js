export const initialStore = () => {
  return {
    message: null,
    users: [],
    auth: {
      token: localStorage.getItem('token') || null, // Recupera el token del localStorage si existe
      user: null,
      isAuthenticated: false
    }
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'set_users':
      return {
        ...store,
        users: action.payload
      };

    case 'signup_success':
    case 'login_success':
      return {
        ...store,
        auth: {
          token: action.payload.access_token,
          user: action.payload.user || null,
          isAuthenticated: true
        }
      };

    case 'logout':
      localStorage.removeItem('token'); // Limpia el token
      return {
        ...store,
        auth: {
          token: null,
          user: null,
          isAuthenticated: false
        }
      };

    case 'set_user_data':
      return {
        ...store,
        auth: {
          ...store.auth,
          user: action.payload
        }
      };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => 
          todo.id === id ? { ...todo, background: color } : todo
        )
      };

    default:
      console.error('Unknown action:', action.type);
      return store; // En lugar de throw Error, devolvemos el store sin cambios
  }    
}