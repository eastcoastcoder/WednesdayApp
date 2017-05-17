import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Images } from '../Themes';
import styles from './Styles/LaunchScreenStyles';
import API from '../Services/Api';
// import DevscreensButton from '../../ignite/DevScreens/DevscreensButton';

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      isWednesday: new Date().getDay() === 3
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
    PushNotification.localNotification({
      // title: 'My Notification Title',
      message: 'My Notification Message'
    });
    // console.tron.log(PushNotification);

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

            {/* <DevscreensButton />*/}
          </ScrollView>
        </View>
      );
    }
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

          {/* <DevscreensButton />*/}
        </ScrollView>
      </View>
    );
  }
}
