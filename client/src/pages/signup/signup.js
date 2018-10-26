import React from 'react';
import { connect } from 'react-redux';
import './signup-style.css';
import { validateInputs } from './userValidation';
import axios from 'axios';
import { ThemeConsumer } from 'styled-components';

class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            address: '',
            city: '',
            stateUSA: '',
            zip: '',
            submitted: false,
            loading: false,
            errorArray: [],
            isError: null
        }
    }

    componentDidMount = () => {
        this.setState({
            submitted: false
        });
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

        this.setState({loading: true}, this.saveInputs());
    }

    saveInputs = () => {
        
        const { firstName, lastName, username, password, email, address, city, stateUSA, zip } = this.state;
        const userData = {
            firstName: firstName.toString(),
            lastName: lastName.toString(),
            username: username.toString(),
            password: password.toString(),
            email: email.toString(),
            address: address.toString(),
            city: city.toString(),
            stateUSA: stateUSA.toString(),
            zip: zip.toString()
        }
        console.log('saveInputs userData',userData);

        const errorObject = this.validateUserInputs(userData);
        console.log('validateUserInputs returned errorObject',errorObject);

        // if validateUserInputs returns an error, then show to the user. Else, run sendUserDataToDb.
        if (errorObject.isError) {
            console.log('WOAH we got an error. Do not send data to db');
            this.setState({
                errorArray: errorObject.errorArray,
                isError: true
            });
        } else {
            this.sendUserDataToDb(userData);
        }
    }

    validateUserInputs = (data) => {
        console.log('validating inputs...');

        let errorObject = validateInputs(data);        
        return errorObject;
    }

    sendUserDataToDb = (data) => {
        console.log('sending user data to db....');

        axios.post('/api/user/create', data)
            .then(resp => {
                console.log(resp.data);
                if (resp.status === 200) {
                    console.log('success');
                } else {
                    // not so much
                }
                this.setState({
                    submitted: true
                });
            }).catch(err => {
                alert("There was a problem saving your account");
            })
        // when database save succeds, send to redux store and set state to
        // {submitted: true, loading : false}
        // send to store
        
        // }, this.sendToReduxStore);

    }


    loginAcceptedOrDenied = (data) => {
        // check db for login data here
        data.isLoggedIn = true;

        this.props.dispatch({
            type: 'USER_SIGNUP_REQUEST',
            payload: data
        });

        // bring user to login page
        window.location = '/login';
    }

    displayErrors = () => {
        return this.state.errorArray.map((errorMsg , n) => {
            return <p key={n}>{errorMsg}</p>
        })
    }


    
    render() {
       
        return (
            <div className='container'>
                <h3>Please fill out the information below.</h3>
                {this.state.isError ? <div className='error-box'>{this.displayErrors()}</div> : ''}
                {/* <div className='error-box'>{this.displayErrors()}</div> */}

                <form>
                    <div className='row form-style'>
                        <div className='col-6'>
                            <div>
                                <h4>User Info</h4>
                                <span>First name: </span>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                            <div>
                                <span>Last name: </span>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                            <div>
                                <span>Username: </span>
                                <input
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                            <div>
                                <span>Password: </span>
                                <input
                                    type="text"
                                    name="password"
                                    value={this.state.password}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                            <div>
                                <span>Email: </span>
                                <input
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <h4>Shipping Info</h4>
                            <div>
                                <span>Address: </span>
                                <input
                                    type="text"
                                    name="address"
                                    value={this.state.address}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                            <div>
                                <span>City: </span>
                                <input
                                    type="text"
                                    name="city"
                                    value={this.state.city}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                            <div>
                                <span>State: </span>
                                <input
                                    type="text"
                                    name="stateUSA"
                                    value={this.state.stateUSA}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                            <div>
                                <span>Zip: </span>
                                <input
                                    type="text"
                                    name="zip"
                                    value={this.state.zip}
                                    onChange={event => this.handleChange(event)}
                                />
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='align-center'>
                        <button className='btn btn-primary submit-button' onClick={this.handleSubmit}>submit</button>
                        {/* {this.state.loading ? 'Loading' : <button className='btn btn-primary submit-button' onClick={this.handleSubmit}>submit</button>} */}
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default (Signup);