import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, ActivityIndicator } from 'react-native';
import RoomCard from '../../../components/Main/RoomCard';

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export default ({ rooms }) => {
  return (
    <Container>
      {rooms.length === 0 ? (
        <ActivityIndicator color="black" />
      ) : (
        <ScrollView
          contentContainerStyle={{
            marginTop: 100,
            paddingHorizontal: 15,
          }}
        >
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              isFav={room.is_fav}
              isSuperhost={room.user.superhost}
              photos={room.photos}
              name={room.name}
              price={room.price}
            />
          ))}
        </ScrollView>
      )}
    </Container>
  );
};
