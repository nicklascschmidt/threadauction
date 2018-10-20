import React from 'react';
import { connect } from 'react-redux';
import './signup-style.css';
import { validateInputs } from './userValidation';

class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            email: '',
            address: '',
            city: '',
            stateUSA: '',
            zip: '',
            submitted: false,
            
            errorArray: []
        }
    }

    handleChange = (event) => {
        console.log('signup handleChange');
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            submitted: true
        }, this.sendToReduxStore);
    }

    sendToReduxStore = () => {
        const { username, password, email, address, city, stateUSA, zip } = this.state;

        const reduxData = {
            username: username,
            password: password,
            email: email,
            address: address,
            city: city,
            stateUSA: stateUSA,
            zip: zip
        }
        console.log('reduxData',reduxData);

        if (this.state.submitted) {
            // this.loginAcceptedOrDenied(reduxData);
            this.validateUserInputs(reduxData);
            // validateInputs(reduxData);
        }
    }


    validateUserInputs = (data) => {
        console.log('validating inputs...');

        let errorArrayPopulated = validateInputs(data);
        console.log('errorArrayPopulated',errorArrayPopulated);

        this.setState({
            errorArray: errorArrayPopulated
        })

    }


    loginAcceptedOrDenied = (data) => {
        // check db for login data here
        data.isLoggedIn = true;

        this.props.dispatch({
            type: 'USER_SIGNUP_REQUEST',
            payload: data
        });
        this.setState({
            submitted: false
        });

        // bring user to login page
        window.location = '/login';
    }


    
    render() {
        return (
            <div>
                <h2>This is the signup page.</h2>
                <h3>Please fill out the information below.</h3>
                {/* <h4>{this.state.errorArray
                    .map(errorMessage => <span>{errorMessage}</span>)
                .reduce((prev, curr) => [prev, ', ', curr])}</h4> */}
                <h4>Errors: {this.state.errorArray.map(err => {
                    return <p>{err}</p>
                })}</h4>

                <form>
                    <h4>User Info</h4>
                    <label>Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={event => this.handleChange(event)}
                    />
                    <label>Password: </label>
                    <input
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={event => this.handleChange(event)}
                    />
                    <label>Email: </label>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={event => this.handleChange(event)}
                    />
                    <h4>Shipping Info</h4>
                    <label>Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={this.state.address}
                        onChange={event => this.handleChange(event)}
                    />
                    <label>City: </label>
                    <input
                        type="text"
                        name="city"
                        value={this.state.city}
                        onChange={event => this.handleChange(event)}
                    />
                    <label>State: </label>
                    <input
                        type="text"
                        name="stateUSA"
                        value={this.state.stateUSA}
                        onChange={event => this.handleChange(event)}
                    />
                    <label>Zip: </label>
                    <input
                        type="text"
                        name="zip"
                        value={this.state.zip}
                        onChange={event => this.handleChange(event)}
                    />
                    <br></br>
                    <button onClick={this.handleSubmit}>submit</button>

                </form>
                <h4>Testing Redux data 123...</h4>
                <p>Username: {this.props.username}</p>
                <p>Password: {this.props.password}</p>
                <p>Email: {this.props.email}</p>
                <p>Address: {this.props.address}</p>
                <p>City: {this.props.city}</p>
                <p>State: {this.props.stateUSA}</p>
                <p>Zip: {this.props.zip}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        password: state.password,
        email: state.email,
        address: state.address,
        city: state.city,
        stateUSA: state.stateUSA,
        zip: state.zip
    };
}

export default connect(mapStateToProps)(Signup);