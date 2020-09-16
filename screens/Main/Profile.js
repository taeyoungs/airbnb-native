import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { getUser } from '../../redux/usersSlice';
import colors from '../../colors';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.ScrollView`
  flex: 1;
  padding-top: 30px;
  background-color: white;
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: white;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
`;

const Avatar = styled.View`
  height: 60px;
  width: 60px;
  border-radius: 50px;
  background-color: peru;
  margin: 0px 20px 0px 25px;
`;

const Name = styled.Text`
  font-size: 27px;
  font-weight: 500;
`;

const InfoContainer = styled.View`
  padding: 0px 25px;
`;

const Info = styled.Text`
  color: ${colors.lightGrey};
  font-size: 13px;
  margin-bottom: 30px;
`;

const ProfileContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.07);
`;

const ProfileText = styled.Text`
  font-size: 20px;
  font-weight: 300;
`;

const Alert = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.07);
`;

const AlertText = styled.Text`
  font-size: 20px;
  font-weight: 300;
`;

const Logout = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;
  margin-top: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.07);
`;

const LogoutText = styled.Text`
  font-size: 20px;
  font-weight: 300;
  color: ${colors.teal};
`;

const Version = styled.Text`
  color: ${colors.lightGrey};
  text-align: center;
  margin-top: 30px;
  font-size: 10px;
`;

const Profile = ({ getUser, user, navigation }) => {
  useEffect(() => {
    getUser();
  }, []);
  // console.log(user);
  return (
    <Container>
      <AvatarContainer>
        <Avatar></Avatar>
        <Name>{user.last_name}</Name>
      </AvatarContainer>
      <InfoContainer>
        <Info>Account Manangement</Info>
        <ProfileContainer onPress={() => navigation.navigate('Info')}>
          <ProfileText>Personal Info</ProfileText>
          <Ionicons
            name="ios-information-circle-outline"
            size={30}
            color="rgba(0, 0, 0, 0.7)"
          />
        </ProfileContainer>
        <Alert>
          <AlertText>Alert</AlertText>
          <Ionicons
            name="ios-notifications-outline"
            size={34}
            color="rgba(0, 0, 0, 0.7)"
          />
        </Alert>
        <Logout>
          <LogoutText>Log Out</LogoutText>
          <Ionicons name="ios-log-out" size={30} color={colors.teal} />
        </Logout>
        <Version>Version: 1 (2020915)</Version>
      </InfoContainer>
    </Container>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getUser()),
  };
}

function mapStateToProps(state) {
  return state.usersReducer;
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
