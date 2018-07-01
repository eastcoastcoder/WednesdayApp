import React from 'react';
import { View } from 'react-native';
import FrogImage from '../components/FrogImage';
import FrogText from '../components/FrogText';
// import FrogVideo from '../components/FrogVideo';
import styles from '../styles';

const Dude = () => (
  <View style={styles.container}>
    <FrogImage />
    <FrogText />
  </View>
);

export default Dude;
