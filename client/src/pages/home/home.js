import React, { Component } from "react";
import GenderForm from "../../components/form/GenderForm";
import CategoryForm from "../../components/form/CategoryForm";
import axios from "axios";
import ProductListing from '../../components/productListing/productListing';
import './home-style.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productObjectArray: [],
      gender: null,
      category: null,
      errorMsg: null,
      isError: null
    };

    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount = () => {
    this.pullProductsFromDb();
    this.setState({
      productObjectArray: [],
      gender: "",
      category: "",
      errorMsg: "",
      isError: null
    });
  };

  handleGenderChange = event => {
    this.setState({
        gender: event.value
      }, () => {
        this.pullProductsFromDb();
      }
    );
  };

  handleCategoryChange = event => {
    this.setState({
        category: event.value
      }, () => {
        this.pullProductsFromDb();
      }
    );
  };


  pullProductsFromDb() {
    // console.log("pulling filtered products from db...");

    let filterObj = {
      gender: this.state.gender,
      category: this.state.category
    };

    axios.get("/api/auction", {
        params: filterObj
      })
      .then(resp => {
        // console.log("resp.data", resp.data);
        if (resp.status === 200) {
          this.setState({
            productObjectArray: resp.data
          })
          if (resp.data.length === 0) {
            console.log("resp.data is empty");
            this.setState({
              errorMsg: `No products to show. Please try filtering for other products.`,
              isError: true
            });
          } else if (resp.data === null) {
            console.log("resp.data is null");
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
        } else {
          console.log("front end /api/auction error");
        }
      })
      .catch( (err) => {
        console.log(err)
        this.setState({
          errorMsg: `Error loading products. Please reload the page.`,
          isError: true
        });
      });
  }

  showProducts() {
      console.log('showing products...');
      const productObjectArrayMapped = this.state.productObjectArray.map( (product) => {
          return (
              <ProductListing
                  key={product.title}
                  auctionId={product.id}
                  imgLink={product.imgLink}
                  title={product.title}
                  description={product.description}
                  gender={product.gender}
                  category={product.category}
                  startingPrice={product.startingPrice}
                  minBidIncrement={product.minBidIncrement}
                  createdAt={product.createdAt}
              />
          )
      })
      return <div>{productObjectArrayMapped}</div>
  }


  render () {
    return (
      <div className='container'>
        <div className='row align-items-center filter-margin filter-style'>
          <h3 className="col-2">Filter</h3>

          <div className='col-10 d-flex justify-content-around'>
            <div className='d-inline-block gender-form'>
              <span>Gender: </span>
              <GenderForm className='d-inline-block gender-align' gender={this.state.gender} handleGenderChange={this.handleGenderChange.bind(this)}/>
            </div>
            <div className='d-inline-block category-form'>
              <span>Category: </span>
              <CategoryForm className='d-inline-block category-align' category={this.state.category} handleCategoryChange={this.handleCategoryChange.bind(this)}/>
            </div>
          </div>
        </div>
      
        {this.state.isError ? this.state.errorMsg : ""}
        <div className="d-flex justify-content-around align-items-start">
          {this.showProducts()}
        </div>
      </div>
    );
  }
}

export default Home;
