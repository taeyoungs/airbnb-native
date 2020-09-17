import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import colors from '../../colors';
import NameInput from '../../components/Main/NameInput';

const { width, height } = Dimensions.get('screen');

const Container = styled.ScrollView`
  background-color: white;
  height: 100%;
  padding: 0px 20px;
`;

const Title = styled.Text`
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
`;

const ProfileContainer = styled.View``;

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
`;

const Name = styled.TextInput`
  font-size: 20px;
`;

const Gender = styled.Text`
  font-size: 20px;
  text-transform: capitalize;
`;

const Confirm = styled.View`
  background-color: white;
  height: 50px;
  justify-content: center;
  align-items: flex-end;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
`;

const ConfirmButton = styled.TouchableOpacity`
  padding: 5px;
  margin-right: 15px;
`;

const ConfirmText = styled.Text`
  color: ${colors.teal};
  font-weight: 600;
`;

const SelectContainer = styled.View`
  position: absolute;
  left: -20px;
  bottom: -20px;
  width: ${width}px;
  height: 216px;
  background-color: white;
  z-index: 12;
  justify-content: center;
`;

const Select = styled.Picker`
  width: 100%;
  padding-bottom: 20px;
`;

const Birth = styled.Text`
  font-size: 20px;
`;

export default ({
  route: {
    params: { user },
  },
}) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [gender, setGender] = useState('Male');
  const [birth, setBirth] = useState(new Date('1994-05-03'));
  const [isGenVisible, setIsGenVisible] = useState(false);
  const [isBirVisible, setIsBirVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birth;
    setBirth(currentDate);
  };

  return (
    <>
      <Container>
        <Title>Edit Profile</Title>
        <ProfileContainer>
          <NameInput
            placeholder="Last Name Input"
            label="Last Name"
            value={lastName}
            setValue={setLastName}
            setIsGenVisible={setIsGenVisible}
            setIsBirVisible={setIsBirVisible}
          />
          <NameInput
            placeholder="First Name Input"
            label="First Name"
            value={firstName}
            setValue={setFirstName}
            setIsGenVisible={setIsGenVisible}
            setIsBirVisible={setIsBirVisible}
          />
          <TouchableOpacity
            onPress={() => {
              setIsGenVisible(true);
              setIsBirVisible(false);
            }}
          >
            <Label>Gender</Label>
            <TextInputContainer>
              <Gender>{gender}</Gender>
            </TextInputContainer>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsGenVisible(false);
              setIsBirVisible(true);
            }}
          >
            <Label>Birthday</Label>
            <TextInputContainer>
              <Birth>
                {birth.getFullYear()}. {birth.getMonth() + 1}. {birth.getDate()}
                .
              </Birth>
            </TextInputContainer>
          </TouchableOpacity>
          <Label>Email</Label>
          <TextInputContainer>
            <Name placeholder="Email Input" />
          </TextInputContainer>
          <Label>Fake Input</Label>
          <TextInputContainer>
            <Name placeholder="Blah blah" />
          </TextInputContainer>
          <Label>Fake Input</Label>
          <TextInputContainer>
            <Name placeholder="Blah blah" />
          </TextInputContainer>
        </ProfileContainer>
      </Container>
      <Modal isVisible={isGenVisible} hasBackdrop={false} coverScreen={false}>
        <SelectContainer>
          <Confirm>
            <ConfirmButton onPress={() => setIsGenVisible(false)}>
              <ConfirmText>Confirm</ConfirmText>
            </ConfirmButton>
          </Confirm>
          <Select
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            itemStyle={{ color: colors.teal }}
          >
            <Picker.Item label="Empty" value="empty" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Select>
        </SelectContainer>
      </Modal>
      <Modal isVisible={isBirVisible} hasBackdrop={false} coverScreen={false}>
        <SelectContainer>
          <Confirm>
            <ConfirmButton onPress={() => setIsBirVisible(false)}>
              <ConfirmText>Confirm</ConfirmText>
            </ConfirmButton>
          </Confirm>
          <DateTimePicker
            value={birth}
            textColor={colors.teal}
            onChange={onChange}
          />
        </SelectContainer>
      </Modal>
    </>
  );
};
