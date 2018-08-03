import React from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';
import contextWrap from '../util/contextWrap';
import FrogVideo from './FrogVideo';

class FrogImage extends React.Component {
  state = {
    currentDude: 0,
  };

  static getDerivedStateFromProps({ REEEEE, notWednesday, notWednesdayDude, isWednesday, todaysDudes, isLoading, hitCount }, prevState) {
    return {
      currentDude: prevState.currentDude,
      REEEEE,
      notWednesday,
      notWednesdayDude,
      isWednesday,
      todaysDudes,
      isLoading,
      hitCount,
    };
  }

  render() {
    const { currentDude, hitCount, REEEEE, notWednesday, notWednesdayDude, isWednesday, todaysDudes, isLoading } = this.state;
    return !isLoading
      ?
        <TouchableOpacity onPress={
          isWednesday
          ? () => {
            REEEEE.play();
            return currentDude < 5
              ? this.setState({ currentDude: hitCount !== 5 ? currentDude + 1 : currentDude }) // Disallow dude rotation on FrogVideo state
              : this.setState({ currentDude: 0 });
            }
          : () => notWednesday.play()}
        >
          {hitCount === 5
            ? <FrogVideo />
            : <Image source={{ uri: isWednesday ? todaysDudes[Object.keys(todaysDudes)[currentDude]].source : notWednesdayDude.source }} style={styles.dude} />}
        </TouchableOpacity>
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}

export default contextWrap(FrogImage);
