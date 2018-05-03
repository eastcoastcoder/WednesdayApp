import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { APPID, APPSECRET } from 'react-native-dotenv';
import Sound from 'react-native-sound';
import styles from '../styles';
import { fetchJSON } from '../util/fetchJSON';

export default class FrogImage extends React.Component {
  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true);
    this.state = {
      isLoading: true,
      notWednesday: new Sound('NotWednesday.mp3', Sound.MAIN_BUNDLE),
      REEEEE: new Sound('REEEEE.m4a', Sound.MAIN_BUNDLE),
      results: [], // obj, from fetch
      todaysDudes: [], // integer
      currentDude: 0,
    };
  }

  async componentDidMount() {
    const token = `${APPID}|${APPSECRET}`;
    const url = `https://graph.facebook.com/v2.9/1726444857365752/photos?fields=images&access_token=${token}`;
    // const newRepo = `https://graph.facebook.com/v2.9/202537220084441/photos?fields=images,id&access_token=${token}`;
    try {
      const response = await fetchJSON(url);
      const results = response.data;
      for (let i = 0; i < 5; i++) {
        let notSoRandomNumber = (Math.random() * results.length | 0);
        const omittedArr = [0, 7, 21];
        // If any of the following reserved dudes, reroll
        while (omittedArr.includes(notSoRandomNumber)) {
          notSoRandomNumber = (Math.random() * results.length | 0);
        }
        this.state.todaysDudes.push(notSoRandomNumber);
      }
      this.setState({
        isLoading: false,
        results,
        todaysDudes: this.state.todaysDudes,
        notWednesdayDude: results[0],
      });
    } catch (err) {
      return console.log(err);
    }
  }

  render() {
    const { isLoading, currentDude, results, todaysDudes, REEEEE, notWednesday, notWednesdayDude } = this.state;
    const { wedProp } = this.props;
    return isLoading
      ? (
        <View style={styles.container}>
          <View style={styles.container} >
            <Text style={styles.paragraph}>
              {'Loading...'}
            </Text>
          </View>
        </View>)
      : (
        <TouchableOpacity onPress={wedProp
        ? () => {
          REEEEE.play();
          return currentDude < 4
            ? this.setState({ currentDude: currentDude + 1 })
            : this.setState({ currentDude: 0 });
        }
        : () => notWednesday.play()}
        >
          <Image source={{ uri: wedProp ? results[todaysDudes[currentDude]].images[0].source : notWednesdayDude.images[0].source }} style={styles.dude} />
        </TouchableOpacity>
      );
  }
}
