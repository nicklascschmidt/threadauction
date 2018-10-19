import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/home/home";
// import Login from './pages/login/login';
// test
import ProductSwitch from './pages/productSwitch';


const App = () => (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product" component={ProductSwitch} />
          {/* <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} /> */}
        </Switch>
    </Router>
);

export default App;
