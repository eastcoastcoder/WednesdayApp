// import Expo from 'expo';
import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Sound from 'react-native-sound';
import FrogImage from '../components/frogimage';
// import FrogVideo from '../components/frogvideo';
import styles from '../styles';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback', true);
    this.state = {
      isWednesday: false,
      hitCount: '!'
    };
    this.props.navigation.addListener(
      'didFocus',
      async () => {
        const isGodMode = JSON.parse(await AsyncStorage.getItem('godmode')).value;
        const isWednesday = (new Date().getDay() === 3) || isGodMode;
        this.setState({ isWednesday });
      },
    );
  }

  playWednesdayPhrase = async () => {
    const Wednesday = new Sound(require('../assets/sounds/Wednesday.m4a'), error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      Wednesday.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
          Wednesday.reset();
        }
      });
      console.log(`duration in seconds: ${Wednesday.getDuration()}number of channels: ${Wednesday.getNumberOfChannels()}`);
    });
  };

  handlePress = () => {
    if (this.state.hitCount === '!!!!!!') {
      return this.setState({
        hitCount: '!'
      });
    }
    if (this.state.isWednesday) {
      this.playWednesdayPhrase();
      return this.setState({
        hitCount: `${this.state.hitCount}!`
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.hitCount === '!!!!!'
        // ? <FrogVideo />
        ? null
        : <FrogImage wedProp={this.state.isWednesday} />}
        <TouchableOpacity>
          <Text onPress={this.handlePress} style={styles.paragraph}>
            {this.state.isWednesday
          ? `It is Wednesday my Dudes${this.state.hitCount}`
          : 'It is not Wednesday my Dudes...\nTune in next week!'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
