import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, StyleSheet, Text, Switch } from 'react-native';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    listViewData: [
      {
        key: 'onAlwaysWed', displayItems: ['It\'s Always Wednesday in Philadelphia'], type: 'toggle', enabled: false
      },
      {
        key: 'onDudesClear', displayItems: ['Clear Dudes'], type: 'alert',
      },
    ],
  };

  onAlwaysWed = value => {
    // Keep our listView modular
    const onAlwaysWedIdx = this.state.listViewData.findIndex(d => d.key === 'onAlwaysWed');
    this.state.listViewData[onAlwaysWedIdx].enabled = value;
    // TODO: Save to Context
    this.setState(this.state);
  }

  onDudesClear = () => {
    // TODO: Call Alert Prompt
    // TODO: Clear AsyncStorage
    console.log('dudesClearPressed');
  }

  _renderItem = data => (
    <TouchableHighlight
      underlayColor="#dddddd"
      style={styles.rowTouchable}
      onPress={this[data.item.key].bind(this)}
    >
      <View style={styles.row}>
        {data.item.displayItems.map((text, i) => (
          <View key={i} style={styles.column}>
            <Text> {text} </Text>
          </View>
        ))}
        {data.item.type === 'toggle' &&
        <Switch
          onValueChange={this[data.item.key].bind(this)}
          value={data.item.enabled}
        />}
      </View>
    </TouchableHighlight>
  )

  render() {
    return (
      <FlatList
        data={this.state.listViewData}
        renderItem={this._renderItem}
        selected={this.state.listViewData[0].enabled}
      />
    );
  }
}

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
