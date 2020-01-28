import { LoginScreen } from './views/login/Login';
import { AuthRoutes, RootRoutes } from './common/constants/routes';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { HomeScreen } from './views/home/Home';
import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { FailScreen } from './views/fail/Fail';

const AuthStack = createStackNavigator({
  [AuthRoutes.Login]: { screen: LoginScreen, navigationOptions: { header: null } },
});

const RootStack = createSwitchNavigator({
  [RootRoutes.Home]: { screen: HomeScreen, navigationOptions: { header: null } },
  [AuthRoutes.Login]: { screen: AuthStack, navigationOptions: { header: null } },
  [AuthRoutes.Fail]: { screen: FailScreen, navigationOptions: { header: null, gesturesEnabled: false } },
});

const App = createAppContainer(RootStack);

function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

export default Main;
