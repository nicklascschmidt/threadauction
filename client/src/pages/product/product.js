import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as Styles from './product-style';
import moment from 'moment';
import { validateUserInputs } from './bidValidation';


class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            imgLink: '',
            description: '',
            gender: '',
            category: '',
            startingPrice: '',
            minBidIncrement: '',
            createdAt: '',

            userBid: '',

            submitted: false,
            loading: false,
            errorArray: [],
            isDbError: null
        }
        this.pullProductDataFromDb = this.pullProductDataFromDb.bind(this);
        this.calculateTimeRemaining = this.calculateTimeRemaining.bind(this);
        this.showTime = this.showTime.bind(this);
        this.handlePlaceBid = this.handlePlaceBid.bind(this);
    }

    componentDidMount = () => {
        console.log('auctionId from URL',this.props.match.params.auctionId);
        console.log('auctionId from URL',this.props);

        const auctionId = this.props.match.params.auctionId;
        this.pullProductDataFromDb(auctionId);
        this.setState({
            loading: true,
            errorArray: [],
            isDbError: null
        })
    }

    pullProductDataFromDb = (auctionId) => {
        console.log('auctionId',auctionId);

        const auctionData = {
            auctionId: auctionId
        };

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
                        errorMsg: `We couldn\'t find the product. Please try again.`,
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
    }

    calculateTimeRemaining = (type) => {
        console.log('calculating time remaining...');

        let createdAt = this.state.createdAt;

        const momentCreatedAt = moment(new Date(createdAt));
        const endDate = moment(createdAt).add(7,'days');
        const momentEndDate = moment(new Date(endDate));
        const momentNow = moment(new Date());
        
        const momentTimeRemaining = momentNow.diff(momentCreatedAt);
        const durationTimeRemaining = moment.duration(momentTimeRemaining);
        
        if (type === 'durationTimeRemaining') {
            return this.showTime(durationTimeRemaining);
        } else if (type === 'createdAt') {
            return this.showTime(momentCreatedAt);
        } else {
            return <span>error</span>
        }
    }
    
    showTime = (time) => {
        console.log('showing time...');

        let days = time.days();
        let hours = time.hours();
        let minutes = time.minutes();
        // console.log(days,hours,minutes);
    
        return <span>{days}d {hours}h {minutes}m</span>
    }

    handlePlaceBid = (event) => {
        event.preventDefault();
        console.log('placing bid...');

        // this.setState({loading: true}, () => this.validateBid());
        this.validateBid(this.state);
    }



    validateBid = (userBid) => {
        console.log('validating bid...');
        console.log('this.state',this.state);
        let errorObj = validateUserInputs(userBid);
        console.log('errorObj',errorObj);
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: parseInt(value)
        })
    }
    
    render() {
        return (
            <Styles.Wrapper>
                {this.state.loading ? 
                    <h3>{this.state.isDbError ? this.state.errorMsg : 'Loading...'}</h3>
                : (
                <div>
                    <h1>Product Detail</h1>
                    <img src={this.state.imgLink} height='150px' width='150px' alt=''/>
                    <p>title: {this.state.title}</p>
                    <p>description: {this.state.description}</p>
                    <p>gender: {this.state.gender}</p>
                    <p>Category: {this.state.category}</p>
                    <p>Starting Price: {this.state.startingPrice}</p>
                    <p>Minimum Bid Increment: {this.state.minBidIncrement}</p>
                    <p>Created At: {this.calculateTimeRemaining('createdAt')}</p>
                    <p>Time Remaining: {this.calculateTimeRemaining('durationTimeRemaining')}</p>
                    
                    
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
                
                
                )
                }
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
