import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';
// import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../timeConverter/timeConverter';

class IsAuctionComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userNotificationArray: [],
      userBids: [],
      completedAuctionArray: [], // all completed auctions
      completedAuctionsBidArray: [], // Bids the user placed on completed auctions
      completedAuctionIdArray: [], // AuctionIDs of completed auctions
      userBidsArray: [],
      winningBidsArray: [],
      userAuctionWinIdArray: [], // AuctionIDs of auctions the user won (auctions complete and user had max bid)

      loading: null,
      errorArray: [],
      isError: null,
      sendToRedux: false,
      sendToReduxData: null,
    }
  }

  componentDidMount() {
    console.log('this.props',this.props);
    this.pullCompletedAuctionDataFromDb();
  }


  // find all completed auctions - return array of objects to this.state
  pullCompletedAuctionDataFromDb() {
    console.log('pulling completed auctions...');

    axios.get('/api/auction/complete')
    .then(resp => {
        console.log('These are all of the completed auctions: ',resp.data);
        this.setState({
          completedAuctionArray: resp.data
        }, () => {
          this.getCompletedAuctionIds(this.state.completedAuctionArray);
        })
    }).catch(err => {
        console.log(err);
    });
  }

  getCompletedAuctionIds = (completedAuctionArray) => {
    console.log('getting completed auction IDs...');
    let completedAuctionIdArray = [];

    completedAuctionArray.map( (auction) => {
      completedAuctionIdArray.push(auction.id);
    })

    this.setState({
      completedAuctionIdArray: completedAuctionIdArray
    }, () => {
      console.log('These are the IDs of the completed auctions',this.state.completedAuctionIdArray);
      this.loopAuctionsForHighestBid(this.state.completedAuctionIdArray);
    })
  }

  loopAuctionsForHighestBid(completedAuctionIdArray) {
    console.log('Now, we\'re looping through the auction array and pulling highest bids for each one');

    const bidPromises = [];
    for (let n=0; n<completedAuctionIdArray.length; n++) {
      bidPromises.push(new Promise( (resolve, reject) => {
        this.fetchHighestBidFromDb(completedAuctionIdArray[n])
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
        winningBidsArray: filteredArray
      }, () => {
        console.log("winningBidsArray has been set")
        this.findUserAuctionWins(this.state.winningBidsArray);
      })
    }).catch(err => {
      console.log('an error occurred: ',err);
    })
  }

  // Returns a promise
  fetchHighestBidFromDb(auctionId) {
    const auctionData = {
      auctionId
    };
    return axios.get('/api/bid/completedAuctionHighestBid', {
      params: auctionData
    })
  }

  findUserAuctionWins(winningBidsArray) {
    let userAuctionWinIds = [];

    for (let n=0; n<winningBidsArray.length; n++) {
      // console.log('winningBidsArray[n]',winningBidsArray[n]);
      // console.log('this.props.userId',this.props.userId)
      if (winningBidsArray[n].UserId === this.props.userId) {
        console.log('we have a winner: ',winningBidsArray[n].AuctionId,' for: ',winningBidsArray[n].bidAmount)
        userAuctionWinIds.push(winningBidsArray[n].AuctionId);
      }
    }
    
    const removeDupes = (a) => [...new Set(a)];
    const removeDupeArray = removeDupes(userAuctionWinIds);
    this.setState({
      userAuctionWinIdArray: removeDupeArray
    }, () => {
      console.log('this.state.userAuctionWinIdArray',this.state.userAuctionWinIdArray);
    })
  }

  pullHighestBidFromDb(auctionId) {
    console.log('pulling completed auction bids...');

    const auctionData = { auctionId };
    axios.get('/api/bid/completedAuctionHighestBid', {
      params: auctionData
    })
    .then(resp => {
      console.log('/api/bid/completedAuctionBids -- resp.data',resp.data);
      this.setState({
        completedAuctionsBidArray: resp.data
      }, () => {
        console.log('this.state.completedAuctionsBidArray',this.state.completedAuctionsBidArray);
      })
    }).catch(err => {
        console.log(err);
    });
  }


  sendToReduxStore = (data) => {
    console.log("sending to redux store...");

    const notificationData = {
      userNotificationArray: data.userNotificationArray,
    };

    this.props.dispatch({
      type: "USER_NOTIFICATION",
      payload: notificationData
    });

    this.setState({
      loading: false,
      errorArray: [],
      isError: false,
      sendToRedux: false,
      sendToReduxData: null
    });
  };


  render() {
    return (
      <span onClick={this.callme}>
        Yo {this.props.userId}
      </span>
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

export default connect(mapStateToProps)(IsAuctionComplete);