import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Dimensions } from 'react-native';
import { FormBtn } from '../components/Auth/FormBtn';
import { StatusBar } from 'react-native';
import InputForm from '../components/Auth/InputForm';
import Social from '../components/Auth/Social';
import colors from '../colors';
import { isEmail } from '../utils';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/usersSlice';

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

export default ({ navigation, route: { params } }) => {
  const [email, setEmail] = useState(params?.email);
  const [password, setPassword] = useState(params?.password);
  const dispatch = useDispatch();
  const goToSignUp = () => navigation.navigate('SignUp');
  const isFormValid = () => {
    if (email === '' || password === '') {
      alert('All fields are required');
      return false;
    }

    if (!isEmail(email)) {
      alert('Email format is wrong');
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }
    dispatch(
      userLogin({
        username: email,
        password,
      }),
    );
  };
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Logo source={require('../assets/airbnb-logo-txt.png')} />
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
        <Text
          style={{ color: 'grey', textAlign: 'center', marginVertical: 25 }}
        >
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
