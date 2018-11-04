import moment from 'moment';


const calculateCreatedAt = (createdAt) => {
  console.log('calculating createdAt...');
  
  let momentCreatedAt = moment(new Date(createdAt));
  let displayCreatedAt = momentCreatedAt.format('MMMM Do YYYY, h:mm a');

  return displayCreatedAt;
}

const calculateTimeRemaining = (createdAt) => {
  console.log('calculating time remaining...');
  
  // get end date first
  let momentCreatedAt = moment(new Date(createdAt));
  let endDate = momentCreatedAt.add(7,'days');
  let momentEndDate = moment(new Date(endDate));

  // get Date.now
  let momentNow = moment(new Date());
  
  // calculate difference
  let momentTimeRemaining = momentEndDate.diff(momentNow);

  return momentTimeRemaining;
}

const showDurationTimeRemaining = (momentTimeRemaining) => {
  console.log('calculating duration time remaining...');

  // turn into duration obj
  let durationTimeRemaining = moment.duration(momentTimeRemaining);

  let durationTimeRemainingObj = {
    isComplete: null,
    days: durationTimeRemaining.days(),
    hours: durationTimeRemaining.hours(),
    minutes: durationTimeRemaining.minutes()
  }

  if (durationTimeRemainingObj.days <= 0 && durationTimeRemainingObj.hours <= 0 && durationTimeRemainingObj.minutes <= 0) {
    durationTimeRemainingObj.isComplete = true;
  } else {
    durationTimeRemainingObj.isComplete = false;
  }

  return durationTimeRemainingObj;
}

export { calculateCreatedAt, calculateTimeRemaining, showDurationTimeRemaining };

