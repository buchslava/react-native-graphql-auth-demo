import { createStackNavigator } from 'react-navigation-stack';
import { RootRoutes } from '../../common/constants/routes';
import * as React from 'react';
import { JokeListScreen } from './Joke-list';
import { AddJokeScreen } from './Add-joke';
import { MapScreen } from './Map';
import { Colors } from '../../styles';
import { Close } from '../../components/shared/Close';

const JokeListStack = createStackNavigator(
  {
    [RootRoutes.JokeList]: { screen: JokeListScreen, navigationOptions: { header: null } },
    [RootRoutes.AddJoke]: {
      screen: AddJokeScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Close onPress={navigation.goBack} />,
        headerStyle: {
          backgroundColor: Colors.blue,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: 'white',
      }),
    },
    [RootRoutes.Map]: { screen: MapScreen, navigationOptions: { header: null } }
  },
  {
    mode: 'modal',
  }
);

export default JokeListStack;
