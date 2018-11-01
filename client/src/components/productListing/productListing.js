import React from 'react';
import { Link } from "react-router-dom";
import Product from '../../pages/product/product';

class ProductListing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      test: 'test'
    }
  }

  showTime = (time) => {
    let days = time.days();
    let hours = time.hours();
    let minutes = time.minutes();

    return <p>Time left: {days}d {hours}h {minutes}m</p>
  }

  render() {
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
        {this.showTime(this.props.durationTimeRemaining)}

      </div>
    )
  }
}

export default ProductListing;

