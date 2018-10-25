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
                <h4>Testing Redux data 123...</h4>
                <p>First name: {this.props.firstName}</p>
                <p>Last name: {this.props.lastName}</p>
                <p>Username: {this.props.username}</p>
                <p>Password: {this.props.password}</p>
                <p>Email: {this.props.email}</p>
                <p>Address: {this.props.address}</p>
                <p>City: {this.props.city}</p>
                <p>State: {this.props.stateUSA}</p>
                <p>Zip: {this.props.zip}</p>
            </PrettyProfile>
        )
    }
}


function mapStateToProps(state) {
    return {
        firstName: state.firstName,
        lastName: state.lastName,
        username: state.username,
        password: state.password,
        email: state.email,
        address: state.address,
        city: state.city,
        stateUSA: state.stateUSA,
        zip: state.zip
    };
}

export default connect(mapStateToProps)(UserProfile);
