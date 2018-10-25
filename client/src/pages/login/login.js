import React from 'react';
import { connect } from 'react-redux';
import * as Styles from './login-style';
import { Card } from '../../components/form/form'; // input too
import { Button } from '../../components/button/buttons';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitted: false,
            dbData: []
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

    dbButtonClick = () => {
        console.log('db button clicked...');
        axios.get(`/api/user`)
            .then(res => {
                console.log(res);

                // this.setState({ dbData }, () => {
                //     console.log(this.state.posts);
                // });
            });
    }

    render() {
        return (
            <div>
                <button onClick={this.dbButtonClick}>db button</button>
                <Styles.Wrapper>
                    <Card>
                        <form>
                            <label for="">Username: </label>
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={event => this.handleChange(event)}
                            />
                            <br></br>
                            <label for="">Password: </label>
                            <input
                                type="text"
                                name="password"
                                value={this.state.password}
                                onChange={event => this.handleChange(event)}
                            />
                            <br></br>
                            <button onClick={this.handleSubmit}>submit</button>
                            {/* <Button onClick={this.handleSubmit}>submit</Button> */}
                        </form>
                    </Card>
                    <p>State user: {this.state.username}</p>
                    <p>State pw: {this.state.password}</p>
                    <p>Global props user: {this.props.username}</p>
                    <p>Global props pw: {this.props.password}</p>
                </Styles.Wrapper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('Login: mapStateToProps state',state);
    return {
      username: state.username,
      password: state.password,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(Login);