import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Container = styled.View`
  margin-left: 20px;
`;

export default () => {
  return (
    <Container>
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-dropdown'}
        size={24}
        color="black"
      />
    </Container>
  );
};
