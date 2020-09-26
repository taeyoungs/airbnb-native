import { createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { setFavs, setFav } from './roomsSlice';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoggedIn: false,
    token: null,
    id: null,
    user: {},
  },
  reducers: {
    logIn(state, action) {
      (state.isLoggedIn = true),
        (state.token = action.payload.token),
        (state.id = action.payload.pk);
    },
    logOut(state, action) {
      (state.isLoggedIn = false), (state.token = null);
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setInfo(state, action) {
      const { user } = state;
      const { first_name, last_name } = action.payload;
      user.first_name = first_name;
      user.last_name = last_name;
    },
  },
});

export const { logIn, logOut, setUser, setInfo } = usersSlice.actions;

export const userLogin = (form) => async (dispatch) => {
  try {
    const { data } = await api.token(form);
    const { pk, token } = data;
    if (pk && token) {
      dispatch(logIn({ token, pk }));
    }
  } catch (error) {
    if (error.message === 'Request failed with status code 401')
      alert('User does not exists');
    else {
      alert('Wrong email/password');
    }
    console.warn(`${error.name} ${error.message}`);
  }
};

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { id },
  } = getState();
  try {
    const { data } = await api.favs(id);
    dispatch(setFavs(data));
  } catch (error) {
    console.warn(error);
  }
};

export const toggleFav = (roomId) => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();

  // console.log(roomId);
  dispatch(setFav(roomId));
  try {
    await api.toggleFav(id, roomId, token);
  } catch (error) {
    console.warn(error);
  }
};

export const getUser = () => async (dispatch, getState) => {
  const {
    usersReducer: { id },
  } = getState();
  try {
    const { data } = await api.getUser(id);
    dispatch(setUser(data));
  } catch (error) {
    console.warn(error);
  }
};

export const updateInfo = (form) => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();
  dispatch(setInfo(form));
  try {
    const { status } = await api.updateUser(id, form, token);
    console.log(status);
  } catch (error) {
    console.warn(error);
  }
};

export default usersSlice.reducer;
