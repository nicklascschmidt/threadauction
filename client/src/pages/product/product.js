import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { validateUserInputs } from './bidValidation';
import ErrorBox from '../../components/box/errorBox';
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../../components/timeConverter/timeConverter';
import './product-style.css';

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      auctionId: '',
      title: '',
      imgLink: '',
      description: '',
      gender: '',
      category: '',
      startingPrice: '',
      currentHighestBid: '',
      minBidIncrement: '',
      createdAt: '',

      userBid: '',

      submitted: false,
      loading: false,
      errorArray: [],
      isError: null,
      isValidationError: null
    }
    this.pullProductDataFromDb = this.pullProductDataFromDb.bind(this);
    this.handlePlaceBid = this.handlePlaceBid.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      auctionId: this.props.match.params.auctionId,
      loading: true,
      errorArray: [],
      isError: null
    }, () => {
      this.pullProductDataFromDb(this.state.auctionId);
    })
  }

  // First pull auction product data, then pull auction bid data.
  pullProductDataFromDb = (auctionId) => {
    axios.get(`/api/auctions/${auctionId}`)
      .then(resp => {
        if (resp.status === 200) {
          let { title, imgLink, description, gender, category, startingPrice, minBidIncrement, createdAt, loading } = resp.data;
          this.setState({
            title, imgLink, description, gender, category, startingPrice, minBidIncrement, createdAt,
            loading: false
          });
        }
      }).catch(err => {
        this.setState({
          errorMsg: `We ran into an issue trying to find the product. Please reload the page.`,
          isError: true
        });
      });

    // Pull bid data for the highest bid. If null, no bids have been placed yet.
    axios.get(`/api/auctionBids/highestBid/${auctionId}`)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            currentHighestBid: (resp.data !== null) ? resp.data : '',
            loading: false
          });
        }
      }).catch(err => {
        this.setState({
          errorMsg: `We ran into an issue trying to find the bid. Please reload the page.`,
          isError: true
        });
      });
  }

  calculateTimeRemaining = (type) => {
    if (type === 'durationTimeRemaining') {
      return this.showTimeRemaining(this.state.createdAt);
    } else if (type === 'createdAt') {
      return calculateCreatedAt(this.state.createdAt);
    } else {
      return <span>error</span>
    }
  }

  showTimeRemaining = (createdAt) => {
    let momentTimeRemaining = calculateTimeRemaining(createdAt);
    let durationTimeRemainingObj = showDurationTimeRemaining(momentTimeRemaining);

    if (durationTimeRemainingObj.isComplete) {
      return <span><strong>Auction Complete</strong></span>
    } else {
      return <span><strong>Time Remaining: </strong>{durationTimeRemainingObj.days}d {durationTimeRemainingObj.hours}h {durationTimeRemainingObj.minutes}m</span>
    }
  }

  handlePlaceBid = (event) => {
    event.preventDefault();
    this.setState({ loading: true }, () => this.validateBid(this.state));
  }

  validateBid = (userBidObj) => {
    let errorObj = validateUserInputs(userBidObj);
    this.setState({
      errorArray: errorObj.errorArray,
      isValidationError: errorObj.isValidationError
    })

    let bidData = {
      UserId: this.props.userId,
      AuctionId: this.state.auctionId,
      bidAmount: parseInt(this.state.userBid),
      bidSubmitTime: Date.now()
    }

    // if validateBid returns an error, then show to the user. Else, run sendUserBidToDb.
    if (errorObj.isValidationError) {
      this.setState({ loading: false });
    } else {
      this.sendUserBidToDb(bidData);
    }
  }

  sendUserBidToDb = (data) => {
    axios.post('/api/auctionBids/create', data)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            submitted: true,
            loading: false,
            errorArray: [],
            isError: false
          });
        }
      }).catch(err => {
        this.setState({
          errorArray: ['There was a problem saving your bid.']
        });
      });
  }

  displayErrors = () => {
    return this.state.errorArray.map((errorMsg, n) => {
      return <p key={n}>{errorMsg}</p>
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  componentDidUpdate = () => {
    if (this.state.submitted) {
      this.setState({
        userBid: '',
        submitted: false
      }, () => {
        this.pullProductDataFromDb(this.state.auctionId);
      });
    }
  }

  render() {
    return (
      <div className='container'>
        {this.state.isError
          ? <h3>{this.state.errorMsg}</h3>
          : (
            <div className='box-style-product'>
              <div className='row'>
                <div className='col-4 d-flex align-content-center flex-wrap'>
                  <div className='img-container-product'>
                    <img src={this.state.imgLink} height='300px' width='300px' alt='' className='img-custom-product' />
                  </div>
                </div>
                <div className='col-8 row'>
                  <h3>{this.state.title}</h3>
                  <p>{this.state.description}</p>
                  <hr></hr>
                  <div className='col-7'>
                    <p><strong>Gender: </strong>{this.state.gender}</p>
                    <p><strong>Category: </strong>{this.state.category}</p>
                    <p><strong>Starting Price: </strong>${this.state.startingPrice}</p>
                    <p><strong>Minimum Bid Increment: </strong>${this.state.minBidIncrement}</p>
                    <p><strong>Posted: </strong>{this.calculateTimeRemaining('createdAt')}</p>
                    <p>{this.calculateTimeRemaining('durationTimeRemaining')}</p>
                  </div>
                  <div className='col-5'>
                    {this.state.currentHighestBid && <p><strong>Current Highest Bid: </strong>${this.state.currentHighestBid}</p>}
                    {this.props.username
                      ? <form>
                        <div>
                          <span><strong>Enter Bid ($): </strong></span>
                          <input
                            className='vertical-margin'
                            type="text"
                            name="userBid"
                            value={this.state.userBid}
                            onChange={event => this.handleChange(event)}
                          />
                        </div>
                        <button onClick={this.handlePlaceBid} className='btn btn-info button-style'>Place Bid</button>
                      </form>
                      : <h5>Please sign in to a place bid.</h5>}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-4'></div>
                <div className='col-8'>
                  {this.state.isValidationError ? <ErrorBox >{this.displayErrors()}</ErrorBox> : ''}
                </div>
              </div>
            </div>
          )}
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

export default connect(mapStateToProps)(Product);
