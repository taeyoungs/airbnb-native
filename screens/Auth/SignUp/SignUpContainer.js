import React, { useState } from 'react';
import api from '../../../api';
import utils from '../../../utils';
import SignUpPresenter from './SignUpPresenter';

export default ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFistName] = useState('');
  const [lastName, setLastName] = useState('');
  const isFormValid = () => {
    if (
      email === '' ||
      password === '' ||
      firstName === '' ||
      lastName === ''
    ) {
      alert('All fields are required');
      return false;
    }

    if (!utils.isEmail(email)) {
      alert('Email format is wrong');
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      const { status } = await api.createAccount({
        first_name: firstName,
        last_name: lastName,
        email,
        username: email,
        password,
      });
      // const data = await getRooms();
      //   console.log(status);
      if (status === 201) {
        alert('Account created. Sign in, please.');
        navigation.navigate('SignIn', { email, password });
      }
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <SignUpPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      firstName={firstName}
      setFistName={setFistName}
      lastName={lastName}
      setLastName={setLastName}
      handleSubmit={handleSubmit}
    />
  );
};
