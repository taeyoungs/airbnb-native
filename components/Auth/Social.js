import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  margin-bottom: 50px;
`;

const TouchContainer = styled.View`
  background-color: 'rgba(255, 255, 255, 0.8)';
  border-radius: 15px;
  height: 100%;
  width: 100%;
`;

const Social = () => {
  return (
    <Container>
      <TouchableOpacity
        style={{
          ...colors.shadow,
          width: '45%',
          marginHorizontal: 5,
          height: 50,
        }}
      >
        <TouchContainer>
          <Text>Google</Text>
        </TouchContainer>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...colors.shadow, width: '45%', height: 50 }}>
        <TouchContainer>
          <Text>Kakao</Text>
        </TouchContainer>
      </TouchableOpacity>
    </Container>
  );
};

export default Social;
