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
    saveFavs(state, action) {
      state.favs = payload.favs;
    },
  },
});

export const { setExplorerRooms, increasePage } = roomsSlice.actions;

export const getRooms = (page) => async (dispatch) => {
  try {
    const {
      data: { results },
    } = await api.rooms(page);
    // console.log(results);
    dispatch(setExplorerRooms({ rooms: results, page }));
  } catch (error) {
    console.warn(error);
  }
};

export default roomsSlice.reducer;
