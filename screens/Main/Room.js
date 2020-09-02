import React, { useState } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { Dimensions } from 'react-native';
import colors from '../../colors';
import utils from '../../utils';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';

const screenHeight = Dimensions.get('screen').height;

const Container = styled.ScrollView``;

const ImageContainer = styled.View`
  width: 100%;
  height: ${screenHeight / 2.5}px;
  margin-bottom: 10px;
  z-index: 10;
`;

const ImageItem = styled.Image`
  width: 100%;
  height: 100%;
`;

const PropsContainer = styled.View`
  padding: 10px 25px;
`;

const InfoContainer = styled.View`
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom-width: 1px;
  border-color: ${colors.lightGrey};
`;

const RoomName = styled.Text`
  font-size: 25px;
  margin-bottom: 10px;
`;

const FakeValue = styled.Text`
  margin-left: 6px;
  font-weight: 300;
  font-size: 12px;
`;

const SHContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const SHText = styled.Text`
  text-transform: uppercase;
  font-weight: 300;
  font-size: 11px;
  margin-left: 6px;
`;

const Address = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Host = styled.Text`
  font-size: 25px;
`;

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const InfoList = styled.Text``;

const CheckContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckTitle = styled.Text`
  margin-left: 10px;
  font-size: 17px;
`;

const CheckText = styled.Text`
  margin-left: 30px;
  font-weight: 300;
`;

const MapContainer = styled.View`
  width: 100%;
  height: 250px;
  border-radius: 30px;
`;

const MapTitle = styled.Text`
  font-size: 23px;
  font-weight: 400;
  margin-bottom: 25px;
`;

const MapNotice = styled.Text`
  margin: 10px 0px;
  color: ${colors.lightGrey};
  font-size: 14px;
`;

function formatValue(number, name) {
  if (number === 1) {
    return `${number} ${name}`;
  } else {
    return `${number} ${name}s`;
  }
}

export default ({
  route: {
    params: { room },
  },
}) => {
  const [offsetY, setOffsetY] = useState();
  const handleScroll = (e) => {
    setOffsetY(e.nativeEvent.contentOffset.y);
  };
  return (
    <>
      <StatusBar style={`${offsetY > 262 ? 'dark' : 'light'}`} />
      <Container scrollEventThrottle={16} onScroll={handleScroll}>
        <ImageContainer>
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
            {room.photos.map((photo) => (
              <ImageItem key={photo.id} source={{ uri: photo.file }} />
            ))}
          </Swiper>
        </ImageContainer>
        <PropsContainer>
          <InfoContainer>
            <RoomName>{room.name}</RoomName>
            <SHContainer>
              <Ionicons
                name={`${utils.isAndroid()}star`}
                size={15}
                color={colors.red}
              />
              <FakeValue>
                4.56 (26) {room.user.superhost ? '• ' : null}
              </FakeValue>
              {room.user.superhost ? (
                <>
                  <Ionicons
                    name={`${utils.isAndroid()}medal`}
                    size={15}
                    color={colors.red}
                  />
                  <SHText>superhost</SHText>
                </>
              ) : null}
            </SHContainer>
            <Address>{room.address}</Address>
          </InfoContainer>
          <InfoContainer>
            <ProfileContainer>
              <Host>Host: {room.user.username}</Host>
              <ProfileImage source={require('../../assets/character.png')} />
            </ProfileContainer>
            <InfoList>
              {formatValue(room.beds, 'bed')} •{' '}
              {formatValue(room.bedrooms, 'bedroom')} •{' '}
              {formatValue(room.bathrooms, 'bathroom')}
            </InfoList>
          </InfoContainer>
          <InfoContainer>
            <CheckContainer>
              <Ionicons
                name={`${utils.isAndroid()}timer`}
                size={25}
                color="black"
              />
              <CheckTitle>Check-in/out</CheckTitle>
            </CheckContainer>
            <CheckText>
              {room.check_in.slice(0, 5)} → {room.check_out.slice(0, 5)}
            </CheckText>
          </InfoContainer>
          <InfoContainer>
            <MapTitle>Location</MapTitle>
            <MapContainer>
              <MapView
                style={{ width: '100%', height: '100%', borderRadius: 15 }}
                camera={{
                  center: {
                    latitude: parseFloat(room.lat),
                    longitude: parseFloat(room.lng),
                  },
                  pitch: 0,
                  heading: 0,
                  altitude: 0,
                  zoom: 14,
                }}
                provider="google"
                zoomEnabled={false}
                scrollEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(room.lat),
                    longitude: parseFloat(room.lng),
                  }}
                ></Marker>
              </MapView>
            </MapContainer>
            <MapNotice>
              The exact location will be displayed after booking is complete.
            </MapNotice>
          </InfoContainer>
        </PropsContainer>
      </Container>
    </>
  );
};
