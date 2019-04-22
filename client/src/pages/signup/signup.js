import React from 'react';
import SignupForm from './SignupStyle';
import { validateInputs } from './userValidation';
import axios from 'axios';
import ErrorBox from '../../components/box/errorBox';


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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true }, () => this.saveInputs());
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

    const errorObject = this.validateUserInputs(userData);

    // if validateUserInputs returns an error, then show to the user. Else, send data to DB.
    if (errorObject.isError) {
      this.setState({
        errorArray: errorObject.errorArray,
        isError: true,
        loading: false
      });
    } else {
      this.sendUserDataToDb(userData);
    }
  }

  validateUserInputs = (data) => {
    let errorObject = validateInputs(data);
    return errorObject;
  }

  sendUserDataToDb = (data) => {
    // TODO: UPDATED!
    axios.post('/api/users/signup', data)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            submitted: true,
            loading: false,
            errorArray: [],
            isError: false
          });
        }
      })
      .catch(err => {
        this.setState({ errorArray: ['There was a problem saving your account'] });
      });
  }

  componentDidUpdate = () => {
    // bring user to login page on page submit
    if (this.state.submitted) {
      window.location = '/login';
    }
  }

  displayErrors = () => {
    return this.state.errorArray.map((errorMsg, n) => {
      return <p key={n}>{errorMsg}</p>
    })
  }

  render() {
    return (
      <SignupForm>
        <h3 className="fillOut">Please fill out the information below.</h3>
        {this.state.isError && <ErrorBox className='error-box'>{this.displayErrors()}</ErrorBox>}

        <form>
          <div className="userInfo">
            <p className="userInfoHead">User Info</p>
            <div>
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                value={this.state.firstName}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                value={this.state.lastName}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={event => this.handleChange(event)}
              />
            </div>
          </div>
          <div className='shippingInfo'>
            <p className="shippingInfoHead">Shipping Info</p>
            <div>
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={this.state.address}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={this.state.city}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="State"
                name="stateUSA"
                value={this.state.stateUSA}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Zip"
                name="zip"
                value={this.state.zip}
                onChange={event => this.handleChange(event)}
              />
            </div>
          </div>
          <br></br>
          <div className='buttonDiv'>
            {this.state.loading ? 'Loading...' : <button className='submitBtn' onClick={this.handleSubmit}>submit</button>}
          </div>
        </form>
      </SignupForm>
    )
  }
}

export default Signup;