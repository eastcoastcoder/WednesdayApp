import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { APPID, APPSECRET } from 'react-native-dotenv';
import Sound from 'react-native-sound';
import styles from '../styles';

export default class FrogImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      notWednesday: null,
    };
    this.getData();
  }

  async componentWillMount() {
    Sound.setCategory('Playback', true);
    this.setState({
      notWednesday: new Sound('NotWednesday.mp3', Sound.MAIN_BUNDLE),
      REEEEE: new Sound('REEEEE.m4a', Sound.MAIN_BUNDLE),
    });
  }

  playSound = (soundObj) => soundObj.play();

  getData = async () => {
    const token = `${APPID}|${APPSECRET}`;
    const url = `https://graph.facebook.com/v2.9/1726444857365752/photos?fields=images&access_token=${token}`;
    // const newRepo = `https://graph.facebook.com/v2.9/202537220084441/photos?fields=images,id&access_token=${token}`;
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
      <TouchableOpacity onPress={this.props.wedProp
        ? () => this.playSound(this.state.REEEEE)
        : () => this.playSound(this.state.notWednesday)}
      >
        <Image source={{ uri: randomDude.images[0].source }} style={styles.dude} />
      </TouchableOpacity>
    );
  }
}

// Expo.registerRootComponent(FrogImage);
