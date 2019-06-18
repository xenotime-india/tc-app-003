import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import AuthLoadingScreen from './../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import SocialSignIn from './../screens/SocialSignIn';

const AuthStack = createStackNavigator(
  { SignIn: SocialSignIn },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      App: MainTabNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
