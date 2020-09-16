import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import colors from '../../colors';
import { toggleFav } from '../../redux/usersSlice';
import BackBtn from '../Auth/BackBtn';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const TouchContainer = styled.TouchableOpacity``;

const BgContainer = styled.View`
  width: 35px;
  height: 35px;
  background-color: rgb(242, 242, 242);
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-right: 20px;
  margin-top: 20px;
`;

export default ({
  AnimateHeaderBackgroundColor,
  AnimateHeaderBorderColor,
  navigation,
  isFav,
  roomId,
}) => {
  const [fav, setFav] = useState(isFav);
  const dispatch = useDispatch();
  return (
    <Animated.View
      style={{
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: 70,
        zIndex: 12,
        borderBottomWidth: 1,
        backgroundColor: AnimateHeaderBackgroundColor,
        borderBottomColor: AnimateHeaderBorderColor,
      }}
    >
      <Container>
        <TouchContainer onPress={() => navigation.goBack()}>
          <BackBtn bg={true} />
        </TouchContainer>
        <TouchContainer
          onPress={() => {
            setFav((prevState) => !prevState);
            dispatch(toggleFav(roomId));
          }}
        >
          <BgContainer>
            {fav ? (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                size={20}
                color={colors.red}
                style={{ marginTop: 5 }}
              />
            ) : (
              <Ionicons
                name={
                  Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'
                }
                size={20}
                color="black"
                style={{ marginTop: 5 }}
              />
            )}
          </BgContainer>
        </TouchContainer>
      </Container>
    </Animated.View>
  );
};
