
export const validateUserInputs = (data) => {
    console.log(data);

    console.log('validating inputs...');
    let errorArray = [];
    let isValidationError = false;

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



