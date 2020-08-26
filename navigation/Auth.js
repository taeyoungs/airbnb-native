import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Auth/Welcome';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import BackBtn from '../components/Auth/BackBtn';

const Auth = createStackNavigator();

const os = Platform.OS;

export default () => {
  return (
    <Auth.Navigator
      mode="modal"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerBackImage: () => <BackBtn />,
      }}
    >
      <Auth.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerTintColor: 'white' }}
      />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};
