import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state({
            id:"",
            title: "",
            description: "",
            gender: "",
            category: "",
            startingPrice: "",
            minBidIncrement: "",
            loading: false,
            errorMsg: null,
            isErorr: null,
            sendToRedux: false,
            sendToReduxData: null
        
        })
    }

    // 
    componentDidMount = () => {
        // show product title, descrip, image, etc.
        // axios
        this.setState({
            loading:false,
            submitted: false,
            erorrMsg: null,
            isErorr: null,
            sendToRedux: false,
            sendToReduxData: null
        })
    }
    // I am not sure about this part

    handleChange = (event) => {
        const {id, value} = event.target;
        this.setState({
            [id]: value
        })
    }
     
    // or?
    handleChange = (event) => {
        const {title, value} = event.target;
        this.setState({
            [title]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {id} = this.state;
        const productData = {
            id: id,
        }
        console.log("productData", productData);

        this.state({
            loading: true
        });

        this.checkDbForSelectedProduct(productData);

    }

    sendToReduxStore = (data) => {
        console.log("sending to redux store ...");
        const productInfo = {
            id: data.id,
            title: data.title,
            description: data.description,
            gender: data.gender,
            category: data.category,
            startingPrice: data.startingPrice,
            minBidIncrement: data.minBidIncrement
        };

        // not sure...
        this.props.dispatch({
            type: "PRODUCT_SELECTION",
            payload: productInfo
        });

        this.setState({
            submitted: true,
            loading: false,
            errorArray: [],
            isError: false,
            sendToRedux: false,
            sendToReduxData: null
        });
    }
    
    componentDidMount = () => {
        if (this.state.sendToRedux) {
            this.sendToReduxStore(this.state.sendToReduxData);
        }

        if (this.state.submitted) {
            console.log("the product ID submitted");

            // should I write this?
            window.location = "/";
        }
    }

    checkDbForSelectedProduct = (data) => {
        axios.get("api/auction/ID", {
            params: data
        })
        .then(resp => {
            console.log("resp.data", resp.data);

            if(resp.status === 200) {
                console.log("success");

                this.setState({
                    loading: false
                });

                if(resp.data === null) {
                    console.log("res.data is null");
                    this.setState({
                        errorMsg: `we could\'t find the product. Please try again.`, 
                        isError: true
                    });
                } else {
                    this.setState({
                        errorMsg: null,
                        isError: false,
                        sendToRedux: true,
                        sendToReduxData: resp.data
                    });
                    return
                }
            } else {
                console.log("front end / api/auction/create error");
            }
        }).catch(err => {
            this.setState({
                errorMsg: `We ran into an issue trying to find the selected product.`,
                isErorr: true
            });
            console.log(err);
        });
    }

    // am I writing html? 
    render() {
        return (
            <div>
                <Styles.Wrapper>
                    <Card>
                        <form>
                            <label>Title: </label>
                            <input
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={event => this.handleChange(event)}
                            />
                            <br></br>
                            <label>Description: </label>
                            <input
                                type="text"
                                name="description"
                                value={this.state.description}
                                onChange={event => this.handleChange(event)}
                            />
                            <br></br>
                            <label>Gender: </label>
                            <input
                                type="text"
                                name="gender"
                                value={this.state.gender}
                                onChange={event => this.handleChange(event)}
                            />
                            <br></br>
                            <label>Category: </label>
                            <input
                                type="text"
                                name="category"
                                value={this.state.category}
                                onChange={event => this.handleChange(event)}
                            />
                            <br></br>

                            {/* number for datatypes integer? */}
                            <label>Starting Price: </label>
                            <input
                                type="number"
                                name="startingPrice"
                                value={this.state.startingPrice}
                                onChange={event => this.handleChange(event)}
                            />
                            <br></br>
                            {/* number for datatypes integer? */}
                            <label>Min bid increment: </label>
                            <input
                                type="number"
                                name="minBidIncrement"
                                value={this.state.minBidIncrement}
                                onChange={event => this.handleChange(event)}
                            />
                            <br></br>
                            {this.state.loading ? 'Loading...' : <button onClick={this.handleSubmit}>submit</button>}
                        </form>
                    </Card>
                    {this.state.isError ? <div className='error-box'><p>{this.state.errorMsg}</p></div> : ''}
                </Styles.Wrapper>
            </div>
        )
    }
}
// what? this function supposed to do?

function mapStateToProps(state) {
    return {
        title: state.title,
        description: state.description,
        gender: state.gender,
        category: state.category,
        startingPrice: state.startingPrice,
        minBidIncrement: state.minBidIncrement,
        isFound: true
    };
}
export default connect(mapStateToProps)(Product);