import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from '../redux/usersSlice';

export default () => {
  const { isLoggedIn, token } = useSelector((state) => state.usersSlice);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => dispatch(logOut())}>
          <Text>Log Out | {token}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => dispatch(logIn({ payload: 'bs.token' }))}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
