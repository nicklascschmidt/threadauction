import React, { Component } from "react";
import PrettyHome from './homeStyles';
import Product from '../product/product';
import { Link } from "react-router-dom";


class Home extends Component {
    state = {
        auctionId: 1,
        auctionId2: 2
    }

    render() {
        return (
            <div>
                <PrettyHome>
                    hello world this is the home page
                    <br></br>
                    <Link className='logo' to={`/product/${this.state.auctionId}`} component={Product}>/product/:auctionId 1</Link>
                    <br></br>
                    <Link className='logo' to={`/product/${this.state.auctionId2}`} component={Product}>/product/:auctionId 2</Link>

                </PrettyHome>
            </div>

        )
    }
}

export default Home;