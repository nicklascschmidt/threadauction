import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductListingBidHistory from "../../components/productListing/productListingBidHistory";
import './orderHistory-style.css';
import ErrorBox from '../../components/box/errorBox';

// TODO: clean this up - too busy
class OrderHistory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: this.props.userId,
      username: this.props.username,
      bidArray: [], // every bid the user has cast
      auctionArray: [], // array of auctions that the user has placed bids for
      errorArray: [],
      isError: null
    }
  }

  // Pull auction bids with userId. Then get auction IDs (uniques). Then display each auction with the auctionId.
  componentDidMount = () => {
    this.pullBidsFromDb(this.state.userId);
  }

  // Pull bids (with userId), then get unique auctionIds from those bids.
  pullBidsFromDb = (userId) => {
    axios.get(`/api/auctionBids/${userId}`)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({ bidArray: resp.data });
          this.getUniqueAuctionIds(resp.data);
        }
      });
  }

  // Build auctionIdArray and remove dupes. Then loop auctions
  getUniqueAuctionIds = (bidArray) => {
    let auctionIdArray = bidArray.map((bid) => bid.AuctionId)
    const removeDupes = (a) => [...new Set(a)];
    let newAuctionIdArray = removeDupes(auctionIdArray);
    this.loopAuctionsForProductInfo(newAuctionIdArray);
  }

  displayBids = () => {
    let { bidArray, auctionArray } = this.state;
    return bidArray.map((bid) => {
      return (
        <div key={bid.id}>
          {this.findAuctionWithID(bid, auctionArray)}
        </div>
      )
    })
  }

  findAuctionWithID(bid, auctionArray) {
    return auctionArray.map((auction) => {
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
    });
  }

  // Pull data for each auction, then map after.
  loopAuctionsForProductInfo = (auctionIdArray) => {
    let bidPromises = [];
    for (let n = 0; n < auctionIdArray.length; n++) {
      bidPromises.push(new Promise((resolve, reject) => {
        this.fetchAuctionFromDb(auctionIdArray[n])
          .then(resp => {
            resolve(resp.data);
          }).catch(err => {
            reject(err);
          })
      }))
    }

    Promise.all(bidPromises).then(bidPromiseData => {
      const filteredArray = bidPromiseData.filter((value) => {
        return value != '';
      })
      this.setState({ auctionArray: filteredArray });
    });
  }

  // Returns a promise
  fetchAuctionFromDb = (auctionId) => {
    return axios.get(`/api/auctions/${auctionId}`)
  }

  render() {
    return (
      <div className='container center-content'>
        <h2 className='margin-header bid-history-style'>My Bid History</h2>
        {this.state.bidArray.length > 0
          ? <div>{this.displayBids()}</div>
          : <ErrorBox>No bids to show.</ErrorBox>}
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

export default connect(mapStateToProps)(OrderHistory);
