import React from 'react';
import { Image, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { APPID, APPSECRET } from 'react-native-dotenv';
import Sound from 'react-native-sound';
import styles from '../styles';
import { fetchJSON } from '../util/fetchJSON';
import { Map } from 'core-js';

export default class FrogImage extends React.Component {
  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true);
    this.state = {
      isLoading: true,
      notWednesday: new Sound('NotWednesday.mp3', Sound.MAIN_BUNDLE),
      REEEEE: new Sound('REEEEE.m4a', Sound.MAIN_BUNDLE),
      todaysDudes: [], // integer
      currentDude: 0,
    };
  }

  async componentDidMount() {
    const token = `${APPID}|${APPSECRET}`;
    const notWedUrl = `https://graph.facebook.com/v3.0/1726444857365752/photos?fields=images&access_token=${token}`;
    let url = `https://graph.facebook.com/v3.0/202537220084441/photos?fields=images,id&limit=100&access_token=${token}`;
    const { todaysDudes } = this.state;
    try {
      if (this.props.wedProp) {
        let results = [];
        while (url) {
          const response = await fetchJSON(url);
          results = results.concat(response.data);
          url = response.paging.next;
        }
        for (let i = 0; i < 5; i++) {
          const randomIndex = (Math.random() * results.length | 0);
          // Implement categorization strats here
          const loopDude = results[randomIndex];
          const { id } = loopDude;
          const { source } = loopDude.images[0];
          const thumbnail = findThumbnailDude(loopDude.images);
          todaysDudes.push({
            id,
            source,
            thumbnail,
          });
        }
        const dudesCollection = JSON.parse(await AsyncStorage.getItem('dudesCollection')) || [];
        const newDudes = [];
        for (const dude of todaysDudes) {
          if (!dudesCollection.includes(dude)) {
            newDudes.push(dude);
          }
        }
        const finalResults = dudesCollection.concat(newDudes);
        await AsyncStorage.setItem('dudesCollection', JSON.stringify(finalResults));
        return this.setState({
          isLoading: false,
          todaysDudes,
        });
      }
      return this.setState({
        isLoading: false,
        notWednesdayDude: (await fetchJSON(notWedUrl)).data[0].images[0],
      });
    } catch (err) {
      return console.log(err);
    }
  }

  render() {
    const { isLoading, currentDude, todaysDudes, REEEEE, notWednesday, notWednesdayDude } = this.state;
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
          <Image source={{ uri: wedProp ? todaysDudes[Object.keys(todaysDudes)[currentDude]].source : notWednesdayDude.source }} style={styles.dude} />
        </TouchableOpacity>
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}

// Takes image array
// Returns url with image of minimum height
const findThumbnailDude = (dudeArr) => {
  let minHeight = dudeArr[0].height;
  let sourceUrl = dudeArr[0].source;
  for (const { height, source } of dudeArr) {
    if (height < minHeight) { minHeight = height; sourceUrl = source; }
  }
  return sourceUrl;
};