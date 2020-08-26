import React from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import { BlurView } from 'expo-blur';
import { Btn } from '../../components/Auth/Btn';

const Container = styled.View`
  flex: 1;
`;

const BgView = styled.Image`
  position: absolute;
  z-index: -1;
  top: 0;
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
  z-index: 1;
  margin-bottom: 50px;
  margin-top: 100px;
`;

export default ({ navigation }) => {
  const goToSignUp = () => navigation.navigate('SignUp');
  const goToSignIn = () => navigation.navigate('SignIn');

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <BgView source={require('../../assets/loadingBg.jpeg')} />
      <BlurView
        tint="light"
        intensity={45}
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Logo source={require('../../assets/airbnb-logo.png')} />
        <Btn title="Sign Up" accent={true} onPress={goToSignUp} />
        <Btn title="Sign In" onPress={goToSignIn} />
      </BlurView>
    </Container>
  );
};
