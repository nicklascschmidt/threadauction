import React from 'react';
import { Link } from "react-router-dom";
import Product from '../../pages/product/product';
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../timeConverter/timeConverter';

class ProductListing extends React.Component {

  showTimeRemaining = (createdAt) => {
    console.log('createdAt',createdAt);
    let momentTimeRemaining = calculateTimeRemaining(createdAt);
    let durationTimeRemainingObj = showDurationTimeRemaining(momentTimeRemaining);

    if (durationTimeRemainingObj.isComplete) {
      return <span>Auction Complete</span>
    } else {
      return <span>Time Remaining: {durationTimeRemainingObj.days}d {durationTimeRemainingObj.hours}h {durationTimeRemainingObj.minutes}m</span>
    }
  }

  render() {
    console.log('this.props',this.props)
    return (
      <div>
        <Link to={`/product/${this.props.auctionId}`} component={Product}>
          <img src={this.props.imgLink} height='150px' width='150px' alt=''/>
        </Link>
        <Link to={`/product/${this.props.auctionId}`} component={Product}>
          <h3>Title: {this.props.title}</h3>
        </Link>

        <p>Description: {this.props.description}</p>
        <p>Gender: {this.props.gender}</p>
        <p>Category: {this.props.category}</p>
        <p>Starting Price: {this.props.startingPrice}</p>
        <p>Minimum Bid Increment: {this.props.minBidIncrement}</p>

        <p>Created At: {calculateCreatedAt(this.props.createdAt)}</p>
        <p>{this.showTimeRemaining(this.props.createdAt)}</p>

      </div>
    )
  }
}

export default ProductListing;

