import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BlurDefaultImage from '../../../components/Main/BlurDefaultImage';
import { Ionicons } from '@expo/vector-icons';
import utils from '../../../utils';

const { width, height } = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const RoomContainer = styled.View`
  background-color: transparent;
  width: ${width}px;
  align-items: center;
`;

const RoomCard = styled.ScrollView`
  position: absolute;
  bottom: 0;
  margin-bottom: 25px;
`;

const Room = styled.View`
  width: ${width - 60}px;
  background-color: white;
  height: 110px;
  border-radius: 10px;
  flex-direction: row;
`;

const RoomImage = styled.Image`
  width: 100px;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const RoomInfo = styled.View`
  margin-left: 10px;
  justify-content: center;
  width: 60%;
`;

const RoomAddress = styled.Text`
  font-weight: 300;
  margin-bottom: 3px;
  font-size: 13px;
`;

const RoomName = styled.Text`
  margin-bottom: 5px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
`;

const RoomPrice = styled.Text`
  font-weight: 700;
`;

const Night = styled.Text``;

const MarkerContainer = styled.View`
  background-color: ${(props) => (props.selected ? 'black' : 'white')};
  width: 50px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const MarkerText = styled.Text`
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => (props.selected ? 'white' : 'black')};
`;

const SearchContainer = styled.View`
  background-color: transparent;
  align-items: center;
`;

const SearchAgainView = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  width: ${width / 2.3}px;
  background-color: white;
  height: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 20px;
`;

const SearchText = styled.Text``;

const SearchLoading = styled.Image`
  width: 40px;
  height: 40px;
`;

const NoSearchView = styled.View`
  position: absolute;
  bottom: 0;
  width: ${width - 60}px;
  background-color: white;
  height: 70px;
  border-radius: 10px;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const NoSearchText = styled.Text`
  width: 80%;
  margin-right: 10px;
`;

export default ({
  mapRef,
  handleIsDrag,
  rooms,
  currentIndex,
  isDrag,
  handleSearchAgain,
  isLoading,
  handleScroll,
  svRef,
}) => {
  return (
    <Container>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        onPanDrag={handleIsDrag}
        provider="google"
        camera={{
          center: {
            latitude: 33.503973,
            longitude: 126.51987,
          },
          zoom: 14,
          pitch: 0,
          heading: 0,
          altitude: 0,
        }}
      >
        {rooms.map((room, index) => (
          <Marker
            key={room.id}
            coordinate={{
              latitude: parseFloat(room.lat),
              longitude: parseFloat(room.lng),
            }}
          >
            <MarkerContainer selected={index === currentIndex}>
              <MarkerText selected={index === currentIndex}>
                ${room.price}
              </MarkerText>
            </MarkerContainer>
          </Marker>
        ))}
      </MapView>
      {isDrag ? (
        <SearchContainer>
          <SearchAgainView onPress={handleSearchAgain}>
            {isLoading ? (
              <SearchLoading
                source={require('../../../assets/loadingIcon.gif')}
              />
            ) : (
              <>
                <Ionicons
                  name={`${utils.isAndroid()}refresh`}
                  size={24}
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <SearchText>Search this area</SearchText>
              </>
            )}
          </SearchAgainView>
        </SearchContainer>
      ) : null}
      {rooms.length === 0 ? (
        <NoSearchView>
          <NoSearchText>
            There are no search results within this area. Try expanding your
            search.
          </NoSearchText>
          <Ionicons
            name={`${utils.isAndroid()}eye-off`}
            size={24}
            color="black"
          />
        </NoSearchView>
      ) : null}
      <RoomCard
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={25}
        ref={svRef}
      >
        {rooms.map((room) => (
          <RoomContainer key={room.id}>
            <Room>
              {room.photos[0]?.file ? (
                <RoomImage source={{ uri: room.photos[0].file }} />
              ) : (
                <View style={{ width: 100, height: '100%' }}>
                  <BlurDefaultImage
                    source={require('../../../assets/prepare.png')}
                    style={{ width: 35, height: 35, zIndex: -1 }}
                  />
                </View>
              )}

              <RoomInfo>
                <RoomAddress numberOfLines={1}>{room.address}</RoomAddress>
                <RoomName numberOfLines={1}>{room.name}</RoomName>
                <PriceContainer>
                  <RoomPrice>${room.price} </RoomPrice>
                  <Night>/ night</Night>
                </PriceContainer>
              </RoomInfo>
            </Room>
          </RoomContainer>
        ))}
      </RoomCard>
    </Container>
  );
};
