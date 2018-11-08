import React from 'react';
import { connect } from 'react-redux';
import './userProfile-style.css';
import axios from 'axios';
import ProductListingProfile from "../../components/productListing/productListingProfile";


class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            address: '',
            city: '',
            stateUSA: '',
            zip: '',
            auctionArray: [],

            loading: true,
            errorArray: [],
            isError: null
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            loading: true,
            errorArray: [],
            isError: null
        }, () => {
            this.pullUserDataFromDb(this.state.userId);
            this.pullAuctionsFromDb(this.state.userId);
        })
    }

    pullUserDataFromDb = (userId) => {
        // console.log('userId',userId);

        let userData = {
            userId: userId
        };

        axios.get('/api/user/profile', {
            params: userData
        })
        .then(resp => {
            // console.log('resp.data',resp.data);

            if (resp.status === 200) {
                // console.log('success');

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
                        errorMsg: `We couldn't find your profile. Please reload the page.`,
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

        
    pullAuctionsFromDb = (userId) => {
        console.log('userId',userId);

        let userParams = {
            userId: userId
        };

        console.log('userParams',userParams);

        axios.get('/api/user/auctions', {
            params: userParams
        })
        .then(resp => {
            console.log('resp.data',resp.data);

            if (resp.status === 200) {
                console.log('success');

                this.setState({
                    auctionArray: resp.data
                }, () => {
                    console.log('auction array state',this.state.auctionArray)
                    this.displayAuctions(this.state.auctionArray);
                })

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

    displayAuctions = (auctionArray) => {
        // console.log('displaying auctions...',auctionArray);
        
        const auctionArrayMapped = this.state.auctionArray.map( (auction) => {
            // console.log('auction',auction);
            return (
                <ProductListingProfile
                    key={auction.title}
                    auctionId={auction.id}
                    imgLink={auction.imgLink}
                    title={auction.title}
                    startingPrice={auction.startingPrice}
                    createdAt={auction.createdAt}
                />
            )
        })

        return <div>{auctionArrayMapped}</div>
    }
    
    
    render() {
        return(
            <div className='container'>
                {this.state.loading ? 
                    <h3>{this.state.isError ? this.state.errorMsg : 'Loading...'}</h3>
                : (
                <div className='row'>
                    <div className='col-3'>
                        <div className='user-info-style text-center'>
                            <h2>My Profile</h2>
                            <hr className='hr'></hr>
                            <div className='text-left'>
                                <p><strong>Username: </strong>{this.state.username}</p>
                                <p><strong>Password: </strong>{this.state.password}</p>
                                <p><strong>Email: </strong>{this.state.email}</p>
                                <p><strong>First name: </strong>{this.state.firstName}</p>
                                <p><strong>Last name: </strong>{this.state.lastName}</p>
                                <p><strong>Address: </strong>{this.state.address}</p>
                                <p><strong>City: </strong>{this.state.city}</p>
                                <p><strong>State: </strong>{this.state.stateUSA}</p>
                                <p><strong>Zip: </strong>{this.state.zip}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='text-center'>
                            <div>
                                <div className='user-post-style'>
                                    <h2>My Posts</h2>
                                </div>
                                <div className="d-flex justify-content-around align-items-start">
                                    {this.state.auctionArray.length > 0 ? <div>{this.displayAuctions()}</div> : <p>No posts to show.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
                }
            </div>
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
