import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from '../styles';

const FrogText = ({ frogText, handleTextPress }) => (
  <TouchableOpacity>
    <Text
      onPress={() => handleTextPress()}
      style={styles.paragraph}
    >
      {frogText}
    </Text>
  </TouchableOpacity>
);

export default FrogText;
