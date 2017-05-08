import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton';
// import ListviewGridExample from './ListviewGridExample.js'

import { Images } from '../Themes';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 1,
      data: [],
      isLoading: true,
      isWednesday: new Date().getDay() === 0
      // isWednesday: new Date().getDay() === 3
    };

    // setInterval(() => {
    //   this.setState({ counter: this.state.counter + 1 });
    // }, 1000);
  }

  componentWillMount() {
    const token = '...';
    fetch(`https://graph.facebook.com/v2.9/1726444857365752/photos?fields=images&access_token=${token}`)
    .then((response) => response.json())
    .then((body) =>
    this.setState({
      isLoading: false,
      data: body
    }))
    .catch(err => console.tron.log(err));
  }

  render() {
    if (!this.state.isWednesday) {
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
    const dude = results[(Math.random() * results.length | 0)];
    console.tron.log(dude);
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={{ uri: dude.images[0].source }} style={styles.dude} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {'It is Wednesday my Dudes'}
            </Text>
          </View>

          {/* <ListviewGridExample />*/}
          <DevscreensButton />
        </ScrollView>
      </View>
    );
  }
}
