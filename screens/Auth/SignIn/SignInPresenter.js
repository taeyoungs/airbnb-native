import React from 'react';
import { Text, Dimensions, StatusBar, View, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import FormBtn from '../../../components/Auth/FormBtn';
import InputForm from '../../../components/Auth/InputForm';
import Social from '../../../components/Auth/Social';
import colors from '../../../colors';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Logo = styled.Image`
  width: 150px;
  height: 40px;
  margin-top: 130px;
`;

const InputContainer = styled.View`
  width: ${windowWidth / 1.3}px;
  margin-bottom: 30px;
`;

const SignInPresenter = ({
  email,
  setEmail,
  password,
  setPassword,
  goToSignUp,
  handleSubmit,
}) => {
  return (
    <Container>
      <TouchableWithoutFeedback
        style={{ alignItems: 'center', flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <StatusBar barStyle="dark-content" />
        <Logo source={require('../../../assets/airbnb-logo-txt.png')} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
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
            <View
              style={{
                justifyContent: 'center',
                marginTop: 35,
                flexDirection: 'row',
              }}
            >
              <Text style={{ color: 'grey' }}>Don't have an account?</Text>
              <TouchableOpacity onPress={goToSignUp}>
                <Text style={{ color: colors.teal, fontWeight: '600' }}>
                  {' '}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </InputContainer>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SignInPresenter;
