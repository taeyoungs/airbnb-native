import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions } from 'react-native';
import colors from '../../colors';

const Container = styled.View`
  background-color: ${(props) => (props.accent ? colors.red : 'transparent')};
  width: 100%;
  border-radius: 15px;
  padding: 15px 0px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => (props.accent ? colors.red : colors.black)};
`;

const Txt = styled.Text`
  color: ${(props) => (props.accent ? 'white' : colors.black)};
  text-align: center;
  font-size: 16px;
`;

export const FormBtn = ({ accent = false, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container accent={accent} style={{ ...colors.shadow }}>
        <Txt accent={accent}>{title}</Txt>
      </Container>
    </TouchableOpacity>
  );
};

FormBtn.propTypes = {
  accent: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
};
