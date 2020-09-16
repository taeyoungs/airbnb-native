import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Container = styled.View`
  margin-left: 20px;
`;

const BgContainer = styled.View`
  width: 35px;
  height: 35px;
  background-color: rgb(242, 242, 242);
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-top: 20px;
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
