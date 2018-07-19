import { StackNavigator } from 'react-navigation';
import EggList from '../screens/Egg';
import FlappyFrog from '../screens/Egg/FlappyFrog/App';

const EggNavigator = StackNavigator(
  {
    EggList: {
      screen: EggList,
    },
    FlappyFrog: {
      screen: FlappyFrog,
    },
  },
  {
    headerMode: 'none',
  }
);

export default EggNavigator;
