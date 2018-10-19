import React from 'react';
import { connect } from 'react-redux';

class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }
    
    render() {
        return (
            <div>
                <h2>This is the signup page.</h2>
                <h3>Please fill out the information below.</h3>
                <form>
                    <label for="">Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={event => this.handleChange(event)}
                    />
                    <label for="">Password: </label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={event => this.handleChange(event)}
                    />
                    <label for="">Email: </label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={event => this.handleChange(event)}
                    />
                    <label for="">Password: </label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={event => this.handleChange(event)}
                    />
                </form>
                <div>Username: {this.props.username}</div>
                <div>Password: {this.props.password}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('Product: mapStateToProps state',state);
    return {
      username: state.username,
      password: state.password,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(Signup);