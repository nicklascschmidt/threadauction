import React from 'react';
import { connect } from 'react-redux';
import PrettyProfile from './orderHistoryStyles';
import './orderHistory-style.css';
import axios from 'axios';
import ProductListingProfile from "../../components/productListing/productListingProfile";
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../../components/timeConverter/timeConverter';

class OrderHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            username: '',
            bidArray: [],
            auctionArray: [],

            loading: true,
            errorArray: [],
            isError: null
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            username: this.props.username,
            bidArray: [],
            auctionArray: [],

            loading: true,
            errorArray: [],
            isError: null
        }, () => {
            this.pullBidsFromDb(this.state.userId);
        })
    }

    
    pullBidsFromDb = (userId) => {
        console.log('userId',userId);
        
        let userParams = {
            userId: userId,
        };
        
        axios.get('/api/bid/auctionBids', {
            params: userParams
        })
        .then(resp => {
            console.log('bids resp.data',resp.data);
            
            if (resp.status === 200) {
                console.log('success');
                
                this.setState({
                    bidArray: resp.data,
                    loading: false,
                })
                
                if (resp.data === null) {
                    console.log('resp.data is null');
                    this.setState({
                        errorMsg: `We couldn\'t find your profile. Please reload the page.`,
                        isError: true
                    });
                } else {
                    this.setState({
                        errorMsg: null,
                        isError: false
                    });
                    return
                }
            } else {
                console.log('front end /api/bid/auctionBids error');
            }
            
        }).catch(err => {
            this.setState({
                errorMsg: `We ran into an issue trying to locate your bids. Please reload the page.`,
                isError: true
            });
            console.log(err);
        });
    }

    pullAuctionsFromDb = (auctionId) => {
        console.log('pullAuctionsFromDb auctionId',auctionId);

        let userParams = {
            auctionId: auctionId
        };

        axios.get('/api/auction/id', {
            params: userParams
        })
        .then(resp => {
            console.log('auction resp.data',resp.data);

            if (resp.status === 200) {
                console.log('success');

                // let auctionObj = {
                //     imgLink: resp.data.imgLink,
                //     title: resp.data.title,
                //     startingPrice: resp.data.startingPrice,
                //     createdAt: resp.data.createdAt,
                // }

                // return auctionObj;

                return <p>{resp.data.title}</p>

            } else {
                console.log('front end /api/auction/id error');
            }

        }).catch(err => {
            this.setState({
                errorMsg: `We ran into an issue trying to find the auctions. Please reload the page.`,
                isError: true
            });
            console.log(err);
        });
    }
    

    displayBids = (bidArray) => {
        console.log('displaying bids...',bidArray);

        const bidArrayMapped = bidArray.map( (bid) => {
            console.log('bid',bid);
            // let auctionId = bid.AuctionId;
            // console.log('auctionId',auctionId);
            // let auctionObj = this.pullAuctionsFromDb(auctionId);
            // console.log('~~~~~~~~ auctionObj ~~~~~~~~~',auctionObj);

            return (
                <div key={bid.id}>
                    <p>Bid Amount: ${bid.bidAmount}</p>
                    <p>Bid Submitted At: {calculateCreatedAt(bid.bidSubmitTime)}</p>
                    {/* {this.pullAuctionsFromDb(bid.AuctionId)} */}
                    <p>{bid.AuctionId}</p>
                </div>
            )
        })
        return <div>{bidArrayMapped}</div>
    }
    
    
    render() {
        return(
            <PrettyProfile>
                {this.state.loading ? 
                    <h3>{this.state.isError ? this.state.errorMsg : 'Loading...'}</h3>
                : (
                <div>
                    <h2>My Order History</h2>
                    
                    {this.state.bidArray.length > 0 ? <div>{this.displayBids(this.state.bidArray)}</div> : <p>No bids to show.</p>}

                </div>)
                }
            </PrettyProfile>
        )
    }
}

function mapStateToProps(state) {
    console.log('OrderHistory: mapStateToProps state',state);
    return {
      username: state.username,
      userId: state.userId,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(OrderHistory);
