import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import contextWrap from '../util/contextWrap';

const FrogText = (props) => (
  <TouchableOpacity>
    <Text onPress={() => handlePress(props)} style={styles.paragraph}>
      {props.isWednesday
          ? `It is Wednesday my Dudes${'!'.repeat(props.hitCount)}`
          : 'It is not Wednesday my Dudes...\nTune in next week!'}
    </Text>
  </TouchableOpacity>);

function handlePress(props) {
  const { isWednesday, unlockAchievement, userAchievements, incrementHitCount, resetHitCount, hitCount, wednesday } = props;
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

export default contextWrap(FrogText);
