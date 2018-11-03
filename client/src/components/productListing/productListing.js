import React from 'react';
import { Link } from "react-router-dom";
import Product from '../../pages/product/product';
import moment from 'moment';

class ProductListing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      test: 'test'
    }
  }

  calculateTimeRemaining = (type,createdAt) => {
    console.log('calculating time remaining...');

    let momentCreatedAt = moment(new Date(createdAt));
    let endDate = moment(createdAt).add(7,'days');
    let momentEndDate = moment(new Date(endDate));
    let momentNow = moment(new Date());
    
    let momentTimeRemaining = momentEndDate.diff(momentNow);
    let durationTimeRemaining = moment.duration(momentTimeRemaining);

    let displayCreatedAt = momentCreatedAt.format('MMMM Do YYYY, h:mm a');
    
    if (type === 'durationTimeRemaining') {
        // console.log('~~~~ calc durationTimeRemaining',durationTimeRemaining);
        return this.showTime(durationTimeRemaining);
    } else if (type === 'createdAt') {
        // console.log('~~~~ calc createdAt',displayCreatedAt);
        return displayCreatedAt;
    } else {
        return <span>error</span>
    }
  }

  showTime = (time) => {
    console.log('showing time...');

    let days = time.days();
    let hours = time.hours();
    let minutes = time.minutes();
    console.log(days,hours,minutes);

    return <span>{days}d {hours}h {minutes}m</span>
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
        <p>Created At: {this.calculateTimeRemaining('createdAt',this.props.createdAt)}</p>
        <p>Time Remaining: {this.calculateTimeRemaining('durationTimeRemaining',this.props.createdAt)}</p>

      </div>
    )
  }
}

export default ProductListing;

