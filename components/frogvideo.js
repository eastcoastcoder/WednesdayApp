import React from 'react';
import Video from 'react-native-video';

import styles from '../styles';

const FrogVideo = () => (
  <Video
    source={require('../assets/videos/ditty.mp4')}
    rate={1.0}
    volume={1.0}
    muted={false}
    resizeMode="cover"
    // repeat
    style={styles.dudeVid}
  />
);

export default FrogVideo;
