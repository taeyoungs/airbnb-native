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
      if (payload.page === 1) {
        explore.rooms = payload.rooms;
        explore.page = 1;
      } else {
        explore.rooms = [...explore.rooms, ...payload.rooms];
      }
    },
    increasePage(state, action) {
      state.explore.page += 1;
    },
    setFavs(state, action) {
      state.favs = action.payload;
    },
    setFav(state, action) {
      const {
        explore: { rooms },
      } = state;
      const roomId = action.payload;
      const room = rooms.find((room) => room.id === roomId);
      if (room.is_fav) {
        room.is_fav = false;
        state.favs = state.favs.filter((room) => room.id !== roomId);
      } else {
        room.is_fav = true;
        state.favs = [room, ...state.favs];
      }
    },
  },
});

export const {
  setExplorerRooms,
  increasePage,
  setFavs,
  setFav,
} = roomsSlice.actions;

export const getRooms = (page) => async (dispatch, getState) => {
  try {
    const {
      usersReducer: { token },
    } = getState();
    const {
      data: { results },
    } = await api.rooms(page, token);
    // console.log(results);
    dispatch(setExplorerRooms({ rooms: results, page }));
  } catch (error) {
    console.warn(error);
  }
};

export default roomsSlice.reducer;
