import React from 'react';
import StyleCard from './card-style';
import StyleInput from './input-style';

class Card extends React.Component {
  render() {
    return (
      <StyleCard>
        {this.props.children}
      </StyleCard>
    )
  }
}

class Input extends React.Component {
  render() {
    return (
      <StyleInput />
    )
  }
}

export { Card, Input };