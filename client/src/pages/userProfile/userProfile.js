import React from 'react';
import { connect } from 'react-redux';
import './userProfile-style.css';
import axios from 'axios';
import ProductListingProfile from "../../components/productListing/productListingProfile";
import ErrorBox from '../../components/box/errorBox';

class UserProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: this.props.userId,
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
      isError: null,
    }
  }

  componentDidMount = () => {
    this.pullUserDataFromDb(this.state.userId);
    this.pullAuctionsFromDb(this.state.userId);
  }

  pullUserDataFromDb = (userId) => {
    axios.get('/api/users/profile', { params: { userId } })
      .then(resp => {
        if (resp.status === 200) {
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
        }
      })
      .catch(err => {
        this.setState({
          errorMsg: `We ran into an issue trying to find your account. Please reload the page.`,
          isError: true
        });
      });
  }

  pullAuctionsFromDb = (userId) => {
    axios.get(`/api/auctions/${userId}`)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            auctionArray: resp.data,
            errorMsg: null,
            isError: false
          });
          return
        }
      }).catch(err => {
        this.setState({
          errorMsg: `We ran into an issue trying to find your account. Please reload the page.`,
          isError: true
        });
      });
  }

  displayAuctions = () => {
    return this.state.auctionArray.map((auction) => {
      return <ProductListingProfile
        key={auction.title}
        auctionId={auction.id}
        imgLink={auction.imgLink}
        title={auction.title}
        startingPrice={auction.startingPrice}
        createdAt={auction.createdAt} />
    })
  }

  render() {
    return (
      <div className='container'>
        {this.state.loading
          ? <h3>{this.state.isError ? this.state.errorMsg : 'Loading...'}</h3>
          : (
            <div className='row'>
              <div className='col-sm-12 col-md-4 col-lg-3'>
                <div className='user-info-style'>
                  <h2 className='text-center'>My Profile</h2>
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
              <div className='col-sm-12 col-md-8 col-lg-9 text-center'>
                <div className='user-post-style'>
                  <h2>My Posts</h2>
                </div>
                <div className="d-flex justify-content-around align-items-start">
                  {(this.state.auctionArray.length > 0)
                    ? <div>{this.displayAuctions()}</div>
                    : <ErrorBox>No posts to show.</ErrorBox>}
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
  return {
    username: state.username,
    userId: state.userId,
    isLoggedIn: true
  };
}

export default connect(mapStateToProps)(UserProfile);
