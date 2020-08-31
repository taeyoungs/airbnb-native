import React from 'react';
import styled from 'styled-components/native';
import RoomCard from '../../../components/Main/RoomCard';

const Container = styled.View`
  flex: 1;
  margin-top: 50px;
  margin-bottom: 10px;
  padding: 0 15px;
`;

const Title = styled.Text`
  font-size: 30px;
`;

const Notice = styled.Text``;

const ScrollV = styled.ScrollView``;

export default ({ rooms }) => {
  return (
    <Container>
      <Title>Favourites</Title>
      {rooms.length === 0 ? (
        <Notice>You don't have any favs</Notice>
      ) : (
        <ScrollV showsVerticalScrollIndicator={false}>
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              isFav={true}
              isSuperhost={room.user.superhost}
              photos={room.photos}
              name={room.name}
              price={room.price}
            />
          ))}
        </ScrollV>
      )}
    </Container>
  );
};
