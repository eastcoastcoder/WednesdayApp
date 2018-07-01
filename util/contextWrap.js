import React, { Component } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

export default function contextWrap(InputComponent) {
  return class extends Component {
    render() {
      return (
        <GlobalContext.Consumer>
          {context => (
            <InputComponent {...this.props} context={context} />)}
        </GlobalContext.Consumer>
      );
    }
  };
}
