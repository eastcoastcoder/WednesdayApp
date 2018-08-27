import React from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';
import contextWrap from '../util/contextWrap';
import FrogVideo from './FrogVideo';

class FrogImage extends React.Component {
  state = {
    currentDude: 0,
    currentDudeUri: '',
  };

  incrementDude = () => {
    const isVideo = Boolean(this.props.hitCount === 5);
    const { currentDude } = this.state;
    if (!isVideo) {
      this.setState({
        currentDude:
          (currentDude < 4)
            ? currentDude + 1
            : 0
      }, () => {
        this.getDudeUri();
        this.props.REEEEE.play();
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.getDudeUri();
    }
    if (prevProps.isWednesday !== this.props.isWednesday) {
      this.getDudeUri();
    }
  }

  getDudeUri = () => {
    const { currentDude } = this.state;
    const { isWednesday, todaysDudes, notWednesdayDude } = this.props;
    const currentDudeUri =
    (isWednesday)
      ? todaysDudes[currentDude].source
      : notWednesdayDude.source;
    this.setState({
      currentDudeUri,
    });
  }

  render() {
    const { currentDudeUri } = this.state;
    const { hitCount, notWednesday, isWednesday, isLoading } = this.props;
    return (!isLoading)
      ?
        <TouchableOpacity
          onPress={(isWednesday)
            ? () => this.incrementDude()
            : () => notWednesday.play()}
        >
          {hitCount === 5
            ? <FrogVideo />
            : (
              <Image
                source={{ uri: currentDudeUri }}
                style={styles.dude}
              />)}
        </TouchableOpacity>
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}

export default contextWrap(FrogImage);
