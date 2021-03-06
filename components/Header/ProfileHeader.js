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
  height: 75px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  padding-top: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.offsetY > 0 ? 'rgba(0,0,0,0.1)' : 'transparent'};
`;

const BackButton = styled.TouchableOpacity`
  padding: 10px;
`;

const SaveButton = styled.TouchableOpacity``;

const SaveText = styled.Text`
  text-decoration: underline;
`;

export default ({ scene, isChanged, firstName, lastName, offsetY }) => {
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

  const createTwoButtonAlert = (title, msg) =>
    Alert.alert(
      title,
      msg,
      [
        {
          text: '저장',
          onPress: () => {
            const form = {
              first_name: firstName,
              last_name: lastName,
            };
            navigation.goBack();
            dispatch(updateInfo(form));
          },
        },
        {
          text: '삭제',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  return (
    <Animated.View style={{ opacity }}>
      <Container offsetY={offsetY}>
        <BackButton
          onPress={() =>
            isChanged
              ? createTwoButtonAlert(
                  '저장하지 않은 변경사항',
                  '프로필의 변경사항을 저장하시겠어요?',
                )
              : navigation.goBack()
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
