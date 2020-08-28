import ExplorerContainer from './ExplorerContainer';
import { getRooms } from '../../../redux/roomsSlice';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    getRooms: () => dispatch(getRooms()),
  };
}

function mapStateToProps(state) {
  return { rooms: state.roomsReducer.explore.rooms };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerContainer);
