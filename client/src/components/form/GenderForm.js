import React from 'react';
import Select from 'react-select';
 
const options = [
  { value: '', label: 'None' },
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'U', label: 'Unisex' }
];
 
class GenderForm extends React.Component {
  state = {
    gender: "",
  }

  render() {
    
    return (
      <Select
        value={options.value}
        onChange={this.handleGenderChange}
        options={options}
      />
    );
  }
}

export default GenderForm;