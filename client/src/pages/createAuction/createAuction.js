<<<<<<< HEAD
import React from "react";
import AuctionStyle from "./CreateAuctionStyle"
import axios from "axios";
import { validateUserInputs } from "./userValidation";
import { connect } from "react-redux";
import CategoryForm from "../../components/form/CategoryForm";
=======
import React from 'react';
import './createAuction-style.css';
import axios from 'axios';
import { validateUserInputs } from './userValidation';
import { connect } from 'react-redux';
import CategoryForm from "../../components/form/CategoryForm";


>>>>>>> ff5b5ccff0917fc508f275fcd9239a3851c868d9

class CreateAuction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      imgLink: "",
      gender: "",
      category: "",
      startingPrice: "",
      minBidIncrement: "",

      submitted: false,
      loading: false,
      errorArray: [],
      isError: null
    };
  }

  componentDidMount = () => {
    this.setState({
      title: "",
      description: "",
      imgLink: "",
      gender: "",
      category: "",
      startingPrice: 10,
      minBidIncrement: 5,

<<<<<<< HEAD
      submitted: false,
      loading: false,
      errorArray: [],
      isError: null
    });
  };
=======
    handleCategoryChange = (event) => {
        console.log('handleCategoryChange: ')
        console.log(event);
        this.setState({
            category: event.value
        }, () => {console.log(this.state)})
    }
>>>>>>> ff5b5ccff0917fc508f275fcd9239a3851c868d9

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRadioButtonChange = event => {
    this.setState(
      {
        gender: event.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleDropdownChange = event => {
    this.setState(
      {
        category: event.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  };

<<<<<<< HEAD
  handleSliderChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
=======
    saveInputs = () => {
        console.log('~~~~~~~~~~', this.state);
        const { title, description, imgLink, gender, category, startingPrice, minBidIncrement } = this.state;
        const itemData = {
            userId: this.props.userId,
            title: title.toString(),
            description: description.toString(),
            imgLink: imgLink.toString(),
            gender: gender.toString(),
            category: category.toString(),
            startingPrice: startingPrice,
            minBidIncrement: minBidIncrement
        }
        console.log('saveInputs itemData',itemData);
>>>>>>> ff5b5ccff0917fc508f275fcd9239a3851c868d9

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true }, () => this.saveInputs());
  };

  saveInputs = () => {
    const {
      title,
      description,
      imgLink,
      gender,
      category,
      startingPrice,
      minBidIncrement
    } = this.state;
    const itemData = {
      userId: this.props.userId,
      title: title.toString(),
      description: description.toString(),
      gender: gender.toString(),
      category: category.toString(),
      startingPrice: startingPrice,
      minBidIncrement: minBidIncrement
    };
    console.log("saveInputs itemData", itemData);

    const errorObject = validateUserInputs(itemData);
    console.log("validateUserInputs returned errorObject", errorObject);

    this.setState(
      {
        errorArray: errorObject.errorArray,
        isError: errorObject.isError
      },
      () => {
        console.log(this.state);
        this.displayErrors();
      }
    );

    // if validateUserInputs returns an error, then show to the user. Else, run sendUserDataToDb.
    if (errorObject.isError) {
      console.log("WOAH we got an error. Do not send data to db");
      this.setState({
        loading: false
      });
    } else {
      console.log("send that s h i t to the DB!");
      this.sendUserDataToDb(itemData);
    }
  };

<<<<<<< HEAD
  sendUserDataToDb = data => {
    console.log("sending user data to db....");

    axios
      .post("/api/auction/create", data)
      .then(resp => {
        console.log(resp.data);
        if (resp.status === 200) {
          console.log("success");
          this.setState({
            submitted: true,
            loading: false,
            errorArray: [],
            isError: false
          });
        } else {
          console.log("front end /api/auction/create error");
=======
    componentDidUpdate = () => {
        if (this.state.submitted) {
            // bring user to login page
            // window.location = '/login';
            console.log('~~~~~~SUBMITTED~~~~~~');
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
                this.handleCategoryChange({ value: this.state.category});
            })
>>>>>>> ff5b5ccff0917fc508f275fcd9239a3851c868d9
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorArray: ["There was a problem saving your auction."]
        });
      });
  };

  componentDidUpdate = () => {
    if (this.state.submitted) {
      // bring user to login page
      // window.location = '/login';
      console.log("~~~~~~SUBMITTED~~~~~~");
      this.setState({
        title: "",
        description: "",
        gender: "",
        category: "",

        startingPrice: 10,
        minBidIncrement: 5,
        submitted: false
      });
    }
  };

<<<<<<< HEAD
  displayErrors = () => {
    return this.state.errorArray.map((errorMsg, n) => {
      return <p key={n}>{errorMsg}</p>;
    });
  };

  render() {
    return (
      <AuctionStyle>
        <h3>Please fill out the information below.</h3>
        {this.state.isError ? (
          <div className="error-box">{this.displayErrors()}</div>
        ) : (
          ""
        )}

        <form>
          <div className="theForm">
            <h4>Item Info</h4>
            <div className="title">
            <span>Title: </span>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={event => this.handleInputChange(event)}
              />
=======
    
    render() {
       
        return (
            <div className='container'>
                <h3>Please fill out the information below.</h3>
                {this.state.isError ? <div className='error-box'>{this.displayErrors()}</div> : ''}

                <form>
                    <div className='form-style'>
                        <h4>Item Info</h4>
                        <div>
                            <span>Title: </span>
                            <input
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={event => this.handleInputChange(event)}
                            />
                        </div>
                        <div>
                            <span>Description: </span>
                            <textarea
                                name="description"
                                value={this.state.description}
                                onChange={event => this.handleInputChange(event)}
                            />
                        </div>
                        <div>
                            <span>Image Link: </span>
                            <input
                                type="text"
                                name="imgLink"
                                value={this.state.imgLink}
                                onChange={event => this.handleInputChange(event)}
                            />
                        </div>
                        <div>
                            <span>Gender: </span>
                            <ul>
                                <li>
                                    <label htmlFor="male">
                                        <input type="radio" id="male" name="gender" value="M" checked={this.state.gender === 'M'} onChange={event => this.handleRadioButtonChange(event)}/>
                                         Male
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="female">
                                        <input type="radio" id="female" name="gender" value="F" checked={this.state.gender === 'F'} onChange={event => this.handleRadioButtonChange(event)}/>
                                         Female
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="unisex">
                                        <input type="radio" id="unisex" name="gender" value="U" checked={this.state.gender === 'U'} onChange={event => this.handleRadioButtonChange(event)}/>
                                         Unisex
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <span>Category: </span>
                            <CategoryForm category={this.state.category} handleCategoryChange={this.handleCategoryChange.bind(this)}/>
                        </div>
                        <div>
                            <div>Starting Price: ${this.state.startingPrice}</div>
                            <input type="range" min="1" max="300" value={this.state.startingPrice} className="slider" id="startingPrice" onChange={event => this.handleSliderChange(event)} />
                        </div>
                        <div>
                            <div>Minimum Bid Increment: ${this.state.minBidIncrement}</div>
                            <input type="range" min="1" max="20" value={this.state.minBidIncrement} className="slider" id="minBidIncrement" onChange={event => this.handleSliderChange(event)} />
                        </div>
                    </div>
                    <br></br>
                    <div className='align-center'>
                        {this.state.loading ? 'Loading...' : <button className='btn btn-primary submit-button' onClick={this.handleSubmit}>submit</button>}
                    </div>
                    
                </form>
>>>>>>> ff5b5ccff0917fc508f275fcd9239a3851c868d9
            </div>
            <div className="description">
              <span>Description: </span>
              <textarea
                name="description"
                placeholder="Description"
                value={this.state.description}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
            <div className="ImageLink">
              <span>Image Link: </span>
              <input
                type="text"
                placeholder="Image Link"
                name="imgLink"
                value={this.state.imgLink}
                onChange={event => this.handleInputChange(event)}
              />
            </div>
            <div className="selectGender">
              <span>Gender: </span>
              <ul className="genderList">
                <li>
                  <label htmlFor="male">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="M"
                      checked={this.state.gender === "M"}
                      onChange={event => this.handleRadioButtonChange(event)}
                    />
                    Male
                  </label>
                </li>
                <li>
                  <label htmlFor="female">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="F"
                      checked={this.state.gender === "F"}
                      onChange={event => this.handleRadioButtonChange(event)}
                    />
                    Female
                  </label>
                </li>
                <li>
                  <label htmlFor="unisex">
                    <input
                      type="radio"
                      id="unisex"
                      name="gender"
                      value="U"
                      checked={this.state.gender === "U"}
                      onChange={event => this.handleRadioButtonChange(event)}
                    />
                    Unisex
                  </label>
                </li>
              </ul>
            </div>
            <div className="catForm">
              <span>Category: </span>
              <CategoryForm />
            </div>
            <div>
              <div className="toggleStarting">Starting Price: ${this.state.startingPrice}</div>
              <input
                type="range"
                min="1"
                max="300"
                value={this.state.startingPrice}
                className="slider"
                id="startingPrice"
                onChange={event => this.handleSliderChange(event)}
              />
            </div>
            <div>
              <div>Minimum Bid Increment: ${this.state.minBidIncrement}</div>
              <input
                type="range"
                min="1"
                max="20"
                value={this.state.minBidIncrement}
                className="slider"
                id="minBidIncrement"
                onChange={event => this.handleSliderChange(event)}
              />
            </div>
          </div>
          <br />
        </form>
          <div className="AuctionSubmit">
            {this.state.loading ? (
              "Loading..."
            ) : (
              <button onClick={this.handleSubmit}>submit</button>
            )}
          </div>
      </AuctionStyle>
    );
  }
}

function mapStateToProps(state) {
  console.log("Product: mapStateToProps state", state);
  return {
    username: state.username,
    userId: state.userId,
    isLoggedIn: true
  };
}

export default connect(mapStateToProps)(CreateAuction);
