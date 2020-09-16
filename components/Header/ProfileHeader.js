import React from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: white;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  padding-top: 30px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 10px;
`;

const SaveButton = styled.TouchableOpacity``;

const SaveText = styled.Text`
  text-decoration: underline;
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
        <SaveButton>
          <SaveText>Save</SaveText>
        </SaveButton>
      </Container>
    </Animated.View>
  );
};
