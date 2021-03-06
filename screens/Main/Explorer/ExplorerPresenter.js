import React from 'react';
import styled from 'styled-components/native';
import {
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoomCard from '../../../components/Main/RoomCard';
import colors from '../../../colors';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 15px;
`;

const FakeBar = styled.View`
  margin-top: 40px;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  padding-left: 10px;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
`;

const FakeText = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

const LoadMore = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${colors.teal};
  height: 35px;
  margin-bottom: 5px;
  margin-top: 10px;
`;

export default ({ rooms, increasePage, refreshing, onRefresh, page }) => {
  const navigation = useNavigation();
  return (
    <Container>
      {rooms.length === 0 ? (
        <ActivityIndicator color="black" />
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <FakeBar style={{ ...colors.shadow }}>
              <FakeText>Search ...</FakeText>
            </FakeBar>
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
                roomObj={room}
              />
            ))}
            <TouchableOpacity onPress={increasePage}>
              <LoadMore>
                {page * 10 === rooms.length ? (
                  <Text
                    style={{ color: 'white', fontWeight: '600', fontSize: 15 }}
                  >
                    Load More
                  </Text>
                ) : (
                  <ActivityIndicator color="white" />
                )}
              </LoadMore>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </Container>
  );
};
