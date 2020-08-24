import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from '../redux/usersSlice';
import Auth from '../navigation/Auth';
import { NavigationContainer } from '@react-navigation/native';

export default () => {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => dispatch(logOut())}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};
