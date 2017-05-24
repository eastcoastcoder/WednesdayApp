import React from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends React.Component {
  componentDidMount() {
    PushNotification.configure({

      onRegister: (token) => {
        if (__DEV__) console.tron.log('TOKEN:', token);
      },

      onNotification: (notification) => {
        if (__DEV__) console.tron.log('NOTIFICATION:', notification);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,

      requestPermissions: true
    });
  }

  render() {
    return null;
  }
}
