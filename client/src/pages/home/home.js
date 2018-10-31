import React, { Component } from "react";
import * as Styled from './homeStyles';
import Product from '../product/product';
import { Link } from "react-router-dom";
import ProductListing from '../../components/productListing/productListing';
import axios from 'axios';
import './home-style.css';
import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

            productObjectArray: [],

            // title: '',
            // description: '',
            // gender: '',
            // category: '',
            // startingPrice: '',
            // minBidIncrement: '',

            // submitted: false,
            // loading: false,
            errorArray: [],
            isError: null,
            areProductsPulled: false,
        }
    }

   
    componentDidMount = () => {
        this.pullAllProductsFromDb();
        this.setState({
            productObjectArray: [],
            errorArray: [],
            isError: null,
            areProductsPulled: false,
        })
    }
    
    componentDidUpdate = () => {
        if (this.state.areProductsPulled === true) {
            console.log('Products pulled!!');

            this.setState({
                areProductsPulled: false
            }, () => {
                // this.showProducts();
            })
        }
    }

    pullAllProductsFromDb = () => {
        console.log('pulling products from db...');
        // will need params later for filtering


        // const auctionData = {
        //     auctionId: auctionId
        // };

        axios.get('/api/auction/all', {
            // params: auctionData
        })
        .then(resp => {
            console.log('resp.data',resp.data);

            if (resp.status === 200) {
                console.log('success');

                this.setState({
                    productObjectArray: resp.data,
                    areProductsPulled: true,
                }, () => {
                    console.log('this.state',this.state);
                    this.showProducts();

                });
                

                if (resp.data === null) {
                    console.log('resp.data is null');
                    this.setState({
                        errorMsg: `Error loading products. Please reload the page.`,
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
                console.log('front end /api/auction/all error');
            }

        }).catch(err => {
            this.setState({
                errorMsg: `Error loading products. Please reload the page.`,
                isError: true
            });
            console.log(err);
        });
    }

    showProducts = () => {
        console.log('showing products...');
        const productObjectArrayMapped = this.state.productObjectArray.map( (product) => {
            console.log(product);

            const createdAt = product.createdAt;
            const momentCreatedAt = moment(new Date(createdAt));
            const endDate = moment(createdAt).add(7,'days');
            const momentEndDate = moment(new Date(endDate));
            const momentNow = moment(new Date());
            
            const momentTimeRemaining = momentNow.diff(momentCreatedAt);
            const durationTimeRemaining = moment.duration(momentTimeRemaining);
            console.log('durationTimeRemaining',durationTimeRemaining);

            return (
                <ProductListing
                    key={product}
                    auctionId={product.id}
                    className='plain-box'
                    imgLink={product.imgLink}
                    title={product.title}
                    description={product.description}
                    gender={product.gender}
                    category={product.category}
                    startingPrice={product.startingPrice}
                    minBidIncrement={product.minBidIncrement}
                    durationTimeRemaining={durationTimeRemaining}
                />
            )
        })
        return <div>{productObjectArrayMapped}</div>
    }

    render() {
        return (
            <Styled.BootstrapContainer>
                <this.showProducts />
            </Styled.BootstrapContainer>
        )
    }
}

export default Home;