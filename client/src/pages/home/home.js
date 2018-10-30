import React, { Component } from "react";
import * as Styled from './homeStyles';
import Product from '../product/product';
import { Link } from "react-router-dom";
import ProductListing from '../../components/productListing/productListing';
import axios from 'axios';
import './home-style.css';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            auctionId: 1,
            auctionId2: 2,

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
        // this.showProducts();
        this.pullAllProductsFromDb();
        
    }

    componentDidUpdate = () => {
        if (this.state.areProductsPulled) {
            console.log('Products pulled!!');
            this.setState({
                areProductsPulled: false
            })
        }
    }

    pullAllProductsFromDb = () => {
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
        const productObjectArrayMapped = this.state.productObjectArray.map( (product) => {
            console.log(product);
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
                />
            )
        })
        return <div>{productObjectArrayMapped}</div>
    }

    render() {
        return (
            <Styled.BootstrapContainer>
                <Link className='logo' to={`/product/${this.state.auctionId2}`} component={Product}>/product/:auctionId 2</Link>
                {this.showProducts()}
            </Styled.BootstrapContainer>
        )
    }
}

export default Home;