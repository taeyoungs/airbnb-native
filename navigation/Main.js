import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Explorer from '../screens/Main/Explorer';
import Saved from '../screens/Main/Saved';
import MapScreen from '../screens/Main/Map';
import Profile from '../screens/Main/Profile';
import Search from '../screens/Main/Search';
import colors from '../colors';
import utils from '../utils';
import Room from '../screens/Main/Room';
import BackBtn from '../components/Auth/BackBtn';
import Info from '../screens/Main/Info';
import ProfileHeader from '../components/Header/ProfileHeader';

const TabsNavigator = createBottomTabNavigator();
const MainNavigator = createStackNavigator();

const Tabs = () => {
  return (
    <TabsNavigator.Navigator
      tabBarOptions={{
        activeTintColor: colors.red,
        inactiveTintColor: colors.lightGrey,
        labelStyle: {
          marginBottom: 5,
          marginTop: -10,
          fontWeight: '600',
          textTransform: 'uppercase',
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const isAndroid = utils.isAndroid();
          let iconName;

          if (route.name === 'Explorer') {
            iconName = isAndroid + 'search';
            size = 22;
          } else if (route.name === 'Saved') {
            iconName = isAndroid + 'heart';
            size = 20;
          } else if (route.name === 'Map') {
            iconName = isAndroid + 'map';
            size = 20;
          } else {
            iconName = isAndroid + 'person';
            size = 20;
          }
          color = focused ? colors.red : colors.lightGrey;

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <TabsNavigator.Screen
        name="Explorer"
        component={Explorer}
      ></TabsNavigator.Screen>
      <TabsNavigator.Screen
        name="Saved"
        component={Saved}
      ></TabsNavigator.Screen>
      <TabsNavigator.Screen
        name="Map"
        component={MapScreen}
      ></TabsNavigator.Screen>
      <TabsNavigator.Screen
        name="Profile"
        component={Profile}
      ></TabsNavigator.Screen>
    </TabsNavigator.Navigator>
  );
};

export default () => (
  <MainNavigator.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackground: () => null,
      headerTitle: () => null,
    }}
    mode="modal"
    headerMode="float"
  >
    <MainNavigator.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <MainNavigator.Screen
      name="RoomDetail"
      component={Room}
      options={{
        header: () => null,
      }}
    />
    <MainNavigator.Screen
      name="Search"
      component={Search}
      options={{
        header: () => null,
      }}
    />
    <MainNavigator.Screen
      name="Info"
      component={Info}
      options={{
        header: ({ scene }) => <ProfileHeader scene={scene} />,
        headerStyle: {
          height: 70,
        },
        ...TransitionPresets.DefaultTransition,
      }}
    />
  </MainNavigator.Navigator>
);
