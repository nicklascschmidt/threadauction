import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
// import Login from './pages/login/login';
import UserProfile from './pages/userProfile';
import Nav from './components/nav/nav';
import Home from './pages/home/home';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Signup from './pages/signup';
import CreateAuction from './pages/createAuction';


// test
import ProductSwitch from './pages/productSwitch';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/create-auction" component={CreateAuction} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default App;
