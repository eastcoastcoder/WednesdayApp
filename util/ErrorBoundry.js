import { Component } from 'react';
import { Alert } from 'react-native';

export default class ErrorBoundry extends Component {
  state = {
    hasError: false,
    err: {},
  };

  componentDidCatch(err) {
    this.setState({ hasError: true, err });
  }

  render() {
    const { hasError, err: { message } } = this.state;
    if (hasError) {
      Alert.alert(
        'An Error Occured',
        message,
        [
          { text: 'OK' },
        ]
      );
    }
    return this.props.children;
  }
}
