import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-web-swiper';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../colors';
import utils from '../../utils';
import { toggleFav } from '../../redux/usersSlice';
import { useNavigation } from '@react-navigation/native';
import BlurDefaultImage from './BlurDefaultImage';

const screenHeight = Dimensions.get('screen').height;

const Container = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: flex-start;
`;

const Superhost = styled.View`
  border: 1px solid black;
  border-radius: 5px;
  padding: 3px 5px;
  margin-bottom: 5px;
`;

const SuperhostText = styled.Text`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 600;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 5px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
`;

const PriceNumber = styled.Text`
  font-weight: 600;
`;

const PriceText = styled.Text``;

const ImageContainer = styled.View`
  width: 100%;
  height: ${screenHeight / 3}px;
  margin-bottom: 10px;
  z-index: 10;
`;

const ImageItem = styled.Image`
  width: 100%;
  height: 100%;
`;

const DefaultImageContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  border: 1px solid ${colors.lightGrey};
`;

const FavsContainer = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
`;

const FavsIcon = styled.View`
  width: 40px;
  height: 40px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 40px;
`;

const RoomCard = ({ id, isFav, isSuperhost, photos, name, price, roomObj }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Container>
      <ImageContainer>
        <FavsContainer onPress={() => dispatch(toggleFav(id))}>
          <FavsIcon>
            {isFav ? (
              <Ionicons
                name={`${utils.isAndroid()}heart`}
                size={24}
                color={colors.red}
                style={{ marginTop: 4 }}
              />
            ) : (
              <Ionicons
                name={`${utils.isAndroid()}heart-empty`}
                size={24}
                color="grey"
                style={{ marginTop: 4 }}
              />
            )}
          </FavsIcon>
        </FavsContainer>
        {photos.length === 0 ? (
          <DefaultImageContainer
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RoomDetail', { room: roomObj })}
          >
            <BlurDefaultImage
              source={require('../../assets/prepare.png')}
              style={{ width: 50, height: 50, zIndex: -1 }}
            />
          </DefaultImageContainer>
        ) : (
          <Swiper
            controlsProps={{
              PrevComponent: () => null,
              NextComponent: () => null,
              dotActiveStyle: { backgroundColor: 'white' },
              dotProps: {
                badgeStyle: {
                  backgroundColor: colors.lightGrey,
                  marginTop: 15,
                },
              },
            }}
          >
            {photos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('RoomDetail', { room: roomObj })
                }
              >
                <ImageItem source={{ uri: photo.file }} />
              </TouchableOpacity>
            ))}
          </Swiper>
        )}
      </ImageContainer>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('RoomDetail', { room: roomObj })}
        style={{ alignItems: 'flex-start' }}
      >
        {isSuperhost ? (
          <Superhost>
            <SuperhostText>superhost</SuperhostText>
          </Superhost>
        ) : null}
        <Name>{name}</Name>
        <PriceContainer>
          <PriceNumber>${price} </PriceNumber>
          <PriceText>/ night</PriceText>
        </PriceContainer>
      </TouchableOpacity>
    </Container>
  );
};

RoomCard.propTypes = {
  id: PropTypes.number.isRequired,
  isFav: PropTypes.bool.isRequired,
  isSuperhost: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.string,
    }),
  ),
  name: PropTypes.string,
  price: PropTypes.number,
};

export default RoomCard;
