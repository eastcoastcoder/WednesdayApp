import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { APPID, APPSECRET } from 'react-native-dotenv';
import GridView from 'react-native-super-grid';

export default class CollectionScreen extends Component {
  static navigationOptions = {
    title: 'Collection',
  };

  state = {
    data: [],
  }

  fetchJSON = async (input) => (await fetch(input)).json();

  async componentWillMount() {
    const token = `${APPID}|${APPSECRET}`;
    let url = `https://graph.facebook.com/v2.9/202537220084441/photos?fields=images,id&limit=100&access_token=${token}`;
    try {
      while (url) {
        const response = await this.fetchJSON(url);
        const final = response.data.map(d => findThumbnailDude(d.images));
        this.setState({
          data: this.state.data.concat(final),
        });
        url = response.paging.next;
        console.log(this.state.data);
      }
    } catch (err) {
      return console.log(err);
    }
  }

  render() {
    return (
      <GridView
        itemDimension={130}
        items={this.state.data}
        style={styles.gridView}
        renderItem={uri => (
          <View style={styles.itemContainer}>
            <Image source={{ uri }} style={styles.backgroundImage} />
          </View>
        )}
      />
    );
  }
}

// Takes image array
// Returns url with image of minimum height
const findThumbnailDude = (dudeArr) => {
  let minHeight = dudeArr[0].height;
  let sourceUrl = dudeArr[0].source;
  for (const { height, source } of dudeArr) {
    if (height < minHeight) { minHeight = height; sourceUrl = source; }
  }
  return sourceUrl;
};

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
