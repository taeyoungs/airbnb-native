import React from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  height: 75px;
  justify-content: center;
  padding: 0px 15px;
  padding-top: 30px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 10px;
`;

export default ({ scene }) => {
  const navigation = useNavigation();
  const progress = Animated.add(
    scene.progress.current,
    scene.progress.next || 0,
  );

  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View style={{ opacity }}>
      <Container>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </BackButton>
      </Container>
    </Animated.View>
  );
};
