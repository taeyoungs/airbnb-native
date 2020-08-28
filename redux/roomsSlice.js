import api from '../api';

const { createSlice } = require('@reduxjs/toolkit');

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    explore: {
      rooms: [],
      page: 1,
    },
    favs: [],
  },
  reducers: {
    setExplorerRooms(state, action) {
      const { explore } = state;
      const { payload } = action;
      payload.rooms.forEach((p_room) => {
        // console.log(p_room);
        const exist = explore.rooms.find((e_room) => e_room.id === p_room.id);
        if (!exist) {
          explore.rooms.push(p_room);
        }
      });
      explore.page = payload.page;
    },
  },
});

export const { setExplorerRooms } = roomsSlice.actions;

export const getRooms = () => async (dispatch) => {
  try {
    const {
      data: { results },
    } = await api.rooms();
    // console.log(results);
    dispatch(setExplorerRooms({ rooms: results }));
  } catch (error) {
    console.warn(error);
  }
};

export default roomsSlice.reducer;
