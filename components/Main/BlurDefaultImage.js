import React from 'react';
import { Image } from 'react-native';
import { BlurView } from 'expo-blur';

export default ({ source, style }) => {
  return (
    <BlurView
      intensity={20}
      tint="light"
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={source} style={style} />
    </BlurView>
  );
};
