import React from 'react';
import axios from 'axios';
import { validateUserInputs } from './userValidation';
import { connect } from 'react-redux';
import CategoryForm from "../../components/form/CategoryForm";
import AuctionStyle from "./CreateAuctionStyle";
import ErrorBox from '../../components/box/errorBox';


class CreateAuction extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      imgLink: '',
      gender: '',
      category: '',
      startingPrice: 10,
      minBidIncrement: 5,

      submitted: false,
      loading: false,
      errorArray: [],
      isError: null
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleRadioButtonChange = (event) => {
    this.setState({ gender: event.target.value });
  }

  handleCategoryChange = (event) => {
    this.setState({ category: event.value });
  }

  handleSliderChange = (event) => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true }, () => this.saveInputs());
  }

  saveInputs = () => {
    let { title, description, imgLink, gender, category, startingPrice, minBidIncrement } = this.state;
    let itemData = {
      userId: this.props.userId,
      title: title.toString(),
      description: description.toString(),
      imgLink: imgLink.toString(),
      gender: gender.toString(),
      category: category.toString(),
      startingPrice: startingPrice,
      minBidIncrement: minBidIncrement
    }

    let errorObject = validateUserInputs(itemData);

    this.setState({
      errorArray: errorObject.errorArray,
      isError: errorObject.isError
    });

    // if validateUserInputs returns an error, then show to the user. Else, run sendUserDataToDb.
    if (errorObject.isError) {
      this.setState({ loading: false });
    } else {
      this.sendUserDataToDb(itemData);
    }
  }

  sendUserDataToDb = (data) => {
    axios.post('/api/auctions/create', data)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            submitted: true,
            loading: false,
            errorArray: [],
            isError: false
          });
        }
      }).catch(err => {
        this.setState({ errorArray: ['There was a problem saving your auction.'] });
      });
  }

  componentDidUpdate = () => {
    if (this.state.submitted) {
      this.setState({
        title: '',
        description: '',
        imgLink: '',
        gender: '',
        category: '',

        startingPrice: 10,
        minBidIncrement: 5,
        submitted: false
      }, () => {
        this.handleCategoryChange({ value: this.state.category });
      })
    }
  }

  displayErrors = () => {
    return this.state.errorArray.map((errorMsg, n) => {
      return <p key={n}>{errorMsg}</p>
    })
  }

  render() {
    return (
      <AuctionStyle>
        {this.state.isError && <ErrorBox >{this.displayErrors()}</ErrorBox>}
        <form>
          <div className='theForm'>
            <div className='text-center'>
              <h4>Item Info</h4>
            </div>
            <div className="title">
              <span>Title: </span>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
            <div className="description">
              <span>Description: </span>
              <textarea
                name="description"
                value={this.state.description}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
            <div className="ImageLink">
              <span>Image Link: </span>
              <input
                type="text"
                name="imgLink"
                value={this.state.imgLink}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
            <div className="genderList">
              <span>Gender: </span>
              <ul className="selectGender d-flex justify-content-around">
                <li>
                  <input type="radio" id="male" name="gender" value="M" checked={this.state.gender === 'M'} onChange={event => this.handleRadioButtonChange(event)} />
                  <label htmlFor="male">Male</label>
                </li>
                <li>
                  <input type="radio" id="female" name="gender" value="F" checked={this.state.gender === 'F'} onChange={event => this.handleRadioButtonChange(event)} />
                  <label htmlFor="female">Female</label>
                </li>
                <li>
                  <input type="radio" id="unisex" name="gender" value="U" checked={this.state.gender === 'U'} onChange={event => this.handleRadioButtonChange(event)} />
                  <label htmlFor="unisex">Unisex</label>
                </li>
              </ul>
            </div>
            <div className='extra-padding'>
              <span>Category: </span>
              <CategoryForm category={this.state.category} handleCategoryChange={this.handleCategoryChange.bind(this)} />
            </div>
            <div>
              <div>Starting Price: ${this.state.startingPrice}</div>
              <input type="range" min="1" max="300" value={this.state.startingPrice} className="slider slider-width" id="startingPrice" onChange={event => this.handleSliderChange(event)} />
            </div>
            <div>
              <div>Minimum Bid Increment: ${this.state.minBidIncrement}</div>
              <input type="range" min="1" max="20" value={this.state.minBidIncrement} className="slider" id="minBidIncrement" onChange={event => this.handleSliderChange(event)} />
            </div>
          </div>
          <div className='AuctionSubmit'>
            {this.state.loading ? 'Loading...' : <button className='btn btn-info submit-button' onClick={this.handleSubmit}>submit</button>}
          </div>
        </form>
      </AuctionStyle>
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

export default connect(mapStateToProps)(CreateAuction);
