import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import UserProfile from './pages/userProfile';
import Nav from './components/nav/nav';
import Home from './pages/home/home';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Signup from './pages/signup';
import CreateAuction from './pages/createAuction';
import Product from './pages/product';
import OrderHistory from './pages/orderHistory';
import './app-style.css';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className='background-image container-padding'>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/product/:auctionId" component={Product} />
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/order-history" component={OrderHistory} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/create-auction" component={CreateAuction} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
};

export default App;
