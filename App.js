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
  const loadAsync = () => {
    const images = [
      require('./assets/loadingBg.jpeg'),
      require('./assets/airbnb-logo.png'),
      'https://banner2.cleanpng.com/20180406/taw/kisspng-airbnb-accommodation-business-vacation-rental-logo-vactor-5ac74f0cc3cce5.809691751523011340802.jpg',
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
