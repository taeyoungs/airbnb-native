import SavedContainer from './SavedContainer';
import { connect } from 'react-redux';
import { getFavs } from '../../../redux/usersSlice';

function mapDispatchToProps(dispatch) {
  return {
    getFavs: (pk) => dispatch(getFavs(pk)),
  };
}

// function mapStateToProps(state) {
//   return { ...state.usersReducer };
// }

export default connect(null, mapDispatchToProps)(SavedContainer);
