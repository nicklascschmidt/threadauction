import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { validateUserInputs } from './bidValidation';
import ErrorBox from '../../components/box/errorBox';
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../../components/timeConverter/timeConverter';
import Wrapper from './productStyles';
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
            isDbError: null,
            isValidationError: null
        }
        this.pullProductDataFromDb = this.pullProductDataFromDb.bind(this);
        this.handlePlaceBid = this.handlePlaceBid.bind(this);
    }

    componentDidMount = () => {
        // console.log('auctionId from URL',this.props.match.params.auctionId);
        this.setState({
            auctionId: this.props.match.params.auctionId,
            loading: true,
            errorArray: [],
            isDbError: null
        }, () => {
            this.pullProductDataFromDb(this.state.auctionId);
        })
    }

    pullProductDataFromDb = (auctionId) => {
        // console.log('auctionId',auctionId);
        const params = { auctionId };
        // pull auction data
        axios.get('/api/auction/id', { params })
        .then(resp => {
            // console.log('resp.data',resp.data);
            if (resp.status === 200) {
                this.setState({
                    title: resp.data.title,
                    imgLink: resp.data.imgLink,
                    description: resp.data.description,
                    gender: resp.data.gender,
                    category: resp.data.category,
                    startingPrice: resp.data.startingPrice,
                    minBidIncrement: resp.data.minBidIncrement,
                    createdAt: resp.data.createdAt,
                    loading: false
                });
                if (resp.data === null) {
                    console.log('resp.data is null - no auction data');
                    this.setState({
                        errorMsg: `We couldn't find the product. Please try again.`,
                        isDbError: true
                    });
                }
            } else {
                console.log('front end /api/auction/id error');
            }
        }).catch(err => {
            this.setState({
                errorMsg: `We ran into an issue trying to find the product. Please reload the page.`,
                isDbError: true
            });
            console.log(err);
        });

        // pull bid data currentHighestBid
        axios.get('/api/bid/highestBid', { params })
        .then(resp => {
            // console.log('front end -- resp.data',resp.data);
            if (resp.status === 200) {
                this.setState({
                    currentHighestBid: resp.data,
                    loading: false
                });
                if (resp.data === null) {
                    console.log('no existing bids');
                    this.setState({
                        currentHighestBid: '',
                        loading: false
                    });
                }
            } else {
                console.log('front end /api/auction/id error');
            }
        }).catch(err => {
            this.setState({
                errorMsg: `We ran into an issue trying to find the bid. Please reload the page.`,
                isDbError: true
            });
            console.log(err);
        });
    }

    calculateTimeRemaining = (type) => {
        if (type === 'durationTimeRemaining') {
            // console.log('~~~~ calc durationTimeRemaining',durationTimeRemaining);
            return this.showTimeRemaining(this.state.createdAt);
        } else if (type === 'createdAt') {
            // console.log('~~~~ calc createdAt',displayCreatedAt);
            return calculateCreatedAt(this.state.createdAt);
        } else {
            return <span>error</span>
        }
    }
    
    showTimeRemaining = (createdAt) => {
        // console.log('createdAt',createdAt);
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
        // console.log('placing bid...');

        this.setState({loading: true}, () => this.validateBid(this.state));
    }


    validateBid = (userBidObj) => {
        // console.log('validating bid...');

        let errorObj = validateUserInputs(userBidObj);
        // console.log('errorObj',errorObj);
        this.setState({
            errorArray: errorObj.errorArray,
            isValidationError: errorObj.isValidationError
        })

        let bidData = {
            userId: this.props.userId,
            auctionId: this.state.auctionId,
            bidAmount: parseInt(this.state.userBid),
            bidSubmitTime: Date.now()
        }

        // if validateBid returns an error, then show to the user. Else, run sendUserBidToDb.
        if (errorObj.isValidationError) {
            // console.log('WOAH we got an error. Do not send data to db');
            this.setState({
                loading: false
            });
        } else {
            // console.log('send that s h i t to the DB!');
            this.sendUserBidToDb(bidData);
        }
    }

    sendUserBidToDb = (data) => {
        // console.log('sending user data to db....');
        axios.post('/api/bid/create', data)
            .then(resp => {
                // console.log(resp.data);
                if (resp.status === 200) {
                    this.setState({
                        submitted: true,
                        loading: false,
                        errorArray: [],
                        isError: false
                    });
                } else {
                    console.log('front end /api/bid/create error');
                }
            }).catch(err => {
                console.log(err);
                this.setState({
                    errorArray: ['There was a problem saving your bid.']
                });
            });
    }

    displayErrors = () => {
        return this.state.errorArray.map((errorMsg , n) => {
            return <p key={n}>{errorMsg}</p>
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    componentDidUpdate = () => {
        if (this.state.submitted) {
            // window.location = '/login';
            // console.log('~~~~~~ SUBMITTED ~~~~~~');
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
                {this.state.isDbError ? <h3>{this.state.errorMsg}</h3> : (
                    <div className='box-style-product'>
                        <div className='row'>
                            <div className='col-4'>
                                <div className='img-container-product'>
                                <img src={this.state.imgLink} height='300px' width='300px' alt='' className='center-block rounded img-custom-product'/>
                                </div>
                            </div>
                            <div className='col-8 row'>
                                <h3>{this.state.title}</h3>
                                <p>{this.state.description}</p>
                                <div className='col-7'>
                                    <p><strong>Gender: </strong>{this.state.gender}</p>
                                    <p><strong>Category: </strong>{this.state.category}</p>
                                    <p><strong>Starting Price: </strong>${this.state.startingPrice}</p>
                                    {this.state.currentHighestBid ? <p><strong>Current Highest Bid: </strong>${this.state.currentHighestBid}</p> : ''}
                                    <p><strong>Minimum Bid Increment: </strong>${this.state.minBidIncrement}</p>
                                    <p><strong>Posted: </strong>{this.calculateTimeRemaining('createdAt')}</p>
                                    <p>{this.calculateTimeRemaining('durationTimeRemaining')}</p>
                                </div>
                                <div className='col-5'>
                                    {this.props.username ?
                                        <form>
                                            <div>
                                                <span>Bid Amount ($): </span>
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
                                    :
                                        <h5>Please sign in to a place bid.</h5>
                                    }
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
    console.log('UserProfile: mapStateToProps state',state);
    return {
      username: state.username,
      userId: state.userId,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(Product);
