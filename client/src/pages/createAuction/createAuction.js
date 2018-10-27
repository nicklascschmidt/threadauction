import React from 'react';
import './createAuction-style.css';
import { validateInputs } from './userValidation';
import axios from 'axios';


class CreateAuction extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            gender: '',
            category: '',
            startingPrice: '',
            minBidIncrement: '',
            createdAt: '',

            submitted: false,
            loading: false,
            errorArray: [],
            isError: null
        }
    }

    componentDidMount = () => {
        this.setState({
            title: '',
            description: '',
            gender: '',
            category: '',
            startingPrice: '',
            minBidIncrement: '',
            createdAt: '',
            
            submitted: false,
            loading: false,
            errorArray: [],
            isError: null
        });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({loading: true}, () => this.saveInputs());
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
                isError: true,
                loading: false
            },() => console.log(this.state));
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
                    this.setState({
                        submitted: true,
                        loading: false,
                        errorArray: [],
                        isError: false
                    });
                } else {
                    console.log('front end /api/user/create error');
                }
            }).catch(err => {
                this.setState({
                    errorArray: ['There was a problem saving your account']
                });
            });
        
    }

    componentDidUpdate = () => {
        if (this.state.submitted) {
            // bring user to login page
            window.location = '/login';
        }
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

                <form>
                    <div className='form-style'>
                        <div>
                            <h4>Item Info</h4>
                            <span>Title: </span>
                            <input
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={event => this.handleChange(event)}
                            />
                        </div>
                        <div>
                            <span>Description: </span>
                            <textarea
                                name="description"
                                value={this.state.description}
                                onChange={event => this.handleChange(event)}
                            />
                        </div>
                        <div>
                            <span>Gender: </span>
                            <input
                                type="text"
                                name="gender"
                                value={this.state.gender}
                                onChange={event => this.handleChange(event)}
                            />
                            <ul>
                                <li>
                                    <label for="male">
                                        <input type="radio" id="male" name="male" value="M"/>
                                        Male
                                    </label>
                                </li>
                                <li>
                                    <label for="female">
                                        <input type="radio" id="female" name="female" value="F"/>
                                        Female
                                    </label>
                                </li>
                                <li>
                                    <label for="unisex">
                                        <input type="radio" id="unisex" name="unisex" value="U"/>
                                        Unisex
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <span>Category: </span>
                            <input
                                type="text"
                                name="category"
                                value={this.state.category}
                                onChange={event => this.handleChange(event)}
                            />
                        </div>
                        <div>
                            <span>Starting Price: </span>
                            <input
                                type="text"
                                name="startingPrice"
                                value={this.state.startingPrice}
                                onChange={event => this.handleChange(event)}
                            />
                        </div>
                        <div>
                            <span>Minimum Bid Increment: </span>
                            <input
                                type="text"
                                name="minBidIncrement"
                                value={this.state.minBidIncrement}
                                onChange={event => this.handleChange(event)}
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className='align-center'>
                        {/* <button className='btn btn-primary submit-button' onClick={this.handleSubmit}>submit</button> */}
                        {this.state.loading ? 'Loading...' : <button className='btn btn-primary submit-button' onClick={this.handleSubmit}>submit</button>}
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default CreateAuction;