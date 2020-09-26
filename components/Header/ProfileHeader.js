import React from 'react';
import styled from 'styled-components/native';
import { Alert, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { updateInfo } from '../../redux/usersSlice';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  padding-top: 30px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 10px;
`;

const SaveButton = styled.TouchableOpacity``;

const SaveText = styled.Text`
  text-decoration: underline;
`;

export default ({ scene, isChanged, firstName, lastName }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const progress = Animated.add(
    scene.progress.current,
    scene.progress.next || 0,
  );

  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const form = {
              first_name: firstName,
              last_name: lastName,
            };
            navigation.goBack();
            dispatch(updateInfo(form));
          },
        },
      ],
      { cancelable: false },
    );
  return (
    <Animated.View style={{ opacity }}>
      <Container>
        <BackButton
          onPress={() =>
            isChanged ? createTwoButtonAlert() : navigation.goBack()
          }
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </BackButton>
        <SaveButton
          onPress={() => {
            const form = {
              first_name: firstName,
              last_name: lastName,
            };
            navigation.goBack();
            dispatch(updateInfo(form));
          }}
        >
          <SaveText>Save</SaveText>
        </SaveButton>
      </Container>
    </Animated.View>
  );
};
