import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Wrapper from "./login-style";
import ErrorBox from '../../components/box/errorBox';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      submitted: false,
      errorMsg: null,
      isError: null,
      sendToRedux: false,
      sendToReduxData: null
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const userData = { username, password };
    this.setState({ loading: true });
    this.checkDbForUsernameAndPassword(userData);
  };

  sendToReduxStore = data => {
    console.log('this hit')
    const userData = {
      username: data.username,
      userId: data.id
    };

    this.props.dispatch({
      type: "USER_LOGIN_REQUEST",
      payload: userData
    });

    this.setState({
      submitted: true,
      loading: false,
      errorArray: [],
      isError: false,
      sendToRedux: false,
      sendToReduxData: null
    });
  };

  componentDidUpdate = () => {
    this.state.sendToRedux && this.sendToReduxStore(this.state.sendToReduxData);

    // When submitted, bring user to home page
    this.state.submitted && (window.location = '/');
  };

  checkDbForUsernameAndPassword = params => {
    axios
      .get("/api/users/login", { params })
      .then(resp => {
        if (resp.status === 200) {
          this.setState({ loading: false });

          // If resp is null, couldn't find the account. Else pass login info into redux store.
          if (resp.data === null) {
            this.setState({
              errorMsg: `We couldn't find your profile. Please check your username and password and try again.`,
              isError: true
            });
          } else {
            this.setState({
              errorMsg: null,
              isError: false,
              sendToRedux: true,
              sendToReduxData: resp.data
            });
            return;
          }
        }
      })
      .catch(err => {
        this.setState({
          errorMsg: `We ran into an issue trying to find your account.`,
          isError: true
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.isError && <ErrorBox><p>{this.state.errorMsg}</p></ErrorBox>}
        <Wrapper>
          <form>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={event => this.handleChange(event)}
            />
            <br />
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={event => this.handleChange(event)}
            />
            <br />
            {this.state.loading 
              ? <p>Loading...</p>
              : <button onClick={this.handleSubmit} className='btn btn-info'>submit</button>}
          </form>
        </Wrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
    userId: state.userId,
    isLoggedIn: true
  };
}

export default connect(mapStateToProps)(Login);
