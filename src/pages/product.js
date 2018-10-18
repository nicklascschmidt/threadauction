import React from 'react';
import { connect } from 'react-redux';

class Product extends React.Component {
    render() {
        return (
            <div>
                <div>sup I'm a different component</div>
                <div>{this.props.username}</div>
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

export default connect(mapStateToProps)(Product);