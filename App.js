import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import FlashCardScreen from './src/screens/FlashCardScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    FlashCard: FlashCardScreen,
  },
  {
    initialRouteName: 'FlashCard',
    defaultNavigationOptions: {
      title: 'Flash Card',
    },
  }
);

export default createAppContainer(navigator);
