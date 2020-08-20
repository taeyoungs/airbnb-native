import React, { useState } from 'react';
import { Image } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Gate from './components/Gate';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Gate />
      </PersistGate>
    </Provider>
  ) : (
    <AppLoading
      onError={console.error}
      onFinish={handleFinish}
      startAsync={loadAsync}
    />
  );
}
