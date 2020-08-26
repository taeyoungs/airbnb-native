import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Explorer from '../screens/Main/Explorer';
import Saved from '../screens/Main/Saved';
import MapScreen from '../screens/Main/Map';
import Profile from '../screens/Main/Profile';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';
import utils from '../utils';

const Main = createBottomTabNavigator();

export default () => {
  return (
    <Main.Navigator
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
      <Main.Screen name="Explorer" component={Explorer}></Main.Screen>
      <Main.Screen name="Saved" component={Saved}></Main.Screen>
      <Main.Screen name="Map" component={MapScreen}></Main.Screen>
      <Main.Screen name="Profile" component={Profile}></Main.Screen>
    </Main.Navigator>
  );
};
