import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { loadState, saveState } from './localstorage';

const persistedState = loadState();

const initialState = {
    username: '',
    isLoggedIn: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'USER_LOGIN_REQUEST':
        console.log('global state updated - user logged in');
        return {
          username: action.payload.username,
          isLoggedIn: action.payload.isLoggedIn
        }
      case 'USER_LOGOUT_REQUEST':
        console.log('global state updated - user logged out');
        return {
            username: '',
            isLoggedIn: false
        }
      default:
        return state;
    }
}
  
const store = createStore(
    reducer,
    persistedState
);

store.subscribe(() => {
    saveState(store.getState());
})


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
