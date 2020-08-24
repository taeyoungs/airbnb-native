import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { Btn } from '../components/Auth/Btn';
import { StatusBar } from 'react-native';

const Container = styled.View``;

export default () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
    </Container>
  );
};
