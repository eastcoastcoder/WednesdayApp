import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { GlobalContext } from '../contexts/GlobalContext';

export default function contextWrap(InputComponent) {
  const WrappedComponent = (props) => (
    <GlobalContext.Consumer>
      {context => (
        <InputComponent {...props} {...context} />)}
    </GlobalContext.Consumer>
  );
  return hoistNonReactStatic(WrappedComponent, InputComponent);
}
