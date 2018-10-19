import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/home/home";
// import Login from './pages/login/login';

import UserProfile from './pages/userProfile/userProfile';
import Nav from './components/nav/nav';
import Home from './pages/home/home';

// test
import ProductSwitch from './pages/productSwitch';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/userProfile" component={UserProfile} />
        {/* <Route exact path="/product" component={Product} /> */}
        {/* <Route exact path="/books" component={Books} />
        <Route exact path="/books/:id" component={Detail} />
        <Route component={NoMatch} /> */}
        </Switch>
      </Router>
    )
  }
};

export default App;
