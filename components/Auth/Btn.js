import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
import colors from '../../colors';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
  background-color: ${(props) => (props.accent ? colors.red : 'transparent')};
  width: ${windowWidth / 1.5}px;
  border-radius: 30px;
  padding: 15px 0px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => (props.accent ? colors.red : colors.black)};
`;

const Txt = styled.Text`
  color: ${(props) => (props.accent ? 'white' : colors.black)};
  text-align: center;
`;

export const Btn = ({ accent = false, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container accent={accent}>
        <Txt accent={accent}>{title}</Txt>
      </Container>
    </TouchableOpacity>
  );
};

Btn.propTypes = {
  accent: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
};
