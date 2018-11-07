import React from 'react';
import { Link } from "react-router-dom";
import Product from '../../pages/product/product';
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../timeConverter/timeConverter';
import './productListing-style.css';


class ProductListing extends React.Component {

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
        <p><strong>Minimum Bid Increment: </strong>{this.props.minBidIncrement}</p>

        <p><strong>Posted: </strong>{calculateCreatedAt(this.props.createdAt)}</p>
        <p>{this.showTimeRemaining(this.props.createdAt)}</p>

      </div>
    )
  }
}

export default ProductListing;

