import React from 'react';
import { Link } from "react-router-dom";
import Product from '../../pages/product/product';
import { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining } from '../timeConverter/timeConverter';
import './productListingProfile-style.css';

class ProductListingProfile extends React.Component {
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
          <Link to={`/product/${this.props.auctionId}`} component={Product} className='col-8 text-left'>
            <h5 className='product-title'>{this.props.title}</h5>
          </Link>
          <div className='col-4 text-left'>
            <h5>Auction Status</h5>
          </div>

          <hr className='hr'></hr>

          <div className='col-8 text-left'>
            <p><strong>Starting Price: </strong>{this.props.startingPrice}</p>
            <p><strong>Posted: </strong>{calculateCreatedAt(this.props.createdAt)}</p>
          </div>
          <div className='col-4 text-left'>
            <p>{this.showTimeRemaining(this.props.createdAt)}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListingProfile;



