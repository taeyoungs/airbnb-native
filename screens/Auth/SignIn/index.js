import SignInContainer from './SignInContainer';
import { connect } from 'react-redux';
import { userLogin } from '../../../redux/usersSlice';

function mapDispatchToProps(dispatch) {
  return {
    userLogin: (form) => dispatch(userLogin(form)),
  };
}

export default connect(null, mapDispatchToProps)(SignInContainer);
