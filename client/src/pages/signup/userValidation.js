

export const validateInputs = (data) => {
  console.log('this s h i t is happening!');

  let errorArray = [];

  if (data.username.length > 20 || data.username.length < 3) {
    errorArray.push('Username must be between 3-20 characters.');
  } else {
    errorArray.push('Username looks good!');
  }

  if (data.password.length > 20 || data.password.length < 6) {
    errorArray.push('Password must be between 6-20 characters.');
  } else {
    errorArray.push('Password looks good!');
  }

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
  
  // if (data.password.length > 20 || data.password.length < 6) {
  //   errorArray.push('Password must be between 6-20 characters.');
  // } else {
  //   errorArray.push('Password looks good!');
  // }

  const stateArray = ['AL',	'AK',	'AZ',	'AR',	'CA',	'CO',	'CT',	'DE',	'DC',	'FL',	'GA',	'HI',	'ID',	'IL',	'IN',	'IA',	'KS',	'KY',	'LA',	'ME',	'MD',	'MA',	'MI',	'MN',	'MS',	'WY',	'MO',	'MT',	'NE',	'NV',	'NH',	'NJ',	'NM',	'NY',	'NC',	'ND',	'OH',	'OK',	'OR',	'PA',	'RI',	'SC',	'SD',	'TN',	'TX',	'UT',	'VT',	'VA',	'WA',	'WV',	'WI'];
  const stateExists = stateArray.includes(data.stateUSA.toUpperCase());
  console.log('stateExists',stateExists);
  console.log('data.stateUSA',data.stateUSA);
  if (stateExists) {
    errorArray.push('State looks good!.');
  } else {
    errorArray.push('Please enter a valid 2-letter state code.');
  }


  return errorArray;
}

