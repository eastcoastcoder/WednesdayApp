import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native';
import Sound from 'react-native-sound';
import { APPID, APPSECRET } from 'react-native-dotenv';
import { fetchJSON } from '../util/fetchJSON';
import { GlobalContext } from './GlobalContext';

export default class GlobalProvider extends Component {
  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true);
    this.state = {
      token: `${APPID}|${APPSECRET}`,
      isWednesday: (new Date().getDay() === 3),
      godmode: false,
      notWednesday: new Sound('NotWednesday.mp3', Sound.MAIN_BUNDLE),
      notWednesdayDude: {},
      REEEEE: new Sound('REEEEE.m4a', Sound.MAIN_BUNDLE),
      todaysDudes: [], // integer
      isLoading: true,
      dudesCollection: [],
    };
  }

  async componentDidMount() {
    const notWedUrl = `https://graph.facebook.com/v3.0/1726444857365752/photos?fields=images&access_token=${this.state.token}`;
    const dudesCollection = JSON.parse(await AsyncStorage.getItem('dudesCollection')) || [];
    const dudesRepository = JSON.parse(await AsyncStorage.getItem('dudesRepository')) || [];
    const todaysDudes = JSON.parse(await AsyncStorage.getItem('todaysDudes')) || [];
    return this.setState({
      notWednesdayDude: (await fetchJSON(notWedUrl)).data[0].images[0],
      isLoading: false,
      dudesCollection,
      dudesRepository,
      todaysDudes,
    });
  }

  // TODO: Call Alert Prompt
  _clearDudes = async () => {
    console.log('clearing dudes...');
    await AsyncStorage.removeItem('dudesCollection');
    await AsyncStorage.removeItem('dudesRepository');
    this.setState({ dudesCollection: [] });
  };

  fetchFroggos = async () => {
    this.setState({ isLoading: true });
    let url = `https://graph.facebook.com/v3.0/202537220084441/photos?fields=images,id&limit=100&access_token=${this.state.token}`;
    const { todaysDudes } = this.state;
    try {
      let dudesRepository = [];
      while (url) {
        const response = await fetchJSON(url);
        dudesRepository = dudesRepository.concat(response.data);
        url = response.paging.next;
      }
      await AsyncStorage.setItem('dudesRepository', JSON.stringify(dudesRepository));
      for (let i = 0; i < 5; i++) {
        const randomIndex = (Math.random() * dudesRepository.length | 0);
        // Implement categorization strats here
        const loopDude = dudesRepository[randomIndex];
        const { id } = loopDude;
        const { source } = loopDude.images[0];
        const thumbnail = findThumbnailDude(loopDude.images);
        todaysDudes.push({
          id,
          source,
          thumbnail,
        });
      }
      await AsyncStorage.setItem('todaysDudes', JSON.stringify(todaysDudes));
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
        todaysDudes,
        dudesCollection,
        dudesRepository,
        isLoading: false,
      });
    } catch (err) {
      return console.log(err);
    }
  }

  _toggleGodmode = async () => {
    console.log('toggling godmode');
    const godmode = !this.state.godmode;
    this.setState({ isLoading: true, godmode });
    if (godmode && !this.state.dudesRepository.length) {
      await this.fetchFroggos();
    }
    this.setState({ isLoading: false, isWednesday: !this.state.isWednesday });
  };

  render() {
    return (
      <GlobalContext.Provider value={{
        ...this.state,
        toggleGodmode: async () => await this._toggleGodmode(),
        clearDudes: async () => await this._clearDudes()
      }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

const findThumbnailDude = (dudeArr) => {
  let minHeight = dudeArr[0].height;
  let sourceUrl = dudeArr[0].source;
  for (const { height, source } of dudeArr) {
    if (height < minHeight) { minHeight = height; sourceUrl = source; }
  }
  return sourceUrl;
};
