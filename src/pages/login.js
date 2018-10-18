import React from 'react';
import { connect } from 'react-redux';


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }

    handleChange = (event) => {
        console.log('login handleChange');
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            submitted: true
        }, this.sendToReduxStore);

    }

    sendToReduxStore = () => {
        const { username, password } = this.state;

        const reduxData = {
            username: username,
            password: password
        }
        console.log('reduxData',reduxData);

        if (this.state.submitted) {
            this.loginAcceptedOrDenied(reduxData);
        }
    }

    loginAcceptedOrDenied = (data) => {
        // check db for login data here
        data.isLoggedIn = true;

        this.props.dispatch({
            type: 'USER_LOGIN_REQUEST',
            payload: data
        });
        this.setState({
            submitted: false
        });
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={event => this.handleChange(event)}
                    />
                    <input
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={event => this.handleChange(event)}
                    />
                    <button onClick={this.handleSubmit}>submit</button>
                </form>
                <p>State user: {this.state.username}</p>
                <p>State pw: {this.state.password}</p>
                <p>Global props user: {this.props.username}</p>
                <p>Global props pw: {this.props.password}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('SENDING: mapStateToProps state',state);
    return {
      username: state.username,
      password: state.password,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(Login);