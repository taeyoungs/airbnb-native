import React, { useState } from 'react';
import utils from '../../../utils';
import SignInPresenter from './SignInPresenter';

export default ({ navigation, route: { params }, userLogin }) => {
  const [email, setEmail] = useState(params?.email || 'xoxodudwkd@naver.com');
  const [password, setPassword] = useState(params?.password || '12345');
  const goToSignUp = () => navigation.navigate('SignUp');
  const isFormValid = () => {
    if (email === '' || password === '') {
      alert('All fields are required');
      return false;
    }

    if (!utils.isEmail(email)) {
      alert('Email format is wrong');
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }
    userLogin({ username: email, password });
  };
  return (
    <SignInPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      goToSignUp={goToSignUp}
      handleSubmit={handleSubmit}
    />
  );
};
