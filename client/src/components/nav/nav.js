import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrettyNav from './navStyles';


class Nav extends React.Component {
    render() {
        return (
            <PrettyNav>
                <Link className='logo' to='/'>Thread Auction</Link>
                <Link to='/create-auction'>Create Auction</Link>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
                <Link to='/profile'>Profile</Link>
            </PrettyNav>
        )
    }
}

export default Nav;