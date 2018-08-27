import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, StyleSheet, Text, Switch, Alert, ActivityIndicator } from 'react-native';
import contextWrap from '../util/contextWrap';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    disabled: Boolean(this.trueWednesday),
  };

  trueWednesday = (new Date().getDay() === 3);

  listViewData = [
    {
      key: 'toggleGodmodeSwitch', displayItems: ['It\'s Always Wednesday in Philadelphia'], type: 'toggle'
    },
    {
      key: 'clearDudes', displayItems: ['Clear Dudes'], type: 'alert',
    },
  ];

  toggleGodmodeSwitch = async () => {
    const { toggleGodmode } = this.props;
    const { disabled } = this.state;
    if (!disabled) {
      await toggleGodmode();
    }
  };

  clearDudes = async () => {
    Alert.alert(
      'Clear Dudes',
      'CAUTION: THIS WILL CLEAR ALL YOUR DUDES IN YOUR COLLECTION',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: this.props.clearDudesData },
      ],
    );
  };

  _renderItem = data => {
    const { godmode } = this.props;
    const { disabled } = this.state;
    return (
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
          {data.item.type === 'toggle' &&
          <Switch
            disabled={disabled}
            onValueChange={this.toggleGodmodeSwitch}
            value={godmode}
          />
        }
        </View>
      </TouchableHighlight>);
  };

  render() {
    const { isLoading, godmode } = this.props;
    return (
      (!isLoading)
        ?
          <FlatList
            data={this.listViewData}
            renderItem={this._renderItem}
            extraData={godmode}
          />
        : <ActivityIndicator size="large" color="#0000ff" />
    );
  }
}

export default contextWrap(SettingsScreen);

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
