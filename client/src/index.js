import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';


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


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
,
    document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
