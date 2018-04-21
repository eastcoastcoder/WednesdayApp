import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class CollectionScreen extends React.Component {
  static navigationOptions = {
    title: 'Collection',
  };

  render() {
    return (
      <ExpoConfigView />
    );
  }
}
