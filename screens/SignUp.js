import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { FormBtn } from '../components/Auth/FormBtn';
import { StatusBar } from 'react-native';
import InputForm from '../components/Auth/InputForm';
import Social from '../components/Auth/Social';
import colors from '../colors';
import api, { createAccount, getRooms } from '../api';
import { isEmail } from '../utils';

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
  width: ${windowWidth / 1.3};
`;

export default ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFistName] = useState('');
  const [lastName, setLastName] = useState('');
  const validateForm = () => {
    if (
      email === '' ||
      password === '' ||
      firstName === '' ||
      lastName === ''
    ) {
      alert('All fields are required');
      return false;
    }

    if (!isEmail(email)) {
      alert('Email format is wrong');
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const { status } = await api.createAccount({
        first_name: firstName,
        last_name: lastName,
        email,
        username: email,
        password,
      });
      // const data = await getRooms();
      console.log(status);
      if (status === 201) {
        alert('Account created. Sign in, please.');
        navigation.navigate('SignIn', { email, password });
      }
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <StatusBar barStyle="dark-content" />
        <Logo source={require('../assets/airbnb-logo-txt.png')} />
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
    </TouchableWithoutFeedback>
  );
};
