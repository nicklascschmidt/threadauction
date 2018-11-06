import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import HomeNav from './HomeNav';
import ProfileNav from './ProfileNav';
import AuctionComplete from '../notifications/auctionComplete';

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this);   
        this.displayNavLinks = this.displayNavLinks.bind(this);
    }

    handleLogOut = () => {
        this.props.dispatch({
            type: 'USER_LOGOUT_REQUEST'
            // no payload to send!
        });
    }

    displayNavLinks = () => {
        if (this.props.username !== null) {
            return (
                <ProfileNav>
                   <Link className='logo' to='/'>Thread Auction</Link>
                   <Link className='create' to='/create-auction'>Create Auction</Link>
                   <Link className='welcome' to='/order-history'>Order History</Link>
                   <Link className='welcome' to='/profile'>{this.props.username}'s Profile</Link>
                   <Link className='welcome' to='/order-history'><AuctionComplete className='notification'/></Link>
                   <Link className='logout' to='/' onClick={this.handleLogOut}>Log Out</Link>
               </ProfileNav>
           )
       } else if (this.props.username === null) {
           return (
               <HomeNav>
                   <Link className='logo' to='/'>Thread Auction</Link>
                   <Link className='login' to='/login' className='login'>Login</Link>
                   <Link className='signup' to='/signup' className='signup'>Signup</Link>
               </HomeNav>
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
