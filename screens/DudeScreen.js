import React from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import FrogImage from '../components/frogimage';
import FrogText from '../components/frogtext';
// import FrogVideo from '../components/frogvideo';
import styles from '../styles';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWednesday: false,
    };
  }

  async componentDidMount() {
    try {
      const isGodMode = JSON.parse(await AsyncStorage.getItem('godmode')) || {};
      const isWednesday = (new Date().getDay() === 3) || (isGodMode && isGodMode.value);
      this.setState({ isWednesday, loaded: true });
    } catch (err) {
      return console.log(err);
    }
  }

  render() {
    return (
      this.state.loaded
        ?
          <View style={styles.container}>
            <FrogImage wedProp={this.state.isWednesday} />
            <FrogText wedProp={this.state.isWednesday} />
          </View>
        : <ActivityIndicator size="large" color="#0000ff" />
    );
  }
}
