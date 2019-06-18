import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import SideBar from '../components/SideBar';
import TabBarIcon from '../components/TabBarIcon';
import AddButton from './../components/AddButton';
import HomeScreen from '../screens/HomeScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import WorkshopDetailScreen from '../screens/WorkshopDetailScreen';
import MeetupDetailScreen from '../screens/MeetupDetailScreen';
import EventCalendarScreen from './../screens/EventCalendarScreen';
import EventListScreen from './../screens/EventListScreen';
import ScanScreen from '../screens/ScanScreen';
import Profile from './../screens/Profile';
import SignOut from '../screens/SignOut';
import SettingsScreen from '../screens/SettingsScreen';

import theme from './../theme/variables/myexpense';

const tabBarOptions = {
  activeTintColor: theme.brandPrimary,
  inactiveTintColor: '#858585',
  style: {
    height: 60,
    paddingVertical: 5,
    backgroundColor: 'blue',
  },
  labelStyle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'CircularStd-Book',
  },
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Detail: EventDetailScreen,
    WorkshopDetail: WorkshopDetailScreen,
    MeetupDetail: MeetupDetailScreen,
  },
  {
    headerMode: 'none',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  ),
};

HomeStack.tabBarOptions = tabBarOptions;

const EventStack = createStackNavigator(
  {
    Event: EventCalendarScreen,
  },
  {
    headerMode: 'none',
  }
);

EventStack.navigationOptions = {
  tabBarLabel: 'Event',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const ScanStack = createStackNavigator(
  {
    Scan: EventListScreen,
    QRScan: ScanScreen,
  },
  {
    headerMode: 'none',
  }
);

ScanStack.navigationOptions = {
  tabBarLabel: 'Scan',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-barcode' : 'md-barcode'}
    />
  ),
};

ScanStack.tabBarOptions = tabBarOptions;

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const MainTabNavigation = createBottomTabNavigator(
  {
    HomeStack,
    ScanStack,
  },
  {
    tabBarOptions: {
      tinColor: theme.tabBarTextColor,
      activeTintColor: theme.brandPrimary,
      inactiveTintColor: theme.tabBarTextColor,
      showIcon: true,
      showLabel: true,
      lazyLoad: true,
      upperCaseLabel: false,
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      style: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f2f3f4',
      },
    },
  }
);

const Drawer = createDrawerNavigator(
  {
    Home: { screen: MainTabNavigation },
    Profile: { screen: Profile },
    Settings: { screen: SettingsScreen },
    SignOut: { screen: SignOut },
  },
  {
    drawerPosition: 'right',
    initialRouteName: 'Home',
    drawerBackgroundColor: 'rgba(255, 255, 255, 0.3)',
    contentComponent: props => <SideBar {...props} />,
  }
);

export default Drawer;
