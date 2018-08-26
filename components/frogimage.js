import React from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';
import contextWrap from '../util/contextWrap';
import FrogVideo from './FrogVideo';

class FrogImage extends React.Component {
  state = {
    currentDude: 0,
  };

  render() {
    const VIDEO_MODE = Boolean(this.props.hitCount === 5);
    const { currentDude } = this.state;
    const { hitCount, REEEEE, notWednesday, notWednesdayDude, isWednesday, todaysDudes, isLoading } = this.props;
    return (!isLoading)
      ?
        <TouchableOpacity
          onPress={
          (isWednesday)
            ? () => {
              REEEEE.play();
              return (currentDude < 5)
                ? this.setState({
                  currentDude:
                    (VIDEO_MODE)
                      ? currentDude
                      : currentDude + 1 })
                : this.setState({ currentDude: 0 });
              }
            : () => notWednesday.play()}
        >
          {hitCount === 5
            ? <FrogVideo />
            : <Image
              source={{
              uri:
              (isWednesday)
              ? currentDude < 5
                ? todaysDudes[currentDude].source
                : todaysDudes[0].source
              : notWednesdayDude.source }}
              style={styles.dude}
            />}
        </TouchableOpacity>
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}

export default contextWrap(FrogImage);
