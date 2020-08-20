import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

// args : image array
const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      // URL
      return Image.prefetch(image);
    } else {
      // File
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) =>
  fonts.map((font) => {
    return Font.loadAsync(font);
  });

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAsync = async () => {
    const images = [
      require('./assets/loadingBg.jpeg'),
      'https://www.clipartmax.com/png/middle/114-1149625_executive-airbnb-cleaning-airbnb-logo-png.png',
    ];
    const fonts = [Ionicons.font];
    promiseImages = cacheImages(images);
    promiseFonts = cacheFonts(fonts);
    return Promise.all(...promiseImages, ...promiseFonts);
  };
  return isReady ? (
    <View>
      <Text>I'm Ready</Text>
    </View>
  ) : (
    <AppLoading
      onError={console.error}
      onFinish={handleFinish}
      startAsync={loadAsync}
    />
  );
}
