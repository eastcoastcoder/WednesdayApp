import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import GridView from 'react-native-super-grid';

export default class CollectionScreen extends Component {
  static navigationOptions = {
    title: 'Collection',
  };

  state = {
    isLoading: true,
  }

  async componentDidMount() {
    try {
      const finalCollection = JSON.parse(await AsyncStorage.getItem('dudesCollection')) || [];
      this.setState({ finalCollection, isLoading: false });
    } catch (err) {
      return console.log(err);
    }
  }

  render() {
    return !this.state.isLoading
      ?
        <GridView
          itemDimension={130}
          items={this.state.finalCollection}
          style={styles.gridView}
          renderItem={({ thumbnail }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: thumbnail }} style={styles.backgroundImage} />
            </View>
        )}
        />
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
