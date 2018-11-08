import React from 'react';
import { Link } from "react-router-dom";
import Product from '../../pages/product/product';
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../timeConverter/timeConverter';
import './productListing-style.css';
import axios from 'axios';


class ProductListing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentHighestBid: ''
    }
  }

  componentDidMount() {
    this.pullProductDataFromDb(this.props.auctionId);
  }

  pullProductDataFromDb = (auctionId) => {
    // console.log('auctionId',auctionId);
    const params = { auctionId };

    // pull bid data currentHighestBid
    axios.get('/api/bid/highestBid', { params })
    .then(resp => {
        // console.log('front end -- resp.data',resp.data);
        if (resp.status === 200) {
            this.setState({
              currentHighestBid: resp.data,
            });
            if (resp.data === null) {
              console.log('no existing bids');
              this.setState({
                  currentHighestBid: '',
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

  showTimeRemaining = (createdAt) => {
    // console.log('createdAt',createdAt);
    let momentTimeRemaining = calculateTimeRemaining(createdAt);
    let durationTimeRemainingObj = showDurationTimeRemaining(momentTimeRemaining);

    if (durationTimeRemainingObj.isComplete) {
      return <span>Auction Complete</span>
    } else {
      return <span><strong>Time Remaining: </strong>{durationTimeRemainingObj.days}d {durationTimeRemainingObj.hours}h {durationTimeRemainingObj.minutes}m</span>
    }
  }

  render() {
    // console.log('this.props',this.props)
    return (
      <div className='box-style'>

        <Link to={`/product/${this.props.auctionId}`} component={Product} className='img-container'>
          <img src={this.props.imgLink} alt='' className='center-block rounded img-custom'/>
        </Link>

        <Link to={`/product/${this.props.auctionId}`} component={Product}>
          <h5 className='product-title'>{this.props.title}</h5>
        </Link>

        <p><strong>Category: </strong>{this.props.category}</p>
        <p><strong>Starting Price: </strong>${this.props.startingPrice}</p>
        {this.state.currentHighestBid ? <p><strong>Current Highest Bid: </strong>${this.state.currentHighestBid}</p> : ''}
        <p><strong>Minimum Bid Increment: </strong>{this.props.minBidIncrement}</p>

        <p><strong>Posted: </strong>{calculateCreatedAt(this.props.createdAt)}</p>
        <p>{this.showTimeRemaining(this.props.createdAt)}</p>

      </div>
    )
  }
}

export default ProductListing;

