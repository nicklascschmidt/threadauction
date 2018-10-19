import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from './pages/userProfile/userProfile';
import Nav from './components/nav/nav';
import Home from './pages/home/home';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// pages

// test
import ProductSwitch from './pages/productSwitch';


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

const App = () => (
  <Router>
    <Provider store={store}>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/userProfile" component={UserProfile} />
          {/* <Route exact path="/product" component={Product} /> */}
          {/* <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Provider>
  </Router>
);

export default App;
