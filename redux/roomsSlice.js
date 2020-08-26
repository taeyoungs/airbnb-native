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
      explore.rooms = payload.rooms;
      explore.page = payload.page;
    },
  },
});

export const { setExplorerRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
