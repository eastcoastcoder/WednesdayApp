import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, StyleSheet, Text, Switch, AsyncStorage } from 'react-native';

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

  async componentWillMount() {
    const godmode = !!(await AsyncStorage.getItem('godmode'));
    const onAlwaysWedIdx = this.state.listViewData.findIndex(d => d.key === 'onAlwaysWed');
    this.state.listViewData[onAlwaysWedIdx].enabled = godmode;
    this.setState(this.state);
  }

  onAlwaysWed = async () => {
    // Keep our listView modular
    const onAlwaysWedIdx = this.state.listViewData.findIndex(d => d.key === 'onAlwaysWed');
    this.state.listViewData[onAlwaysWedIdx].enabled = !this.state.listViewData[onAlwaysWedIdx].enabled;
    await AsyncStorage.setItem('godmode', JSON.stringify({ value: this.state.listViewData[onAlwaysWedIdx].enabled }));
    this.setState(this.state);
  }

  onDudesClear = async () => {
    // TODO: Call Alert Prompt
    await AsyncStorage.removeItem('dudesCollection');
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
