import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dimensions } from 'react-native';
import api from '../../../api';
import MapPresenter from './MapPresenter';

const { width, height } = Dimensions.get('screen');

export default ({ token }) => {
  const mapRef = useRef();
  const svRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isDrag, setIsDrag] = useState(false);
  const [zoom, setZoom] = useState(14);
  const handleScroll = (e) => {
    const { x, y } = e.nativeEvent.contentOffset;
    setCurrentIndex(Math.abs(Math.round(x / width)));
  };
  const handleIsDrag = () => {
    setIsDrag(true);
    async function getZoom() {
      const options = await mapRef.current?.getCamera();
      setZoom(options.zoom);
    }
    getZoom();
  };
  const moveCamera = (rooms) => {
    if (rooms.length !== 0) {
      mapRef.current?.animateCamera(
        {
          center: {
            latitude: parseFloat(rooms[currentIndex].lat),
            longitude: parseFloat(rooms[currentIndex].lng),
          },
          zoom,
          pitch: 0,
          heading: 0,
          altitude: 0,
        },
        { duration: 500 },
      );
    }
  };
  const searchAPI = useCallback(async (form) => {
    const {
      data: { results },
    } = await api.search(form, token);
    setRooms(results);
    if (currentIndex === 0) {
      moveCamera(results);
    }
    setCurrentIndex(0);
    svRef.current.scrollTo({ x: 0, y: 0, animated: false });
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
    moveCamera(rooms);
  }, [currentIndex]);
  return (
    <MapPresenter
      mapRef={mapRef}
      handleIsDrag={handleIsDrag}
      rooms={rooms}
      currentIndex={currentIndex}
      isDrag={isDrag}
      handleSearchAgain={handleSearchAgain}
      isLoading={isLoading}
      handleScroll={handleScroll}
      svRef={svRef}
    />
  );
};
