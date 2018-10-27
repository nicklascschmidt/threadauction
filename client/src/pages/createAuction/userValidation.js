

export const validateUserInputs = (data) => {

    console.log('validating inputs...');
    let errorArray = [];
    let isError = false;

    if (data.title.length < 1) {
        errorArray.push('Please enter an item title.');
        isError = true;
    } else if (data.title.length > 100) {
        errorArray.push('Item title is too long.');
        isError = true;
    } else {
        // do nothing
    }

    if (data.description.length < 1) {
        errorArray.push('Please enter an item description.');
        isError = true;
    } else if (data.description.length > 1000) {
        errorArray.push('Item description is too long.');
        isError = true;
    } else {
        // do nothing
    }

    if (data.gender === '') {
        errorArray.push('Please choose an item gender.');
        isError = true;
    } else {
        // do nothing
    }

    if (data.category === '') {
        errorArray.push('Please choose a category.');
        isError = true;
    } else {
        // do nothing
    }


    let errorObject = {
        errorArray: errorArray,
        isError: isError
    }

    return errorObject;

  }



