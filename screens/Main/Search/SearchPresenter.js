import React from 'react';
import styled from 'styled-components/native';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';
import colors from '../../../colors';
import { Ionicons } from '@expo/vector-icons';
import utils from '../../../utils';
import DismissKeyboard from '../../../components/DismissKeyboard';
import RoomCard from '../../../components/Main/RoomCard';
import BackBtn from '../../../components/Auth/BackBtn';

const HeaderContainer = styled.View`
  background-color: transparent;
  justify-content: center;
  height: 60px;
  padding-top: 20px;
`;

const Container = styled.View`
  flex: 1;
  padding: 0px 15px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${colors.red};
`;

const SearchBar = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  padding-left: 10px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  flex-direction: row;
`;

const SearchTextInput = styled.TextInput`
  font-size: 14px;
  font-weight: 300;
  width: 100%;
  height: 100%;
`;

const OptionResetContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

const Option = styled.Text`
  font-size: 25px;
  font-weight: 400;
  margin-right: 15px;
`;

const ResetContainer = styled.TouchableOpacity`
  background-color: ${colors.teal};
  width: 50px;
  height: 20px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const Reset = styled.Text`
  color: ${colors.teal};
  font-size: 11px;
  font-weight: 300;
  color: white;
`;

const OptionContainer = styled.ScrollView`
  flex-direction: row;
  height: 130px;
  margin-bottom: 20px;
`;

const OptionItem = styled.View`
  align-items: center;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  margin-right: 5px;
`;

const OptionLabel = styled.Text`
  text-transform: uppercase;
  font-size: 10px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const OptionTextInput = styled.TextInput`
  width: 80px;
  height: 35px;
  padding-left: 10px;
  background-color: white;
  border-radius: 20px;
`;

const LoadMore = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${colors.teal};
  height: 35px;
  margin-bottom: 5px;
  margin-top: 10px;
`;

export default ({
  isLoading,
  beds,
  setBeds,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  maxPrice,
  setMaxPrice,
  handleSubmit,
  handleReset,
  result,
  term,
  setTerm,
  navigation,
}) => {
  return (
    <DismissKeyboard>
      <>
        <HeaderContainer>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackBtn />
          </TouchableOpacity>
        </HeaderContainer>
        <Container>
          <Title>Search</Title>
          <SearchBar>
            <Ionicons
              name={`${utils.isAndroid()}search`}
              size={24}
              color={colors.red}
              style={{ marginHorizontal: 10 }}
            />
            <SearchTextInput
              placeholder="Search by city ..."
              returnKeyType="search"
              value={term}
              onChangeText={(text) => setTerm(text)}
              onSubmitEditing={handleSubmit}
            />
          </SearchBar>
          <OptionResetContainer>
            <Option>Option</Option>
            <ResetContainer onPress={handleReset}>
              <Reset>RESET</Reset>
            </ResetContainer>
          </OptionResetContainer>
          <OptionContainer
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
          >
            <OptionItem>
              <OptionLabel>Beds</OptionLabel>
              <OptionTextInput
                value={beds}
                onChangeText={(text) => setBeds(text)}
                onFocus={() => setBeds()}
                keyboardType="number-pad"
              />
            </OptionItem>
            <OptionItem>
              <OptionLabel>Bedrooms</OptionLabel>
              <OptionTextInput
                value={bedrooms}
                onChangeText={(text) => setBedrooms(text)}
                onFocus={() => setBedrooms()}
                keyboardType="number-pad"
              />
            </OptionItem>
            <OptionItem>
              <OptionLabel>Bathrooms</OptionLabel>
              <OptionTextInput
                value={bathrooms}
                onChangeText={(text) => setBathrooms(text)}
                onFocus={() => setBathrooms()}
                keyboardType="number-pad"
              />
            </OptionItem>
            <OptionItem>
              <OptionLabel>Max. Price</OptionLabel>
              <OptionTextInput
                value={maxPrice}
                onChangeText={(text) => setMaxPrice(text)}
                onFocus={() => setMaxPrice()}
                keyboardType="number-pad"
              />
            </OptionItem>
          </OptionContainer>
          {isLoading ? (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color="white" />
            </View>
          ) : result.length !== 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {result.map((room) => (
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
              <TouchableOpacity>
                <LoadMore>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: 15,
                    }}
                  >
                    Load More
                  </Text>
                </LoadMore>
              </TouchableOpacity>
            </ScrollView>
          ) : null}
        </Container>
      </>
    </DismissKeyboard>
  );
};
