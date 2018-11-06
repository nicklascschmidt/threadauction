import React from 'react';
import { connect } from 'react-redux';
import PrettyProfile from './orderHistoryStyles';
import './orderHistory-style.css';
import axios from 'axios';
import ProductListingBidHistory from "../../components/productListing/productListingBidHistory";
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../../components/timeConverter/timeConverter';

class OrderHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            username: '',
            bidArray: [], // every bid the user has cast
            auctionIdArray: [], // auctionIds that the user has taken part in
            auctionArray: [], // array of auctions that the user has placed bids for
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            username: this.props.username,
            bidArray: [],
            auctionArray: [],

            errorArray: [],
            isError: null
        }, () => {
            this.pullBidsFromDb(this.state.userId);
        })
    }

    
    pullBidsFromDb = (userId) => {
        // console.log('Pulling users bids from the DB with this ID: ',userId);
        const params = { userId };
        axios.get('/api/bid/auctionBids', { params })
        .then(resp => {
            this.setState({
                bidArray: resp.data,
            }, () => {
                // console.log('These are all the bids the user has placed: ',this.state.bidArray);
                this.getAuctionIds(this.state.bidArray);
            })
        }).catch(err => {
            console.log(err);
        });
    }

    getAuctionIds(bidArray) {
        // console.log('getting auction IDs...');
        let auctionIdArray = [];
        bidArray.map( (bid) => {
            auctionIdArray.push(bid.AuctionId);
        })
        let removeDupes = (a) => [...new Set(a)];
        const removeDupeArray = removeDupes(auctionIdArray);

        this.setState({
            auctionIdArray: removeDupeArray
        }, () => {
        //   console.log('These are the IDs of the auctions: ',this.state.auctionIdArray);
          this.loopAuctionsForProductInfo(this.state.auctionIdArray);
        })
    }

    displayBids = (bidArray,auctionArray) => {
        // console.log('displaying bids...',bidArray,auctionArray);
        const bidArrayMapped = bidArray.map( (bid) => {
            return (
                <div key={bid.id}>
                    <p>Bid Submitted At: {calculateCreatedAt(bid.bidSubmitTime)}</p>
                    {this.findAuctionWithID(bid.AuctionId,this.state.auctionArray)}
                    <p>Bid Amount: ${bid.bidAmount}</p>
                    <br></br>
                </div>
            )
        })
        return <div>{bidArrayMapped}</div>
    }

    findAuctionWithID(auctionID,auctionArray) {
        // console.log('looking for the auction...',auctionID,auctionArray)
        const auctionMapped = auctionArray.map( (auction) => {
            if (auction.id === auctionID) {
                return (
                    <ProductListingBidHistory
                        key={auction.id}
                        auctionId={auction.id}
                        imgLink={auction.imgLink}
                        title={auction.title}
                        startingPrice={auction.startingPrice}
                        createdAt={auction.createdAt}
                    />
                )
            }
        })
        return auctionMapped
    }

    loopAuctionsForProductInfo(auctionIdArray) {
        console.log('Now, we\'re looping through the auction array and pulling data for each one. We\'ll map it after.');
    
        const bidPromises = [];
        for (let n=0; n<auctionIdArray.length; n++) {
          bidPromises.push(new Promise( (resolve, reject) => {
            this.fetchAuctionFromDb(auctionIdArray[n])
              .then(resp => {
                resolve(resp.data);
              }).catch(err => {
                reject(err);
              })
          }))
        }
    
        Promise.all(bidPromises).then(bidPromiseData => {
          const filteredArray = bidPromiseData.filter( (value) => {
            return value != '';
          })
          this.setState({
            auctionArray: filteredArray
          }, () => {
            console.log("auctionArray has been set: ",this.state.auctionArray);
          })
        }).catch(err => {
          console.log('an error occurred: ',err);
        })
    }

    // Returns a promise
    fetchAuctionFromDb(auctionId) {
        const params = { auctionId };
        return axios.get('/api/auction/id', { params })
    }
    
    
    render() {
        return(
            <PrettyProfile>
                <div>
                    <h2>My Order History</h2>
                    
                    {this.state.bidArray.length > 0 ? <div>{this.displayBids(this.state.bidArray,this.state.auctionArray)}</div> : <p>No bids to show.</p>}

                </div>
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
