import React from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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
    const notWedUrl = `https://graph.facebook.com/v3.0/1726444857365752/photos?fields=images&access_token=${token}`;
    const url = `https://graph.facebook.com/v3.0/202537220084441/photos?fields=images,id&access_token=${token}`;
    try {
      if (this.props.wedProp) {
        const response = await fetchJSON(url);
        const results = response.data;
        for (let i = 0; i < 5; i++) {
          const randomIndex = (Math.random() * results.length | 0);
          // Implement categorization strats here
          this.state.todaysDudes.push(randomIndex);
        }
        // Save by object ID, not random index
        // const myDudes = JSON.parse(await AsyncStorage.getItem('myDudes')) || [];
        // await AsyncStorage.setItem('myDudes', JSON.stringify(myDudes.concat(this.state.todaysDudes)));
        return this.setState({
          isLoading: false,
          results,
          todaysDudes: this.state.todaysDudes,
          notWednesdayDude: results[0],
        });
      }
      return this.setState({
        isLoading: false,
        notWednesdayDude: (await fetchJSON(notWedUrl)).data[0],
      });
    } catch (err) {
      return console.log(err);
    }
  }

  render() {
    const { isLoading, currentDude, results, todaysDudes, REEEEE, notWednesday, notWednesdayDude } = this.state;
    const { wedProp } = this.props;
    return !isLoading
      ?
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
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}
