import Expo from 'expo';
import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { APPID, APPSECRET } from 'react-native-dotenv';
import styles from '../styles';

export default class FrogImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
    Expo.Audio.setIsEnabledAsync(true);
    this.getData();
  }

  getData = async () => {
    const token = `${APPID}|${APPSECRET}`;
    const url = `https://graph.facebook.com/v2.9/1726444857365752/photos?fields=images&access_token=${token}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        isLoading: false,
        data
      });
    } catch (err) {
      return console.log(err);
    }
  }

  playREEEEE = async () => {
    const REEEEE = new Expo.Audio.Sound();
    await REEEEE.loadAsync(require('../assets/sounds/REEEEE.m4a'));
    await REEEEE.playAsync();
  };

  playNotWednesdaySound = async () => {
    const Wednesday = new Expo.Audio.Sound();
    await Wednesday.loadAsync(require('../assets/sounds/NotWednesday.mp3'));
    await Wednesday.playAsync();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.container} >
            <Text style={styles.paragraph}>
              {'Loading...'}
            </Text>
          </View>
        </View>
      );
    }

    const results = this.state.data.data;
    let notSoRandomNumber = (Math.random() * results.length | 0);
    const omittedArr = [0, 7, 21];
    // If any of the following reserved dudes, reroll
    while (omittedArr.includes(notSoRandomNumber)) {
      notSoRandomNumber = (Math.random() * results.length | 0);
    }
    const randomDude = this.props.wedProp ? results[notSoRandomNumber] : results[0];
    return (
      <TouchableOpacity onPress={this.props.wedProp ? this.playREEEEE : this.playNotWednesdaySound}>
        <Image source={{ uri: randomDude.images[0].source }} style={styles.dude} />
      </TouchableOpacity>
    );
  }
}

Expo.registerRootComponent(FrogImage);
