import Expo from 'expo';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FrogImage from '../components/frogimage';
import FrogVideo from '../components/frogvideo';
import styles from '../styles';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isWednesday: new Date().getDay() === 3,
      // isWednesday: true, // Testing purposes only, very dangerous
      hitCount: '!'
    };
    this.handlePress = this.handlePress.bind(this);
  }

  playWednesdayPhrase = async () => {
    await Expo.Audio.setIsEnabledAsync(true);
    const Wednesday = new Expo.Audio.Sound();
    await Wednesday.loadAsync(require('../assets/sounds/Wednesday.m4a'));
    await Wednesday.playAsync();
  };

  handlePress() {
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
    const wedText = this.state.isWednesday ? `It is Wednesday my Dudes${this.state.hitCount}` : 'It is not Wednesday my Dudes...\nTune in next week!';
    return (
      <View style={styles.container}>
        {this.state.hitCount === '!!!!!' ? <FrogVideo /> : <FrogImage wedProp={this.state.isWednesday} />}
        <TouchableOpacity>
          <Text onPress={this.handlePress} style={styles.paragraph}>
            {wedText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
