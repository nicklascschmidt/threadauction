

export const validateUserInputs = (data) => {
    console.log(data);

    console.log('validating inputs...');
    let errorArray = [];
    let isValidationError = false;

    // category: "pants"
    // createdAt: "2018-10-31T01:02:51.000Z"
    // description: "long↵big waist↵whatever123~"
    // errorArray: []
    // errorMsg: null
    // gender: "M"
    // imgLink: "https://i.imgur.com/cN8VWWE.jpg"
    // isDbError: false
    // loading: false
    // minBidIncrement: 17
    // startingPrice: 90
    // submitted: false
    // title: "some pants"
    // userBid: "3"

    // bid has to be...
    // < 10x the item price
    // > current bid
    // > starting price
    // 



    // if (data.userBid < 1) {
    //     errorArray.push('Please enter an item title.');
    //     isError = true;
    // } else if (data.title.length > 100) {
    //     errorArray.push('Item title is too long.');
    //     isError = true;
    // } else {
    //     // do nothing
    // }

    // if (data.description.length < 1) {
    //     errorArray.push('Please enter an item description.');
    //     isError = true;
    // } else if (data.description.length > 1000) {
    //     errorArray.push('Item description is too long.');
    //     isError = true;
    // } else {
    //     // do nothing
    // }

    // if (data.gender === '') {
    //     errorArray.push('Please choose an item gender.');
    //     isError = true;
    // } else {
    //     // do nothing
    // }

    // if (data.category === '') {
    //     errorArray.push('Please choose a category.');
    //     isError = true;
    // } else {
    //     // do nothing
    // }


    let errorObject = {
        errorArray: errorArray,
        isValidationError: isValidationError
    }

    return errorObject;

  }



