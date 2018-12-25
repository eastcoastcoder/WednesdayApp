import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';

class ExperimentsScreen extends Component {
  static navigationOptions = {
    title: 'Experiments',
  };

  state = {
    thing: 'test',
  }

  onButtonPress = () =>
    PushNotification.localNotification({
      title: 'Hello',
      message: 'Notification Test'
    });

  render() {
    return (
      <View>
        <Text>{this.state.thing}</Text>
        <Button
          onPress={() => this.onButtonPress()}
          title="Press for notification"
        />
      </View>
    );
  }
}

export default ExperimentsScreen;
