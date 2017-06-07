// Run this on snack.expo.io, ask me for .env
// This is not used in the project and is only here for reference.

import { Constants, Audio } from 'expo';
import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import Secrets from 'react-native-config';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      isWednesday: new Date().getDay() === 3
    };

    this.getData();
  }

  playREEEEE = async () => {
    await Audio.setIsEnabledAsync(true);
    const REEEEE = new Audio.Sound({
      source: 'https://github.com/ethanx94/WednesdayApp/blob/master/App/Images/REEEEE.m4a?raw=true'
    });
    await REEEEE.loadAsync();
    await REEEEE.playAsync();
  };

  playWednesdayPhrase = async () => {
    await Audio.setIsEnabledAsync(true);
    const Wednesday = new Audio.Sound({
      source: 'https://github.com/ethanx94/WednesdayApp/blob/master/App/Images/Wednesday.m4a?raw=true'
    });
    await Wednesday.loadAsync();
    await Wednesday.playAsync();
  };

  getData = async () => {
    const token = `${Secrets.APPID}|${Secrets.APPSECRET}`;
    fetch(`https://graph.facebook.com/v2.9/1726444857365752/photos?fields=images&access_token=${token}`)
     .then((response) => response.json())
     .catch(err => console.log(err))
     .then((body) =>
     this.setState({
       isLoading: false,
       data: body
     }));
  }

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
    if (notSoRandomNumber in omittedArr) {
      notSoRandomNumber = (Math.random() * results.length | 0);
    }
    const randomDude = results[notSoRandomNumber];

    if (!this.state.isWednesday) {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.playREEEEE}>
            <Image source={{ uri: results[0].images[0].source }} style={styles.dude} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.playWednesdayPhrase}>
            <Text style={styles.paragraph}>
              {'It is not Wednesday my Dudes...'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.playREEEEE}>
          <Image source={{ uri: randomDude.images[0].source }} style={styles.dude} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.playWednesdayPhrase}>
          <Text style={styles.paragraph}>
            {'It is Wednesday my Dudes'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  dude: {
    marginTop: 50,
    height: 375,
    width: 375,
    resizeMode: 'contain'
  },
});
