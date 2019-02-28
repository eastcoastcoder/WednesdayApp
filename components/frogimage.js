import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import FrogVideo from './frogvideo';

const FrogImage = ({ hitCount, currentDudeUri, handleImagePress }) => (
  <TouchableOpacity
    onPress={() => handleImagePress()}
  >
    {hitCount === 5
      ? <FrogVideo />
      : (
        <Image
          source={{ uri: currentDudeUri }}
          style={styles.dude}
        />)}
  </TouchableOpacity>
);

export default FrogImage;
