import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn: (state, action) => {
      (state.isLoggedIn = true), (state.token = action.payload.token);
    },
    logOut: (state, action) => {
      (state.isLoggedIn = false), (state.token = null);
    },
  },
});

export const { logIn, logOut } = usersSlice.actions;

export const userLogin = (form) => async (dispatch) => {
  try {
    const { data } = await api.token(form);
    const { pk, token } = data;
    if (pk && token) {
      dispatch(logIn({ token }));
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

export default usersSlice.reducer;
