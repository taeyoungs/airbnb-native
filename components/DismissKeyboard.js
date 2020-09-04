import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};
