import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import FrogImage from '../components/FrogImage';
import FrogText from '../components/FrogText';
import styles from '../styles';
import contextWrap from '../util/contextWrap';

class Dude extends React.Component {
  state = {
    frogText: '',
    currentDude: 0,
    currentDudeUri: '',
    hitCount: 0,
  };

  componentDidMount() {
    this.generateFrogText();
    this.getDudeUri();
  }

  incrementHitCount = () => {
    this.setState(
      prevState => ({
        hitCount: prevState.hitCount + 1
      }),
      () => this.generateFrogText()
    );
  }

  resetHitCount = () => {
    this.setState({
      hitCount: 0
    }, () => this.generateFrogText());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isWednesday !== this.props.isWednesday) {
      this.generateFrogText();
      this.getDudeUri();
    }
    if (prevProps.isLoading !== this.props.isLoading) {
      this.getDudeUri();
    }
  }

  generateFrogText = () => {
    const frogText =
    (this.props.isWednesday)
      ? `It is Wednesday my Dudes${'!'.repeat(this.state.hitCount)}`
      : 'It is not Wednesday my Dudes...\nTune in next week!';
    this.setState({ frogText });
  }

 handleTextPress = () => {
   const { isWednesday, unlockAchievement, userAchievements, wednesday } = this.props;
   const { hitCount } = this.state;
   if (hitCount === 5) {
     const isUnlocked = Boolean(userAchievements.filter(d => d.key === '001').length);
     if (!isUnlocked) {
       unlockAchievement('001');
     }
     this.resetHitCount();
   }
   if (isWednesday) {
     wednesday.play();
     this.incrementHitCount();
   }
 }

 handleImagePress = () => {
   const isVideo = Boolean(this.props.hitCount === 5);
   const { isWednesday, notWednesday, REEEEE } = this.props;
   if (isWednesday && !isVideo) {
     this.setState(
       (prevState) => ({
         currentDude:
          (prevState.currentDude < 4)
            ? prevState.currentDude + 1
            : 0
       }),
       () => {
         this.getDudeUri();
         REEEEE.play();
       }
     );
   } else {
     notWednesday.play();
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
    const { frogText, hitCount, currentDudeUri } = this.state;
    const { notWednesday, isWednesday, isLoading } = this.props;
    return !isLoading
      ? (
        <View style={styles.container}>
          <FrogImage hitCount={hitCount} notWednesday={notWednesday} isWednesday={isWednesday} currentDudeUri={currentDudeUri} handleImagePress={this.handleImagePress} />
          <FrogText frogText={frogText} handleTextPress={this.handleTextPress} />
        </View>)
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}

export default contextWrap(Dude);
