import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import GlobalProvider from './contexts/GlobalProvider';

const App = () => (
  <View style={styles.container}>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
    <GlobalProvider>
      <RootNavigation />
    </GlobalProvider>
  </View>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

console.disableYellowBox = true;
