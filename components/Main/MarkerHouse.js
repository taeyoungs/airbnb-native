import React from 'react';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import utils from '../../utils';

const MarkerContainer = styled.View`
  width: 100px;
  height: 100px;
  background-color: transparent;
`;

const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <MarkerContainer>
      <BlurView
        intensity={30}
        tint="dark"
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
        }}
      >
        <IconContainer>
          <Ionicons name={`${utils.isAndroid()}home`} size={24} color="white" />
        </IconContainer>
      </BlurView>
    </MarkerContainer>
  );
};
