import React from 'react';
import Select from 'react-select';

const options = [
 { value: '', label: 'None' },
 { value: 'M', label: 'Male' },
 { value: 'F', label: 'Female' },
 { value: 'U', label: 'Unisex' }
];


class GenderForm extends React.Component {
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
        onChange={this.handleGenderChange}
        options={options}
      />
    );
  }
}

export default GenderForm;
