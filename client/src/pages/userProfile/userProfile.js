import React from 'react';
import { connect } from 'react-redux';
import PrettyProfile from './profileStyles';
import './userProfile-style.css';
import axios from 'axios';

class UserProfile extends React.Component {
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

            loading: true,
            errorArray: [],
            isError: null
        }
    }

    componentDidMount = () => {
        this.pullUserDataFromDb(this.props.userId);
        this.setState({
            loading: true,
            errorArray: [],
            isError: null
        })
    }

    pullUserDataFromDb = (userId) => {
        console.log('userId',userId);

        const userData = {
            userId: userId
        };

        axios.get('/api/user/profile', {
            params: userData
        })
        .then(resp => {
            console.log('resp.data',resp.data);

            if (resp.status === 200) {
                console.log('success');

                this.setState({
                    firstName: resp.data.firstName,
                    lastName: resp.data.lastName,
                    username: resp.data.username,
                    password: resp.data.password,
                    email: resp.data.email,
                    address: resp.data.address,
                    city: resp.data.city,
                    stateUSA: resp.data.stateUSA,
                    zip: resp.data.zip,
                    loading: false
                });

                if (resp.data === null) {
                    console.log('resp.data is null');
                    this.setState({
                        errorMsg: `We couldn\'t find your profile. Please reload the page.`,
                        isError: true
                    });
                } else {
                    // return an object to pass into redux
                    this.setState({
                        errorMsg: null,
                        isError: false
                    });
                    return
                }
            } else {
                console.log('front end /api/user/profile error');
            }

        }).catch(err => {
            this.setState({
                errorMsg: `We ran into an issue trying to find your account. Please reload the page.`,
                isError: true
            });
            console.log(err);
        });
    }
    
    
    
    render(){
        return(
            <PrettyProfile>
                {this.state.loading ? 
                    <h3>{this.state.isError ? this.state.errorMsg : 'Loading...'}</h3>
                : (
                <div>
                    <h1>My Profile</h1>
                    <p>Username: {this.state.username}</p>
                    <p>First name: {this.state.firstName}</p>
                    <p>Last name: {this.state.lastName}</p>
                    <p>Username: {this.state.username}</p>
                    <p>Password: {this.state.password}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Address: {this.state.address}</p>
                    <p>City: {this.state.city}</p>
                    <p>State: {this.state.stateUSA}</p>
                    <p>Zip: {this.state.zip}</p>
                </div>)
                }
            </PrettyProfile>
        )
    }
}

function mapStateToProps(state) {
    console.log('UserProfile: mapStateToProps state',state);
    return {
      username: state.username,
      userId: state.userId,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(UserProfile);
