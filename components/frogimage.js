import React from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';

export default class FrogImage extends React.Component {
  state = { currentDude: 0 };
  render() {
    const { currentDude } = this.state;
    const { REEEEE, notWednesday, notWednesdayDude, isWednesday, todaysDudes, isLoading } = this.props.context;
    return !isLoading
      ?
        <TouchableOpacity onPress={isWednesday
          ? () => {
            REEEEE.play();
            return currentDude < 4
              ? this.setState({ currentDude: currentDude + 1 })
              : this.setState({ currentDude: 0 });
            }
          : () => notWednesday.play()}
        >
          <Image source={{ uri: isWednesday ? todaysDudes[Object.keys(todaysDudes)[currentDude]].source : notWednesdayDude.source }} style={styles.dude} />
        </TouchableOpacity>
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}
