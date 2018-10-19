import React from 'react';
import { connect } from 'react-redux';

class Signup extends React.Component {
    render() {
        return (
            <div>
                <h2>This is the signup page.</h2>
                <div>sup I'm a different component</div>
                <div>{this.props.username}</div>
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