import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, StyleSheet, Text, Switch, Alert, AsyncStorage } from 'react-native';
import contextWrap from '../util/contextWrap';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    godmode: this.props.context.godmode,
    listViewData: [],
  }

  trueWednesday = (new Date().getDay() === 3);

  static getDerivedStateFromProps(nextProps) {
    return {
      godmode: nextProps.context.godmode,
      listViewData: [
        {
          key: 'toggleGodmode', displayItems: ['It\'s Always Wednesday in Philadelphia'], type: 'toggle'
        },
        {
          key: 'clearDudes', displayItems: ['Clear Dudes'], type: 'alert',
        },
      ],
    };
  }

  toggleGodmode = async () => this.props.context.toggleGodmode();

  clearDudes = async () => {
    Alert.alert(
      'Clear Dudes',
      'CAUTION: THIS WILL CLEAR ALL YOUR DUDES IN YOUR COLLECTION',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: this.props.context.clearDudesData },
      ],
      { cancelable: false }
    );
  };

  _renderItem = data => {
    const { toggleGodmode } = this.props.context;
    const { godmode } = this.state;
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
            disabled={this.trueWednesday}
            onValueChange={toggleGodmode}
            value={godmode}
          />
        }
        </View>
      </TouchableHighlight>);
  };

  render() {
    return (
      <FlatList
        data={this.state.listViewData}
        renderItem={this._renderItem}
        extraData={this.state.godmode}
      />
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
