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
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;
 
    return (
      <Select
        value={selectedOption}
        onChange={this.handleGenderChange}
        options={options}
      />
    );
  }
}

export default GenderForm;