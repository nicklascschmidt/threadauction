import React, { Component } from "react";
import GenderForm from "../../components/form/GenderForm";
import CategoryForm from "../../components/form/CategoryForm";
import PrettyHome from "./homeStyles";
import axios from "axios";
import ProductListing from '../../components/productListing/productListing';
import moment from 'moment';


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
        gender: event.value
      },
      () => {
        console.log(this.state);
        this.pullProductsFromDb();
      }
    );
  };

  handleCategoryChange = event => {
    console.log(`~~~~~~~~~~~ event ~~~~~~~~~~~`,event);
    this.setState(
      {
        category: event.value
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
      });
    }
    

  showProducts = () => {
      console.log('showing products...');
      const productObjectArrayMapped = this.state.productObjectArray.map( (product) => {
          // console.log('prod',product);

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
      <PrettyHome>
            <h3>Filter</h3>
          <div className="genderForm">
            <span>Gender: </span>
<<<<<<< HEAD
            <GenderForm {...this.handleGenderChange} />
=======
            <GenderForm gender={this.state.gender} handleGenderChange={this.handleGenderChange.bind(this)}/>
>>>>>>> ff5b5ccff0917fc508f275fcd9239a3851c868d9
          </div>

          <div className="categoryForm">
            <span>Category: </span>
<<<<<<< HEAD
            <CategoryForm {...this.handleCategoryChange} />
=======
            <CategoryForm category={this.state.category} handleCategoryChange={this.handleCategoryChange.bind(this)}/>
>>>>>>> ff5b5ccff0917fc508f275fcd9239a3851c868d9
          </div>
      
        {this.state.isError ? this.state.errorMsg : ""}
        {this.showProducts()}
      </PrettyHome>
    );
  }
}

export default Home;
