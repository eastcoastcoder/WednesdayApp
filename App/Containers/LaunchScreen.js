import React from 'react';
import { ScrollView, Text, Image, View, AppState, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import API from '../Services/Api';
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton';
import PushNotificationController from '../Config/PushController';

const Sound = require('react-native-sound');
const REEEEE = require('../Images/REEEEE.m4a');
const WednesdayPhrase = require('../Images/Wednesday.m4a');

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);

    // Setup Sound Stuffs
    Sound.setCategory('Ambient', true);
    this.playREEEEE = () => {
      const s = new Sound(REEEEE, (e) => {
        if (e) {
          console.log('error', e);
        } else {
          s.play(() => s.release());
        }
      });
    };
    this.playWednesdayPhrase = () => {
      const s = new Sound(WednesdayPhrase, (e) => {
        if (e) {
          console.log('error', e);
        } else {
          s.play(() => s.release());
        }
      });
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      data: [],
      isLoading: true,
      // isWednesday: new Date().getDay() === 3
      isWednesday: true
    };

    this.getData();
  }

  getData = async () => {
    const api = API.create();
    const froggos = await api.getFrogAlbumPhotos();
    this.setState({
      data: froggos.data,
      isLoading: false
    });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    console.tron.log(appState);
    if (appState === 'background' && this.state.isWednesday) {
      for (let i = 0; i < 3; i++) {
        PushNotification.localNotification({
          title: 'It is Wednesday',
          message: 'It is Wednesday My Dudes!',
        });
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.mainContainer}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
          <ScrollView style={styles.container}>
            <View style={styles.section} >
              <Text style={styles.sectionText}>
                {'Loading...'}
              </Text>
            </View>
          </ScrollView>
        </View>
      );
    }

    const results = this.state.data.data;
    const randomDude = results[(Math.random() * results.length | 0)];
    if (!this.state.isWednesday) {
      return (
        <View style={styles.mainContainer}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
          <ScrollView style={styles.container}>
            <View style={styles.centered}>
              <Image source={{ uri: results[0].images[0].source }} style={styles.dude} />
            </View>

            <View style={styles.section} >
              <Text style={styles.sectionText}>
                {'It is not Wednesday my Dudes...'}
              </Text>
            </View>
            <DevscreensButton />
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
        <ScrollView style={styles.container}>
          <TouchableOpacity onPress={this.playREEEEE}>
            <View style={styles.centered}>
              <Image source={{ uri: randomDude.images[0].source }} style={styles.dude} />
            </View>
          </TouchableOpacity>
          <View style={styles.section} >
            <TouchableOpacity onPress={this.playWednesdayPhrase}>
              <Text style={styles.sectionText}>
                {'It is Wednesday my Dudes'}
              </Text>
            </TouchableOpacity>
          </View>
          <PushNotificationController />
          <DevscreensButton />
        </ScrollView>
      </View>
    );
  }
}
