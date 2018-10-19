import React, { Component } from "react";
import Login from '../login/login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrettyHome from './homeStyles';

class Home extends Component {
    render() {
        return (
            <div>
                <Login />
                <Link to="/product">go to product</Link>

                <PrettyHome>
                 hello world this is the home page
                </PrettyHome>
            </div>

        )
    }
}

export default Home;