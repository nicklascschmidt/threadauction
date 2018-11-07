import React from 'react';
import axios from 'axios';
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../timeConverter/timeConverter';

class BidStatus extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bidResult: null,
    }
  }

  // props--
  // auctionId
  // createdAt
  // user bid amount

  componentDidMount() {
    this.isUserBidHighestBid(this.props.auctionId,this.props.bidAmount);
  }

  getIsAuctionComplete = (createdAt) => {
    const momentTimeRemaining = calculateTimeRemaining(createdAt);
    const durationTimeRemainingObj = showDurationTimeRemaining(momentTimeRemaining);
    const isAuctionComplete = durationTimeRemainingObj.isComplete
    return isAuctionComplete
  }

  isUserBidHighestBid(auctionId,userBid) {
    const winningBid = new Promise( (resolve, reject) => {
      this.getMaxBidAmountFromAuctionId(auctionId)
        .then(resp => {
          resolve(resp.data.bidAmount)
        }).catch(err => {
          reject(err)
        });
    })
    winningBid.then( (data) => {
      // console.log('winningBid: ',data, ' vs user bid: ',userBid);

      let bidResult = null;
      if (data === userBid) {
        bidResult = 'Auction won';
      } else {
        bidResult = 'Not the highest bid';
      }
      this.setState({
        bidResult: bidResult
      })
    }).catch( (err) => {
      console.log(err)
    })
  }

  // returns a promise
  getMaxBidAmountFromAuctionId(auctionId) {
    const params = { auctionId };
    return axios.get('/api/bid/completedAuctionHighestBid', { params })
  }


  render() {
    // console.log('this.props',this.props);
    return (
      <div>
        <p><strong>Status: </strong>{this.getIsAuctionComplete(this.props.createdAt) ? 'Complete' : 'Ongoing'}</p>
        <p><strong>Result: </strong>{this.state.bidResult}</p>
      </div>
    )
  }
}

export default BidStatus;

