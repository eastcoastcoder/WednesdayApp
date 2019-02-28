import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native';
import Sound from 'react-native-sound';
import { APPID, APPSECRET } from '../dotenv';
import { fetchJSON } from '../util/fetchJSON';
import { GlobalContext } from './GlobalContext';

const token = `${APPID}|${APPSECRET}`;
const trueWednesday = (new Date().getDay() === 3);
const curDate = (new Date()).toLocaleDateString();

export default class GlobalProvider extends Component {
  constructor(props) {
    super(props);

    Sound.setCategory('Playback', true);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      isLoading: true,
      isWednesday: (new Date().getDay() === 3),
      godmode: false,
      notWednesday: new Sound('NotWednesday.mp3', Sound.MAIN_BUNDLE),
      REEEEE: new Sound('REEEEE.m4a', Sound.MAIN_BUNDLE),
      wednesday: new Sound('Wednesday.m4a', Sound.MAIN_BUNDLE),
      notWednesdayDude: {},
      todaysDudes: [],
      dudesCollection: [],
      lastFetched: '',
      userAchievements: [],
      hitCount: 0,
    };
  }

  async componentDidMount() {
    await this.initialize();
  }

  initialize = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(allKeys);
    const storageObj = {};
    for (const store of stores) {
      storageObj[store[0]] = JSON.parse(store[1]);
    }
    const notWedUrl = `https://graph.facebook.com/v3.0/1726444857365752/photos?fields=images&access_token=${token}`;
    const { lastFetched } = storageObj;
    if (this.state.isWednesday && (lastFetched !== curDate)) {
      await this.fetchFroggos();
    }
    const notWednesdayDude = (await fetchJSON(notWedUrl)).data[0].images[0];
    return this.setState({
      notWednesdayDude,
      isLoading: false,
      ...storageObj,
    });
  }

  clearState = async () => {
    this.setState(this.initialState);
    await this.initialize();
  }

  clearDudesData = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(allKeys);
    await this.clearState();
  };

  fetchFroggos = async () => {
    const { todaysDudes } = this.state;
    try {
      if (!this.state.dudesRepository) await this.cacheFroggos();
      for (let i = 0; i < 5; i++) {
        const randomIndex = (Math.random() * this.state.dudesRepository.length | 0);
        // Implement categorization strats here
        const loopDude = this.state.dudesRepository[randomIndex];
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
      const lastFetched = (new Date()).toLocaleDateString();
      await AsyncStorage.setItem('lastFetched', JSON.stringify(lastFetched));
      const newDudes = [];
      for (const dude of todaysDudes) {
        if (!this.state.dudesCollection.includes(dude)) {
          newDudes.push(dude);
        }
      }
      const finalResults = this.state.dudesCollection.concat(newDudes);
      await AsyncStorage.setItem('dudesCollection', JSON.stringify(finalResults));
      return this.setState({
        todaysDudes,
        dudesCollection: finalResults,
        lastFetched,
        isLoading: false,
      });
    } catch (err) {
      return console.log(err);
    }
  }

  cacheFroggos = async () => {
    let url = `https://graph.facebook.com/v3.0/202537220084441/photos?fields=images,id&limit=100&access_token=${token}`;
    let dudesRepository = [];
    while (url) {
      let response = {};
      try {
        response = await fetchJSON(url);
        if (response.error) throw response.error;
      } catch (err) {
        // THROWS Public Page Content Access Error
        console.log(err);
      }
      dudesRepository = dudesRepository.concat(response.data);
      url = response.paging.next;
    }
    this.setState({ dudesRepository });
    await AsyncStorage.setItem('dudesRepository', JSON.stringify(dudesRepository));
  }

  toggleGodmode = async () => {
    this.setState({
      isLoading: true,
      godmode: !this.state.godmode,
    }, async () => {
      if (this.state.godmode && (this.state.lastFetched !== curDate)) {
        await this.fetchFroggos();
      }
      this.setState({
        isLoading: false,
        isWednesday: !this.state.isWednesday,
      });
    });
  };

  unlockAchievement = async (achievementId) => {
    const achievementObj = {
      key: achievementId,
    };
    switch (achievementId) {
      case '001':
        achievementObj.displayItems = ['Unlocked Diddy'];
        break;
      default:
        break;
    }
    const userAchievements = [].concat(this.state.userAchievements);
    userAchievements.push(achievementObj);
    this.setState({ userAchievements });
    await AsyncStorage.setItem('userAchievements', JSON.stringify(userAchievements));
  };

  render() {
    const { isLoading } = this.state;
    return (
      <GlobalContext.Provider value={{
        ...this.state,
        toggleGodmode: this.toggleGodmode,
        clearDudesData: this.clearDudesData,
        unlockAchievement: this.unlockAchievement,
      }}
      >
        {!isLoading && this.props.children}
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
