import React, { Component } from "react";
import GenderForm from "../../components/form/GenderForm";
import CategoryForm from "../../components/form/CategoryForm";
import axios from "axios";
import ProductListing from '../../components/productListing/productListing';
import './home-style.css';
import ErrorBox from '../../components/box/errorBox';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productObjectArray: [],
      gender: '',
      category: '',
      errorMsg: '',
      isError: null
    };
  }

  componentDidMount = () => {
    this.pullProductsFromDb();
  };

  handleGenderChange = event => {
    this.setState({
      gender: event.value
    }, () => this.pullProductsFromDb() );
  };

  handleCategoryChange = event => {
    this.setState({
      category: event.value
    }, () => this.pullProductsFromDb() );
  };

  pullProductsFromDb() {
    let params = {
      gender: this.state.gender,
      category: this.state.category
    };

    axios.get('/api/auctions/all', { params })
      .then(resp => {
        if (resp.status === 200) {
          this.setState({ productObjectArray: resp.data });
          if (resp.data.length === 0) {
            this.setState({
              errorMsg: `No products to show. Please try filtering for other products.`,
              isError: true
            });
          } else if (resp.data === null) {
            this.setState({
              errorMsg: `We ran into an error loading the products. Please try again.`,
              isError: true
            });
          } else {
            this.setState({
              errorMsg: null,
              isError: false
            });
          }
        }
      })
      .catch((err) => {
        this.setState({
          errorMsg: `Error loading products. Please reload the page.`,
          isError: true
        });
      });
  }

  showProducts() {
    return this.state.productObjectArray.map((product) => {
      return <ProductListing
        key={product.title}
        auctionId={product.id}
        imgLink={product.imgLink}
        title={product.title}
        description={product.description}
        gender={product.gender}
        category={product.category}
        startingPrice={product.startingPrice}
        minBidIncrement={product.minBidIncrement}
        createdAt={product.createdAt} />
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='row align-items-center filter-margin filter-style'>
          <h3 className="col-2">Filter</h3>

          <div className='col-10 d-flex justify-content-around'>
            <div className='d-inline-block gender-form'>
              <span>Gender: </span>
              <GenderForm className='d-inline-block gender-align' gender={this.state.gender} handleGenderChange={this.handleGenderChange} />
            </div>
            <div className='d-inline-block category-form'>
              <span>Category: </span>
              <CategoryForm className='d-inline-block category-align' category={this.state.category} handleCategoryChange={this.handleCategoryChange} />
            </div>
          </div>
        </div>

        {this.state.isError ? <ErrorBox>{this.state.errorMsg}</ErrorBox> : ""}
        <div className="d-flex justify-content-around align-items-start">
          <div>{this.showProducts()}</div>
        </div>
      </div>
    );
  }
}

export default Home;
