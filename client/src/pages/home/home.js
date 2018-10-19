import React, { Component } from "react";
import Login from '../login/login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Home extends Component {
    render() {
        return (
            <div>
                <Login />
                <Link to="/product">go to product</Link>

            </div>
        )
    }
}

export default Home;