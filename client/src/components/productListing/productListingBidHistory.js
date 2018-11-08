import React from 'react';
import { Link } from "react-router-dom";
import Product from '../../pages/product/product';
import BidStatus from '../bidStatus/bidStatus';
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../timeConverter/timeConverter';
import './productListingBidHistory-style.css';


class ProductListingBidHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  showTimeRemaining = (createdAt) => {
    // console.log('createdAt',createdAt);
    let momentTimeRemaining = calculateTimeRemaining(createdAt);
    let durationTimeRemainingObj = showDurationTimeRemaining(momentTimeRemaining);

    if (durationTimeRemainingObj.isComplete) {
      return <span><strong>Auction Complete</strong></span>
    } else {
      return <span><strong>Time Remaining: </strong>{durationTimeRemainingObj.days}d {durationTimeRemainingObj.hours}h {durationTimeRemainingObj.minutes}m</span>
    }
  }

  render() {
    // console.log('this.props',this.props)
    return (
      <div className='row row-style'>
        <div className='col-3'>
          <Link to={`/product/${this.props.auctionId}`} component={Product} className='img-container'>
            <img src={this.props.imgLink} height='150px' width='150px' alt='' className='img-thumbnail rounded img-custom'/>
          </Link>
        </div>

        <div className='col-9 row'>
          <Link to={`/product/${this.props.auctionId}`} component={Product} className='col-7 text-left'>
            <h5 className='product-title'>{this.props.title}</h5>
          </Link>
          <div className='col-5 text-left'>
            <h5>Bid Info</h5>
          </div>

          <hr className='hr'></hr>

          <div className='col-7 text-left'>
            <p><strong>Starting Price: </strong>{this.props.startingPrice}</p>
            <p><strong>Created At: </strong>{calculateCreatedAt(this.props.createdAt)}</p>
            <p>{this.showTimeRemaining(this.props.createdAt)}</p>
          </div>
          <div className='col-5 text-left'>
            <p><strong>Submitted At: </strong>{calculateCreatedAt(this.props.bid.bidSubmitTime)}</p>
            <p><strong>Bid Amount: </strong>${this.props.bid.bidAmount}</p>
            <BidStatus createdAt={this.props.createdAt} auctionId={this.props.auctionId} bidAmount={this.props.bid.bidAmount} />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListingBidHistory;

