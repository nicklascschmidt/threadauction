

export const validateInputs = (data) => {

  let errorArray = [];

  // FIRST NAME VALIDATION
  if (data.firstName.length > 30 || data.firstName.length < 1) {
    errorArray.push('First name must be under 30 characters.');
  } else {
    errorArray.push('First name looks good!');
  }
  
  // LAST NAME VALIDATION
  if (data.lastName.length > 30 || data.lastName.length < 1) {
    errorArray.push('Last name must be under 30 characters.');
  } else {
    errorArray.push('Last name looks good!');
  }

  // USERNAME VALIDATION
  if (data.username.length > 20 || data.username.length < 3) {
    errorArray.push('Username must be between 3-20 characters.');
  } else {
    errorArray.push('Username looks good!');
  }

  // PASSWORD VALIDATION
  if (data.password.length > 20 || data.password.length < 8) {
    errorArray.push('Password must be between 8-20 characters.');
  } else {
    errorArray.push('Password looks good!');
  }

  // EMAIL VALIDATION
  function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  let emailValid = checkEmail(data.email);
  console.log('emailInvalid',emailValid);
  if (!emailValid) {
    errorArray.push('Email is invalid.');
  } else {
    errorArray.push('Email looks good!');
  }

  // STATE VALIDATION
  const stateArray = ['AL',	'AK',	'AZ',	'AR',	'CA',	'CO',	'CT',	'DE',	'DC',	'FL',	'GA',	'HI',	'ID',	'IL',	'IN',	'IA',	'KS',	'KY',	'LA',	'ME',	'MD',	'MA',	'MI',	'MN',	'MS',	'WY',	'MO',	'MT',	'NE',	'NV',	'NH',	'NJ',	'NM',	'NY',	'NC',	'ND',	'OH',	'OK',	'OR',	'PA',	'RI',	'SC',	'SD',	'TN',	'TX',	'UT',	'VT',	'VA',	'WA',	'WV',	'WI'];
  const stateExists = stateArray.includes(data.stateUSA.toUpperCase());
  console.log('stateExists',stateExists);
  console.log('data.stateUSA',data.stateUSA);
  if (!stateExists) {
    errorArray.push('Please enter a valid 2-letter state code.');
  } else {
    errorArray.push('State looks good!');
  }

  // ZIP VALIDATION
  let zipType = typeof data.zip;
  if (zipType === 'number' && data.zip.length === 5) {
    errorArray.push('Zip looks good!');
  } else {
    errorArray.push('Please enter a valid 5-number zip code.');
  }


  return errorArray;
}

