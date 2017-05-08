import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton';
import styles from './Styles/LaunchScreenStyles';

import API from '../Services/Api';

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      fakeIsWednesday: true
      // isWednesday: new Date().getDay() === 3
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

  render() {
    if (!this.state.fakeIsWednesday) {
      return (
        <View style={styles.mainContainer}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
          <ScrollView style={styles.container}>
            <View style={styles.section} >
              <Text style={styles.sectionText}>
                {'It is not Wednesday my Dudes...'}
              </Text>
            </View>
          </ScrollView>
        </View>
      );
    }
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
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={{ uri: randomDude.images[0].source }} style={styles.dude} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {'It is Wednesday my Dudes'}
            </Text>
          </View>

          <DevscreensButton />
        </ScrollView>
      </View>
    );
  }
}
