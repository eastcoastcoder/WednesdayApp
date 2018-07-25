import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
import styles from '../styles';
import contextWrap from '../util/contextWrap';

class FrogText extends React.Component {
  state = {
    hitCount: '!',
    wednesday: new Sound('Wednesday.m4a', Sound.MAIN_BUNDLE),
  };

  handlePress = async () => {
    if (this.state.hitCount === '!!!!!') {
      const isUnlocked = Boolean(this.props.userAchievements.filter(d => d.key === '001').length);
      if (!isUnlocked) {
        this.props.unlockAchievement('001');
      }
      return this.setState({
        hitCount: '!'
      });
    }
    if (this.props.isWednesday) {
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
          {this.props.isWednesday
            ? `It is Wednesday my Dudes${this.state.hitCount}`
            : 'It is not Wednesday my Dudes...\nTune in next week!'}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default contextWrap(FrogText);
