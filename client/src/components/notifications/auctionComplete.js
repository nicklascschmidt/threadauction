import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';
// import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../timeConverter/timeConverter';

class AuctionComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userNotificationArray: [],
      userBids: [],
      completedAuctionArray: [],
      completedAuctionsBidArray: [],
      completedAuctionIdArray: [],

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
        console.log('/api/auction/complete -- resp.data',resp.data);
        if (resp.status === 200) {
            console.log('success');
            this.setState({
              completedAuctionArray: resp.data
            }, () => {
              this.getCompletedAuctionIds(this.state.completedAuctionArray);
            })
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
  }

  getCompletedAuctionIds = (completedAuctionArray) => {
    console.log('getting completed auction IDs...',completedAuctionArray);
    let completedAuctionIdArray = [];

    completedAuctionArray.map( (auction) => {
      completedAuctionIdArray.push(auction.id);
    })

    this.setState({
      completedAuctionIdArray: completedAuctionIdArray
    }, () => {
      this.pullCompletedAuctionBidsFromDb(this.state.completedAuctionIdArray);
    })
  }

  pullCompletedAuctionBidsFromDb(completedAuctionIdArray) {
    console.log('pulling completed auction bids...',completedAuctionIdArray);

    const auctionData = {
      completedAuctionIdArray: completedAuctionIdArray,
      userId: this.props.userId,
    };

    axios.get('/api/bid/completedAuctionBids', {
      params: auctionData
    })
    .then(resp => {
      console.log('/api/bid/completedAuctionBids -- resp.data',resp.data);
      if (resp.status === 200) {
          console.log('success');
          this.setState({
            completedAuctionsBidArray: resp.data
          }, () => {
            console.log('this.state.completedAuctionsBidArray',this.state.completedAuctionsBidArray);
          })
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
  }

  // for all auction bids
  // find the max for each Auction ID
  // return the corresponding userId of that highest bid
  // if the winning userId = userId from redux, then display notification saying you won the auction for [auctionId]
  // search db for that auctionId and return product listing of it



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
    console.log('~~~~~~ notification');
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

export default connect(mapStateToProps)(AuctionComplete);