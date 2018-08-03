import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import contextWrap from '../util/contextWrap';

class FrogText extends React.Component {
  static getDerivedStateFromProps({ hitCount, wednesday, incrementHitCount, resetHitCount }) {
    return {
      hitCount,
      wednesday,
      incrementHitCount,
      resetHitCount,
    };
  }

  handlePress = async () => {
    const { hitCount, wednesday } = this.state;
    const { isWednesday, unlockAchievement, userAchievements, incrementHitCount, resetHitCount } = this.props;
    if (hitCount === 5) {
      const isUnlocked = Boolean(userAchievements.filter(d => d.key === '001').length);
      if (!isUnlocked) {
        unlockAchievement('001');
      }
      return resetHitCount();
    }
    if (isWednesday) {
      wednesday.play();
      return incrementHitCount();
    }
  }

  render() {
    const { hitCount } = this.state;
    const { isWednesday } = this.props;
    const hitCountDisplay = '!'.repeat(hitCount);
    return (
      <TouchableOpacity>
        <Text onPress={this.handlePress} style={styles.paragraph}>
          {isWednesday
            ? `It is Wednesday my Dudes${hitCountDisplay}`
            : 'It is not Wednesday my Dudes...\nTune in next week!'}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default contextWrap(FrogText);
