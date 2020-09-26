import React from 'react';
import styled from 'styled-components/native';
import {
  Text,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { FormBtn } from '../../../components/Auth/FormBtn';
import InputForm from '../../../components/Auth/InputForm';
import Social from '../../../components/Auth/Social';
import DismissKeyboard from '../../../components/DismissKeyboard';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Logo = styled.Image`
  width: 150px;
  height: 40px;
  margin-bottom: 30px;
  margin-top: 100px;
`;

const InputContainer = styled.View`
  width: ${windowWidth / 1.3}px;
`;

export default ({
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFistName,
  lastName,
  setLastName,
  handleSubmit,
}) => {
  return (
    <DismissKeyboard>
      <Container>
        <StatusBar barStyle="dark-content" />
        <Logo source={require('../../../assets/airbnb-logo-txt.png')} />
        <KeyboardAvoidingView behavior="position">
          <InputContainer>
            <InputForm
              placeholder="First Name"
              value={firstName}
              setValue={setFistName}
              autoCapitalize="words"
            />
            <InputForm
              placeholder="Last Name"
              value={lastName}
              setValue={setLastName}
              autoCapitalize="words"
            />
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
            <FormBtn accent={true} title="Sign Up" onPress={handleSubmit} />
          </InputContainer>
        </KeyboardAvoidingView>
        <Text
          style={{ color: 'grey', textAlign: 'center', marginVertical: 25 }}
        >
          - Or sign up with -
        </Text>
        <Social />
      </Container>
    </DismissKeyboard>
  );
};
