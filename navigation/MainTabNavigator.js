import React from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';
import Dude from '../screens/Dude';
import Collection from '../screens/Collection';
import Egg from './EggNavigator';
import Settings from '../screens/Settings';
import Achievements from '../screens/Achievements';

export default TabNavigator(
  {
    Dude: {
      screen: Dude,
      navigationOptions: {
        title: 'Dude',
      },
    },
    Collection: {
      screen: Collection,
    },
    Egg: {
      screen: Egg,
    },
    Achievements: {
      screen: Achievements,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Dude':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Collection':
            iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
            break;
          case 'Egg':
            iconName =
              Platform.OS === 'ios'
                ? `ios-egg${focused ? '' : '-outline'}`
                : 'md-egg';
            break;
          case 'Achievements':
            iconName =
                Platform.OS === 'ios'
                  ? `ios-star${focused ? '' : '-outline'}`
                  : 'md-star';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
            break;
          default:
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
