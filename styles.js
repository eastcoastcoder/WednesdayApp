import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  dude: {
    marginTop: 50,
    height: 375,
    width: 375,
    resizeMode: 'contain'
  },
  dudeVid: {
    width: 375,
    height: 375
  }
});
