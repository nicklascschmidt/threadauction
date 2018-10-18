import React, { Component } from 'react';
import Login from './pages/login';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// test
import Product from './pages/product';


const initialState = {
  username: '',
  password: '',
  isLoggedIn: false
}

const reducer = (state = initialState, action) => {
  console.log('action',action);
  console.log('state',state);
  switch(action.type) {
    case 'USER_LOGIN_REQUEST':
      console.log('global state updated');
      return {
        username: action.payload.username,
        password: action.payload.password,
        isLoggedIn: action.payload.isLoggedIn
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Login here:</h1>
          <Login />
          <Product />
          
        </div>
      </Provider>
    );
  }
}

export default App;
