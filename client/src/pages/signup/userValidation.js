

export const validateInputs = (data) => {

  let errorArray = [];
  let isError = false;

  // FIRST NAME VALIDATION
  if (data.firstName.length > 30 || data.firstName.length < 1) {
    errorArray.push('First name must be under 30 characters.');
    isError = true;
  } else {
    // errorArray.push('First name looks good!');
  }
  
  // LAST NAME VALIDATION
  if (data.lastName.length > 30 || data.lastName.length < 1) {
    errorArray.push('Last name must be under 30 characters.');
    isError = true;
  } else {
    // errorArray.push('Last name looks good!');
  }

  // USERNAME VALIDATION
  if (data.username.length > 20 || data.username.length < 3) {
    errorArray.push('Username must be between 3-20 characters.');
    isError = true;
  } else {
    // errorArray.push('Username looks good!');
  }

  // PASSWORD VALIDATION
  if (data.password.length > 20 || data.password.length < 8) {
    errorArray.push('Password must be between 8-20 characters.');
    isError = true;
  } else {
    // errorArray.push('Password looks good!');
  }

  // EMAIL VALIDATION
  function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  let emailValid = checkEmail(data.email);
  if (!emailValid) {
    errorArray.push('Please enter a valid email.');
    isError = true;
  } else {
    // errorArray.push('Email looks good!');
  }

  // STATE VALIDATION
  const stateArray = ['AL',	'AK',	'AZ',	'AR',	'CA',	'CO',	'CT',	'DE',	'DC',	'FL',	'GA',	'HI',	'ID',	'IL',	'IN',	'IA',	'KS',	'KY',	'LA',	'ME',	'MD',	'MA',	'MI',	'MN',	'MS',	'WY',	'MO',	'MT',	'NE',	'NV',	'NH',	'NJ',	'NM',	'NY',	'NC',	'ND',	'OH',	'OK',	'OR',	'PA',	'RI',	'SC',	'SD',	'TN',	'TX',	'UT',	'VT',	'VA',	'WA',	'WV',	'WI'];
  const stateExists = stateArray.includes(data.stateUSA.toUpperCase());
  if (!stateExists) {
    errorArray.push('Please enter a valid 2-letter state code.');
    isError = true;
  } else {
    // errorArray.push('State looks good!');
  }

  // ZIP VALIDATION
  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(data.zip);
  if (isValidZip) {
    // errorArray.push('Zip looks good!');
  } else {
    errorArray.push('Please enter a valid 5-number zip code.');
    isError = true;
  }

  let errorObject = {
    errorArray: errorArray,
    isError: isError
  }

  return errorObject;
}

