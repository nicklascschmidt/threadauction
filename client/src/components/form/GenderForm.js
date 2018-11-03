import React from 'react';
import Select from 'react-select';

const options = [
 { value: '', label: 'None' },
 { value: 'M', label: 'Male' },
 { value: 'F', label: 'Female' },
 { value: 'U', label: 'Unisex' }
];


class GenderForm extends React.Component {
<<<<<<< HEAD
  state = {
    gender: "",
  }

  render() {
    
    return (
      <Select
        value={options.value}
=======
  constructor(props) {
    super(props);

    this.state = {
      gender: props.gender || {}
    }
  }
  

  handleGenderChange = newObj => {
    // console.log('New value',newObj);
    this.setState({gender: newObj}, () => {
      console.log(this.state)
      this.props.handleGenderChange(newObj)
    })
  }

  render() {
    return (
      <Select
        value={this.state.gender}
>>>>>>> ff5b5ccff0917fc508f275fcd9239a3851c868d9
        onChange={this.handleGenderChange}
        options={options}
      />
    );
  }
}

export default GenderForm;
