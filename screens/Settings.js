import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, StyleSheet, Text, Switch } from 'react-native';
import contextWrap from '../util/contextWrap';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    godmode: false,
    listViewData: [
      {
        key: 'toggleGodmode', displayItems: ['It\'s Always Wednesday in Philadelphia'], type: 'toggle'
      },
      {
        key: 'clearDudes', displayItems: ['Clear Dudes'], type: 'alert',
      },
    ],
  };

  // Unsafe, deprecated, probably an anti-pattern
  componentWillReceiveProps(nextProps) {
    const { godmode } = nextProps.context;
    this.setState({ godmode });
  }

  _renderItem = data => (
    <TouchableHighlight
      underlayColor="#dddddd"
      style={styles.rowTouchable}
      onPress={this.props.context[data.item.key]}
    >
      <View style={styles.row}>
        {data.item.displayItems.map((text, i) => (
          <View key={i} style={styles.column}>
            <Text> {text} </Text>
          </View>
        ))}
        {data.item.type === 'toggle' &&
        <Switch
          onValueChange={this.props.context.toggleGodmode}
          value={this.state.godmode}
        />
        }
      </View>
    </TouchableHighlight>
  )

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
