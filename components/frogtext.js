import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import styles from '../styles';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hitCount: '!',
      wednesday: new Sound('Wednesday.m4a', Sound.MAIN_BUNDLE),
    };
  }

  handlePress = () => {
    if (this.state.hitCount === '!!!!!') {
      return this.setState({
        hitCount: '!'
      });
    }
    if (this.props.wedProp) {
      this.state.wednesday.play();
      return this.setState({
        hitCount: `${this.state.hitCount}!`
      });
    }
  }

  render() {
    return (
      <TouchableOpacity>
        <Text onPress={this.handlePress} style={styles.paragraph}>
          {this.props.wedProp
            ? `It is Wednesday my Dudes${this.state.hitCount}`
            : 'It is not Wednesday my Dudes...\nTune in next week!'}
        </Text>
      </TouchableOpacity>
    );
  }
}
