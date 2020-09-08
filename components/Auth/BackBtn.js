import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Container = styled.View`
  margin-left: 20px;
`;

const BgContainer = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-right: 20px;
  margin-top: 5px;
`;

export default ({ bg = false }) => {
  return (
    <Container>
      {!bg ? (
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-dropdown'}
          size={24}
          color="black"
        />
      ) : (
        <BgContainer>
          <Ionicons
            name={
              Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-dropdown'
            }
            size={24}
            color="black"
            style={{ marginTop: 5 }}
          />
        </BgContainer>
      )}
    </Container>
  );
};
