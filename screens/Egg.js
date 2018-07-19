import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, StyleSheet, Text } from 'react-native';
import contextWrap from '../util/contextWrap';

class EggScreen extends Component {
  static navigationOptions = {
    title: 'Eggs',
  };

  state = {
    listViewData: [{
      key: 'navigateFlappyFrog', displayItems: ['Flappy Frog Game']
    }],
  }

  navigateFlappyFrog = () => {
    this.props.navigation.navigate('FlappyFrog');
  }

  _renderItem = data => (
    <TouchableHighlight
      underlayColor="#dddddd"
      style={styles.rowTouchable}
      onPress={async () => this[data.item.key]()}
    >
      <View style={styles.row}>
        {data.item.displayItems.map((text, i) => (
          <View key={i} style={styles.column}>
            <Text> {text} </Text>
          </View>
        ))}
      </View>
    </TouchableHighlight>);

  render() {
    return (
      <FlatList
        data={this.state.listViewData}
        renderItem={this._renderItem}
      />
    );
  }
}

export default contextWrap(EggScreen);

const styles = StyleSheet.create({
  row: {
    elevation: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTouchable: {
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
});
