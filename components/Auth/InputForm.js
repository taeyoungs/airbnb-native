import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import colors from '../../colors';

const Container = styled.View``;

const InputForm = ({
  value,
  setValue,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  autoCapitalize = 'none',
}) => {
  return (
    <Container>
      <TextInput
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        style={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 15,
          paddingHorizontal: 15,
          paddingVertical: 18,
          marginBottom: 20,
          ...colors.shadow,
        }}
      />
    </Container>
  );
};

InputForm.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
};

export default InputForm;
