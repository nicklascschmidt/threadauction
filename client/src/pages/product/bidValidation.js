import { isRegExp } from "util";
import { isError } from "util";


export const validateUserInputs = (data) => {
    console.log(data);

    console.log('validating inputs...');
    let errorArray = [];
    let isValidationError = false;

    // auctionId: "3"
    // category: "shirts"
    // createdAt: "2018-11-03T22:41:22.000Z"
    // currentHighestBid: 25
    // description: "asdfasdf"
    // errorArray: []
    // errorMsg: null
    // gender: "F"
    // imgLink: "https://www.dhresource.com/0x0s/f2-albu-g5-M00-AC-B9-rBVaI1gr-hOAWMBrAALpoqNDEH0249.jpg/mix-sizes-and-colors-kids-red-t-shirts-wholesale.jpg"
    // isDbError: false
    // isValidationError: null
    // loading: true
    // minBidIncrement: 5
    // startingPrice: 10
    // submitted: false
    // title: "sdfasdf"
    // userBid: "14"

    // bid has to be...
    // a number
    // < $10K
    // > current bid
    // > starting price + min bid increment
    // 



    let userBidNum = parseInt(data.userBid);

    // if userBidNum isn't a number
    if (!userBidNum) {
        errorArray.push('Please enter a valid bid amount.');
        isValidationError = true;
    }
    
    if (userBidNum > 10000) {
        errorArray.push('Please enter an amount under $10,000.');
        isValidationError = true;
    }

    
    let currentPrice = data.currentHighestBid > data.startingPrice ? data.currentHighestBid : data.startingPrice;
    let minBidAmount = currentPrice + data.minBidIncrement;
    if (userBidNum < minBidAmount) {
        errorArray.push('Please enter an amount higher than the current price + the minimum bid increment.');
        isValidationError = true;
    }
    


    let errorObject = {
        errorArray: errorArray,
        isValidationError: isValidationError
    }

    return errorObject;

  }



