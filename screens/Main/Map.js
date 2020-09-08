import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import BlurDefaultImage from '../../components/Main/BlurDefaultImage';
import { Ionicons } from '@expo/vector-icons';
import utils from '../../utils';
import api from '../../api';

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

const Map = ({ token }) => {
  const mapRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isDrag, setIsDrag] = useState(false);
  const handleScroll = (e) => {
    const { x, y } = e.nativeEvent.contentOffset;
    setCurrentIndex(Math.abs(Math.round(x / width)));
  };
  const handleIsDrag = () => {
    setIsDrag(true);
  };
  const searchAPI = useCallback(async (form) => {
    const {
      data: { results },
    } = await api.search(form, token);
    // console.log(results);
    setRooms(results);
  });

  const handleSearchAgain = async () => {
    try {
      setIsLoading(true);
      const { northEast, southWest } = await mapRef.current?.getMapBoundaries();
      const { latitude: north, longitude: east } = northEast;
      const { latitude: south, longitude: west } = southWest;
      // console.log(north, east, south, west);
      const form = {
        north,
        east,
        south,
        west,
      };
      searchAPI(form);
    } catch (error) {
      console.ware(error);
    } finally {
      setIsLoading(false);
      setIsDrag(false);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const form = {
      north: 33.52680064998459,
      east: 126.53596322983503,
      south: 33.482570936079675,
      west: 126.50377672165632,
    };
    searchAPI(form);
  }, []);
  useEffect(() => {
    if (rooms.length !== 0) {
      mapRef.current?.animateCamera(
        {
          center: {
            latitude: parseFloat(rooms[currentIndex].lat),
            longitude: parseFloat(rooms[currentIndex].lng),
          },
          zoom: 14,
          pitch: 0,
          heading: 0,
          altitude: 0,
        },
        { duration: 500 },
      );
    }
  }, [currentIndex]);
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
              <SearchLoading source={require('../../assets/loadingIcon.gif')} />
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
      <RoomCard
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={25}
      >
        {rooms.map((room) => (
          <RoomContainer key={room.id}>
            <Room>
              {room.photos[0]?.file ? (
                <RoomImage source={{ uri: room.photos[0].file }} />
              ) : (
                <View style={{ width: 100, height: '100%' }}>
                  <BlurDefaultImage
                    source={require('../../assets/prepare.png')}
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

function mapStateToProps(state) {
  return {
    rooms: state.roomsReducer.explore.rooms,
    token: state.usersReducer.token,
  };
}

export default connect(mapStateToProps)(Map);
