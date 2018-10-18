import React from 'react';
import { connect } from 'react-redux';

class ProductSwitch extends React.Component {
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
    console.log('Product: mapStateToProps state',state);
    return {
      username: state.username,
      password: state.password,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(ProductSwitch);