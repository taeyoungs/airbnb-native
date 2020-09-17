import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../colors';
import utils from '../../utils';

const Container = styled.TouchableOpacity``;

const Label = styled.Text`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`;

const TextInputContainer = styled.View`
  padding-bottom: 25px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  flex-direction: row;
  justify-content: space-between;
`;

const Text = styled.TextInput`
  font-size: 20px;
  padding: 2px 0px;
  width: 90%;
`;

const DeleteBtn = styled.TouchableOpacity`
  padding: 5px;
`;

export default ({
  label,
  value,
  setValue,
  placeholder,
  setIsGenVisible,
  setIsBirVisible,
}) => {
  const inputRef = useRef();
  const [isOn, setIsOn] = useState(false);
  return (
    <Container onPress={() => inputRef.current.focus()}>
      <Label>{label}</Label>
      <TextInputContainer>
        <Text
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => setValue(text)}
          onFocus={() => {
            setIsOn(true);
            setIsGenVisible(false);
            setIsBirVisible(false);
          }}
          onBlur={() => setIsOn(false)}
        />
        {!isOn ? null : value === '' ? null : (
          <DeleteBtn onPress={() => setValue('')}>
            <Ionicons
              name={`${utils.isAndroid()}close-circle`}
              size={16}
              color={colors.lightGrey}
            />
          </DeleteBtn>
        )}
      </TextInputContainer>
    </Container>
  );
};
