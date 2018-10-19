import React from 'react';
import { connect } from 'react-redux';
import PrettyProfile from './profileStyles';
import './userProfile-style.css';

class UserProfile extends React.Component {
    render(){
        return(
            <PrettyProfile>
                <h1>This is the UserProfile page.</h1>
                <div className=''>Username: {this.props.username}</div>
                <div>Password: {this.props.password}</div>
            </PrettyProfile>
        )
    }
}

function mapStateToProps(state) {
    console.log('Product: mapStateToProps state',state);
    return {
      username: state.username,
      password: state.password,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(UserProfile);
