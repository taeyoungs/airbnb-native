import SignInContainer from './SignInContainer';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    userLogin: (form) => dispatch(userLogin(form)),
  };
}

export default connect(null, mapDispatchToProps)(SignInContainer);
