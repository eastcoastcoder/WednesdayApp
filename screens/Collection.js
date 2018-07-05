import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import GridView from 'react-native-super-grid';
import contextWrap from '../util/contextWrap';
import Lightbox from 'react-native-lightbox';

class Collection extends Component {
  static navigationOptions = {
    title: 'Collection',
  };

  state = {
    isLoading: this.props.context.isLoading,
    dudesCollection: this.props.context.dudesCollection,
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading, dudesCollection } = nextProps.context;
    this.setState({ isLoading, dudesCollection });
  }

  render() {
    const { dudesCollection, isLoading } = this.state;
    return !isLoading
      ?
        <GridView
          itemDimension={130}
          items={dudesCollection}
          style={styles.gridView}
          renderItem={({ thumbnail }) => (
            <Lightbox>
              <View style={styles.itemContainer}>
                <Image source={{ uri: thumbnail }} style={styles.backgroundImage} />
              </View>
            </Lightbox>
        )}
        />
      : <ActivityIndicator size="large" color="#0000ff" />;
  }
}

export default contextWrap(Collection);

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
