import React from "react";
import { connect } from "react-redux";
import Wrapper from "./login-style";
import { Card } from "../../components/form/form"; // input too
import axios from "axios";
import "./login-style";

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

  componentDidMount = () => {
    this.setState({
      loading: false,
      submitted: false,
      errorMsg: null,
      isError: null,
      sendToRedux: false,
      sendToReduxData: null
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;
    const userData = {
      username: username,
      password: password
    };
    console.log("userData", userData);

    this.setState({
      loading: true
    });

    this.checkDbForUsernameAndPassword(userData);
  };

  sendToReduxStore = data => {
    console.log("sending to redux store...");

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
    if (this.state.sendToRedux) {
      this.sendToReduxStore(this.state.sendToReduxData);
    }

    if (this.state.submitted) {
      console.log("user data submitted");

      // bring user to home page
      window.location = '/';
    }
  };

  checkDbForUsernameAndPassword = data => {
    axios
      .get("/api/user/login", {
        params: data
      })
      .then(resp => {
        console.log("resp.data", resp.data);

        if (resp.status === 200) {
          console.log("success");

          this.setState({
            loading: false
          });

          if (resp.data === null) {
            console.log("resp.data is null");
            this.setState({
              errorMsg: `We couldn't find your profile. Please check your username and password and try again.`,
              isError: true
            });
          } else {
            // return an object to pass into redux
            this.setState({
              errorMsg: null,
              isError: false,
              sendToRedux: true,
              sendToReduxData: resp.data
            });
            return;
          }
        } else {
          console.log("front end /api/user/create error");
        }
      })
      .catch(err => {
        this.setState({
          errorMsg: `We ran into an issue trying to find your account.`,
          isError: true
        });
        console.log(err);
      });
  };

  render() {
    return (
    
        <Wrapper>
          <Card>
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
              {this.state.loading ? (
                "Loading..."
              ) : (
                <button onClick={this.handleSubmit}>submit</button>
              )}
            </form>
          </Card>
          {this.state.isError ? (
            <div className="error-box">
              <p>{this.state.errorMsg}</p>
            </div>
          ) : (
            ""
          )}
        </Wrapper>
      
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
