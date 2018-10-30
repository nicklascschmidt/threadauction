import React from 'react';
import './createAuction-style.css';
import axios from 'axios';
import { validateUserInputs } from './userValidation';
import { connect } from 'react-redux';


class CreateAuction extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            imgLink: '',
            gender: '',
            category: '',
            startingPrice: '',
            minBidIncrement: '',

            submitted: false,
            loading: false,
            errorArray: [],
            isError: null
        }
    }

    componentDidMount = () => {
        this.setState({
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
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleRadioButtonChange = (event) => {
        this.setState({
            gender: event.target.value
        }, () => {console.log(this.state)})
    }

    handleDropdownChange = (event) => {
        this.setState({
            category: event.target.value
        }, () => {console.log(this.state)})
    }

    handleSliderChange = (event) => {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({loading: true}, () => this.saveInputs());
    }

    saveInputs = () => {
        // pineapple
        const { title, description, imgLink, gender, category, startingPrice, minBidIncrement } = this.state;
        const itemData = {
            userId: this.props.userId,
            title: title.toString(),
            description: description.toString(),
            gender: gender.toString(),
            category: category.toString(),
            startingPrice: startingPrice,
            minBidIncrement: minBidIncrement
        }
        console.log('saveInputs itemData',itemData);

        const errorObject = validateUserInputs(itemData);
        console.log('validateUserInputs returned errorObject',errorObject);

        this.setState({
            errorArray: errorObject.errorArray,
            isError: errorObject.isError
        }, () => {
            console.log(this.state);
            this.displayErrors();
        });

        // if validateUserInputs returns an error, then show to the user. Else, run sendUserDataToDb.
        if (errorObject.isError) {
            console.log('WOAH we got an error. Do not send data to db');
            this.setState({
                loading: false
            });
        } else {
            console.log('send that s h i t to the DB!');
            this.sendUserDataToDb(itemData);
        }
    }


    sendUserDataToDb = (data) => {
        console.log('sending user data to db....');

        axios.post('/api/auction/create', data)
            .then(resp => {
                console.log(resp.data);
                if (resp.status === 200) {
                    console.log('success');
                    this.setState({
                        submitted: true,
                        loading: false,
                        errorArray: [],
                        isError: false
                    });
                } else {
                    console.log('front end /api/auction/create error');
                }
            }).catch(err => {
                console.log(err);
                this.setState({
                    errorArray: ['There was a problem saving your auction.']
                });
            });
        
    }

    componentDidUpdate = () => {
        if (this.state.submitted) {
            // bring user to login page
            // window.location = '/login';
            console.log('~~~~~~SUBMITTED~~~~~~');
            this.setState({
                title: '',
                description: '',
                gender: '',
                category: '',

                startingPrice: 10,
                minBidIncrement: 5,
                submitted: false
            })
        }
    }


    displayErrors = () => {
        return this.state.errorArray.map((errorMsg , n) => {
            return <p key={n}>{errorMsg}</p>
        })
    }

    handleSubmitTest = (event) => {
        event.preventDefault();
        this.setState({
            category: ''
        })
    }

    
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
                            <select name="category" size="3" value={this.state.category} onChange={event => this.handleDropdownChange(event)}>
                                <option value="">Select Category</option>

                                <option value="shirts">Shirts</option>
                                <option value="longSleeves">Long-sleeves / Sweaters</option>
                                <option value="jackets">Jackets</option>

                                <option value="shorts">Shorts</option>
                                <option value="pants">Pants</option>
                                <option value="underwear">Underwear / Delicates</option>
                                <option value="skirts">Skirts</option>
                                <option value="dresses">Dresses</option>

                                <option value="shoes">Shoes</option>
                                <option value="hats">Hats</option>
                                <option value="socks">Socks</option>
                                <option value="other">Other</option>
                            </select>
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
                        {/* <button className='btn btn-primary submit-button' onClick={this.handleSubmitTest}>test</button> */}
                    </div>
                    
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log('Product: mapStateToProps state',state);
    return {
      username: state.username,
      userId: state.userId,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(CreateAuction);
