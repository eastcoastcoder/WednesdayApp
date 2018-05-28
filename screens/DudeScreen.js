import React, { Fragment } from 'react';
import { View } from 'react-native';
import FrogImage from '../components/frogimage';
import FrogText from '../components/frogtext';
// import FrogVideo from '../components/frogvideo';
import styles from '../styles';
import { GlobalContext } from '../util/GlobalContext';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GlobalContext.Consumer>
          {context => (
            <Fragment>
              <FrogImage context={context} />
              <FrogText context={context} />
            </Fragment>
        )}
        </GlobalContext.Consumer>
      </View>
    );
  }
}
