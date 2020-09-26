import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import DefaultHeader from '../../components/Header/DefaultHeader';

const Container = styled.View`
  background-color: white;
  height: 100%;
  padding: 0px 20px;
  margin-top: 70px;
`;

const Title = styled.Text`
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
`;

export default ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      header: ({ scene }) => <DefaultHeader scene={scene} />,
    });
  }, []);
  return (
    <Container>
      <Title>Notification</Title>
    </Container>
  );
};
