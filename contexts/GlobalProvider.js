import React, { Component } from 'react';
import {
  AsyncStorage,
  Alert,
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
      trueWednesday: (new Date().getDay() === 3),
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
    const allKeys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(allKeys);
    const storageObj = {};
    for (const store of stores) {
      storageObj[store[0]] = JSON.parse(store[1]);
    }
    const notWedUrl = `https://graph.facebook.com/v3.0/1726444857365752/photos?fields=images&access_token=${this.state.token}`;
    const curDate = (new Date()).toLocaleDateString();
    const { dudesRepository, lastFetched } = storageObj;
    if (!dudesRepository || !dudesRepository.length) {
      await this.cacheFroggos();
    }
    if (this.state.isWednesday && (lastFetched !== curDate)) {
      await this.fetchFroggos();
    }
    return this.setState({
      notWednesdayDude: (await fetchJSON(notWedUrl)).data[0].images[0],
      isLoading: false,
      ...storageObj,
    });
  }

  _clearDudes = async () => {
    Alert.alert(
      'Clear Dudes',
      'CAUTION: THIS WILL CLEAR ALL YOUR DUDES IN YOUR COLLECTION',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK',
          onPress: async () => {
            const allKeys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(allKeys);
            this.setState({ dudesCollection: [], godmode: false, isWednesday: this.state.trueWednesday });
            await this.cacheFroggos();
          } },
      ],
      { cancelable: false }
    );
  };

  fetchFroggos = async () => {
    this.setState({ isLoading: true });
    const { todaysDudes } = this.state;
    try {
      const dudesRepository = JSON.parse(await AsyncStorage.getItem('dudesRepository')) || [];
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
      await AsyncStorage.setItem('lastFetched', JSON.stringify((new Date()).toLocaleDateString()));
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
        isLoading: false,
      });
    } catch (err) {
      return console.log(err);
    }
  }

  cacheFroggos = async () => {
    let url = `https://graph.facebook.com/v3.0/202537220084441/photos?fields=images,id&limit=100&access_token=${this.state.token}`;
    let dudesRepository = [];
    while (url) {
      const response = await fetchJSON(url);
      dudesRepository = dudesRepository.concat(response.data);
      url = response.paging.next;
    }
    await AsyncStorage.setItem('dudesRepository', JSON.stringify(dudesRepository));
  }

  _toggleGodmode = async () => {
    if (!this.state.trueWednesday) {
      console.log('toggling godmode');
      const godmode = !this.state.godmode;
      this.setState({ godmode });
      const lastFetched = await AsyncStorage.getItem('lastFetched');
      const curDate = (new Date()).toLocaleDateString();
      if (godmode && (lastFetched !== curDate)) {
        await this.fetchFroggos();
      }
      this.setState({ isLoading: false, isWednesday: !this.state.isWednesday });
    }
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
