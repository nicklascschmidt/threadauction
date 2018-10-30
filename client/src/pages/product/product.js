import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as Styles from './product-style';


class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
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
        console.log('auctionId from URL',this.props.match.params.auctionId);
        console.log('auctionId from URL',this.props);

        const auctionId = this.props.match.params.auctionId;
        this.pullProductDataFromDb(auctionId);
        this.setState({
            loading: true,
            errorArray: [],
            isError: null
        })
    }

    pullProductDataFromDb = (auctionId) => {
        console.log('auctionId',auctionId);

        const auctionData = {
            auctionId: auctionId
        };

        axios.get('/api/auction/id', {
            params: auctionData
        })
        .then(resp => {
            console.log('resp.data',resp.data);

            if (resp.status === 200) {
                console.log('success');

                this.setState({
                    title: resp.data.title,
                    description: resp.data.description,
                    gender: resp.data.gender,
                    category: resp.data.category,
                    startingPrice: resp.data.startingPrice,
                    minBidIncrement: resp.data.minBidIncrement,
                    loading: false
                });

                if (resp.data === null) {
                    console.log('resp.data is null');
                    this.setState({
                        errorMsg: `We couldn\'t find the product. Please try again.`,
                        isError: true
                    });
                } else {
                    this.setState({
                        errorMsg: null,
                        isError: false
                    });
                    return
                }
            } else {
                console.log('front end /api/auction/id error');
            }

        }).catch(err => {
            this.setState({
                errorMsg: `We ran into an issue trying to find the product. Please reload the page.`,
                isError: true
            });
            console.log(err);
        });
    }
    
    
    
    render(){
        return(
            <Styles.Wrapper>
                {this.state.loading ? 
                    <h3>{this.state.isError ? this.state.errorMsg : 'Loading...'}</h3>
                : (
                <div>
                    <h1>Product Detail</h1>
                    <p>title: {this.state.title}</p>
                    <p>description: {this.state.description}</p>
                    <p>gender: {this.state.gender}</p>
                    <p>Category: {this.state.category}</p>
                    <p>Starting Price: {this.state.startingPrice}</p>
                    <p>Minimum Bid Increment: {this.state.minBidIncrement}</p>
                    
                </div>)
                }
            </Styles.Wrapper>
        )
    }
}

function mapStateToProps(state) {
    console.log('UserProfile: mapStateToProps state',state);
    return {
      username: state.username,
      userId: state.userId,
      isLoggedIn: true
    };
}

export default connect(mapStateToProps)(Product);
