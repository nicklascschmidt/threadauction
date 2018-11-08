import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductListingBidHistory from "../../components/productListing/productListingBidHistory";
// import PrettyProfile from './orderHistoryStyles';
import './orderHistory-style.css';
import ErrorBox from '../../components/box/errorBox';

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
        const removeDupes = (a) => [...new Set(a)];
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
                    {this.findAuctionWithID(bid,auctionArray)}
                </div>
            )
        })
        return <div>{bidArrayMapped}</div>
    }

    getBidStatus() {
        
    }

    findAuctionWithID(bid,auctionArray) {
        // console.log('looking for the auction...',auctionID,auctionArray)
        const auctionMapped = auctionArray.map( (auction) => {
            if (auction.id === bid.AuctionId) {
                return (
                    <ProductListingBidHistory
                        key={auction.id}
                        auctionId={auction.id}
                        imgLink={auction.imgLink}
                        title={auction.title}
                        startingPrice={auction.startingPrice}
                        createdAt={auction.createdAt}
                        bid={bid}
                    />
                )
            }
        })
        return auctionMapped
    }

    loopAuctionsForProductInfo(auctionIdArray) {
        // console.log('Now, we\'re looping through the auction array and pulling data for each one. We\'ll map it after.');
    
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
            // console.log("auctionArray has been set: ",this.state.auctionArray);
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
            <div className='container center-content margin-bottom'>
                <h2 className='margin-header bid-history-style'>My Bid History</h2>
                
                {this.state.bidArray.length > 0 ? <div>{this.displayBids(this.state.bidArray,this.state.auctionArray)}</div> : <ErrorBox>No bids to show.</ErrorBox>}

            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('OrderHistory: mapStateToProps state',state);
    return {
      username: state.username,
      userId: state.userId,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(OrderHistory);
