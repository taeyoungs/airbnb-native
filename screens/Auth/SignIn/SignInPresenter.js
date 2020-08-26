import React from 'react';
import { Text, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import FormBtn from '../../../components/Auth/FormBtn';
import InputForm from '../../../components/Auth/InputForm';
import Social from '../../../components/Auth/Social';
import colors from '../../../colors';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Logo = styled.Image`
  width: 150px;
  height: 40px;
  margin-bottom: 70px;
  margin-top: 100px;
`;

const InputContainer = styled.View`
  width: ${windowWidth / 1.3};
  margin-bottom: 30px;
`;

export default ({
  email,
  setEmail,
  password,
  setPassword,
  goToSignUp,
  handleSubmit,
}) => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Logo source={require('../../../assets/airbnb-logo-txt.png')} />
      <InputContainer>
        <InputForm
          placeholder="Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />
        <InputForm
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <FormBtn accent={true} title="Sign In" onPress={handleSubmit} />
        <Text
          style={{ color: 'grey', textAlign: 'center', marginVertical: 40 }}
        >
          - Or sign in with -
        </Text>
        <Social />
        <Text style={{ color: 'grey', textAlign: 'center', marginTop: 35 }}>
          Don't have an account?
          <Text
            style={{ color: colors.teal, fontWeight: '600' }}
            onPress={goToSignUp}
          >
            {' '}
            Sign Up
          </Text>
        </Text>
      </InputContainer>
    </Container>
  );
};
