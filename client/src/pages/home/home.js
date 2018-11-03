import React, { Component } from "react";
import GenderForm from "../../components/form/GenderForm";
import CategoryForm from "../../components/form/CategoryForm";
import PrettyHome from "./homeStyles";
import Product from "../product/product";
import { Link } from "react-router-dom";
import ProductListing from "../../components/productListing/productListing";
import axios from "axios";

import moment from "moment";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productObjectArray: [],
      gender: "",
      category: "",
      errorMsg: "",
      isError: null
    };

    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.pullProductsFromDb = this.pullProductsFromDb.bind(this);
    this.showProducts = this.showProducts.bind(this);
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
    this.setState(
      {
        gender: event.target.value
      },
      () => {
        console.log(this.state);
        this.pullProductsFromDb();
      }
    );
  };
  handleCategoryChange = event => {
    this.setState(
      {
        category: event.target.value
      },
      () => {
        console.log(this.state);
        this.pullProductsFromDb();
      }
    );
  };

  pullProductsFromDb = () => {
    console.log("pulling filtered products from db...");

    let filterObj = {
      gender: this.state.gender,
      category: this.state.category
    };

    axios
      .get("/api/auction", {
        params: filterObj
      })
      .then(resp => {
        console.log("resp.data", resp.data);
        if (resp.status === 200) {
          console.log("success");

          this.setState(
            {
              productObjectArray: resp.data
            },
            () => {
              console.log("this.state", this.state);
              this.showProducts();
            }
          );

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
      .catch(err => {
        this.setState({
          errorMsg: `Error loading products. Please reload the page.`,
          isError: true
        });
        console.log(err);
      });
  };

  showProducts = () => {
    console.log("showing products...");
    const productObjectArrayMapped = this.state.productObjectArray.map(
      product => {
        // console.log('prod',product);

        const createdAt = product.createdAt;
        const momentCreatedAt = moment(new Date(createdAt));
        const endDate = moment(createdAt).add(7, "days");
        const momentEndDate = moment(new Date(endDate));
        const momentNow = moment(new Date());

        const momentTimeRemaining = momentNow.diff(momentCreatedAt);
        const durationTimeRemaining = moment.duration(momentTimeRemaining);
        // console.log('durationTimeRemaining',durationTimeRemaining);

        return (
          <ProductListing
            key={product.title}
            auctionId={product.id}
            className="plain-box"
            imgLink={product.imgLink}
            title={product.title}
            description={product.description}
            gender={product.gender}
            category={product.category}
            startingPrice={product.startingPrice}
            minBidIncrement={product.minBidIncrement}
            durationTimeRemaining={durationTimeRemaining}
          />
        );
      }
    );
    return <div>{productObjectArrayMapped}</div>;
  };

  render() {
    return (
      <PrettyHome>
            <h3>Filter</h3>
          <div className="genderForm">
            <span>Gender: </span>
            <GenderForm {...this.handleGenderChange} />
          </div>

          <div className="categoryForm">
            <span>Category: </span>
            <CategoryForm {...this.handleCategoryChange} />
          </div>
      
        {this.state.isError ? this.state.errorMsg : ""}
        {this.showProducts()}
      </PrettyHome>
    );
  }
}

export default Home;
