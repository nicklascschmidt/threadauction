import React from 'react';
import Select from 'react-select';
 
const options = [
  { value: '', label: 'None' },
  { value: 'shirts', label: 'Shirts' },
  { value: 'longSleeves', label: 'Long-sleeves / Sweaters' },
  { value: 'jackets', label: 'Jackets' },
  { value: 'shorts', label: 'Shorts' },
  { value: 'pants', label: 'Pants' },
  { value: 'underwear', label: 'Underwear / Delicates' },
  { value: 'skirts', label: 'Skirts' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'hats', label: 'Hats' },
  { value: 'socks', label: 'Socks' },
  { value: 'other', label: 'Other' }
];

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("Constructing");
    console.log(props);
    this.state = {
      category: props.category || {}
    }
  }
  

  handleCategoryChange = newObj => {
    console.log('New value',newObj);
    this.setState({category: newObj}, () => {
      this.props.handleCategoryChange(newObj)
    })
  }

  render() {
    console.log('this.props',this.props);
    console.log('Category: ' + this.state.category)
    return (
      <Select
        value={this.state.category}
        onChange={this.handleCategoryChange}
        options={options}
      />
    );
  }
}

export default CategoryForm;