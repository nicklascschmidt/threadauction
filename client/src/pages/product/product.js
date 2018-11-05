import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as Styles from './product-style';
import moment from 'moment';
import { validateUserInputs } from './bidValidation';
import ErrorBox from '../../components/box/errorBox';


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
        this.calculateTimeRemaining = this.calculateTimeRemaining.bind(this);
        this.showTime = this.showTime.bind(this);
        this.handlePlaceBid = this.handlePlaceBid.bind(this);
    }

    componentDidMount = () => {
        console.log('auctionId from URL',this.props.match.params.auctionId);
        console.log('auctionId from URL',this.props);

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
        console.log('auctionId',auctionId);

        const auctionData = {
            auctionId: auctionId
        };

        // pull auction data
        axios.get('/api/auction/id', {
            params: auctionData
        })
        .then(resp => {
            console.log('resp.data',resp.data);

            if (resp.status === 200) {
                console.log('success');

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
                    console.log('resp.data is null');
                    this.setState({
                        errorMsg: `We couldn't find the product. Please try again.`,
                        isDbError: true
                    });
                } else {
                    this.setState({
                        errorMsg: null,
                        isDbError: false
                    });
                    return
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
        axios.get('/api/bid/highestBid', {
            params: auctionData
        })
        .then(resp => {
            console.log('front end -- resp.data',resp.data);

            if (resp.status === 200) {
                console.log('success');

                
                this.setState({
                    currentHighestBid: resp.data,
                    loading: false
                });


                if (resp.data === null) {
                    console.log('resp.data is null');
                    // no bids on this product - set state as empty
                    console.log('no existing bids');
                    this.setState({
                        currentHighestBid: '',
                        loading: false
                    });
                } else {
                    this.setState({
                        errorMsg: null,
                        isDbError: false
                    });
                    return
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
        // console.log('calculating time remaining...');

        let createdAt = this.state.createdAt;

        let momentCreatedAt = moment(new Date(createdAt));
        let endDate = moment(createdAt).add(7,'days');
        let momentEndDate = moment(new Date(endDate));
        let momentNow = moment(new Date());
        
        let momentTimeRemaining = momentEndDate.diff(momentNow);
        let durationTimeRemaining = moment.duration(momentTimeRemaining);

        let displayCreatedAt = momentCreatedAt.format('MMMM Do YYYY, h:mm a');
        
        if (type === 'durationTimeRemaining') {
            // console.log('~~~~ calc durationTimeRemaining',durationTimeRemaining);
            return this.showTime(durationTimeRemaining);
        } else if (type === 'createdAt') {
            // console.log('~~~~ calc createdAt',displayCreatedAt);
            return displayCreatedAt;
        } else {
            return <span>error</span>
        }
    }
    
    showTime = (time) => {
        // console.log('showing time...');

        let days = time.days();
        let hours = time.hours();
        let minutes = time.minutes();
        // console.log(days,hours,minutes);
    
        return <span>{days}d {hours}h {minutes}m</span>
    }

    handlePlaceBid = (event) => {
        event.preventDefault();
        console.log('placing bid...');

        this.setState({loading: true}, () => this.validateBid(this.state));
    }


    validateBid = (userBidObj) => {
        console.log('validating bid...');

        let errorObj = validateUserInputs(userBidObj);
        console.log('errorObj',errorObj);
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
            console.log('WOAH we got an error. Do not send data to db');
            this.setState({
                loading: false
            });
        } else {
            console.log('send that s h i t to the DB!');
            this.sendUserBidToDb(bidData);
        }
    }

    sendUserBidToDb = (data) => {
        console.log('sending user data to db....');

        axios.post('/api/bid/create', data)
            .then(resp => {
                console.log(resp.data);
                if (resp.status === 200) {
                    console.log('success');
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
            console.log('~~~~~~SUBMITTED~~~~~~');
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
            <Styles.Wrapper>
                {this.state.isDbError ? <h3>{this.state.errorMsg}</h3> : (
                    <div>
                        <h1>Product Detail</h1>
                        <img src={this.state.imgLink} height='150px' width='150px' alt=''/>
                        <p>title: {this.state.title}</p>
                        <p>description: {this.state.description}</p>
                        <p>gender: {this.state.gender}</p>
                        <p>Category: {this.state.category}</p>
                        <p>Starting Price: {this.state.startingPrice}</p>
                        <p>Current Highest Bid: {this.state.currentHighestBid}</p>
                        <p>Minimum Bid Increment: {this.state.minBidIncrement}</p>
                        <p>Created At: {this.calculateTimeRemaining('createdAt')}</p>
                        <p>Time Remaining: {this.calculateTimeRemaining('durationTimeRemaining')}</p>
                        
                        {this.state.isValidationError ? <ErrorBox >{this.displayErrors()}</ErrorBox> : ''}

                        {this.props.username ?
                            <form>
                                <div>
                                    <span>Bid Amount ($): </span>
                                    <input
                                        type="text"
                                        name="userBid"
                                        value={this.state.userBid}
                                        onChange={event => this.handleChange(event)}
                                    />
                                </div>
                                <button onClick={this.handlePlaceBid}>Place Bid</button>
                            </form>
                        :
                            <h5>Please sign in to a place bid.</h5>
                        }
                        
                    </div>
            )}
            </Styles.Wrapper>
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
