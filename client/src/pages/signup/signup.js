import React from 'react';
import { connect } from 'react-redux';
import './signup-style.css';
import { validateInputs } from './userValidation';

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
            errorArray: []
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

        this.setState({loading: true}, () => {
            // run validate user inputs call
            // if validation succeeds
            // save to database
            // when database save succeds, send to redux store and set state to
            // {submitted: true, loading : false}
            // send to store
            this.setState({
                submitted: true
            }, this.sendToReduxStore);

        })
    }

    sendToReduxStore = () => {
        const { firstName, lastName, username, password, email, address, city, stateUSA, zip } = this.state;

        const reduxData = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
            address: address,
            city: city,
            stateUSA: stateUSA,
            zip: parseInt(zip)
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
                {this.state.submitted ? <div className='error-box'>{this.displayErrors()}</div> : ''}
                {/* {this.state.submitted ? <div className='error-box'>{this.displayErrors()}</div> : <div className='error-box'>odgoidfgads</div>} */}

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
                        {this.state.loading ? 'Loading' : <button className='btn btn-primary submit-button' onClick={this.handleSubmit}>submit</button>}
                    </div>
                    
                </form>

                <br></br>

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
            </div>
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

export default connect(mapStateToProps)(Signup);