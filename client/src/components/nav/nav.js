import React from 'react';
import { Link } from "react-router-dom";
import PrettyNav from './navStyles';
import { connect } from 'react-redux';


class Nav extends React.Component {
    handleLogOut = () => {
        this.props.dispatch({
            type: 'USER_LOGOUT_REQUEST'
            // no payload to send!
        });
    }

    displayNavLinks = () => {
        if (this.props.username !== '') {
            return (
                <PrettyNav>
                    <Link className='logo' to='/'>Thread Auction</Link>
                    <Link to='/create-auction'>Create Auction</Link>
                    <Link to='/profile'>{this.props.username}'s Profile</Link>
                    <Link to='/' onClick={this.handleLogOut}>Log Out</Link>
                </PrettyNav>
            )
        } else if (this.props.username === '') {
            return (
                <PrettyNav>
                    <Link className='logo' to='/'>Thread Auction</Link>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </PrettyNav>
            )
        } else {
            return (
                <div>
                    <span>something went wrong</span>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.displayNavLinks()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('Product: mapStateToProps state',state);
    return {
      username: state.username,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(Nav);
