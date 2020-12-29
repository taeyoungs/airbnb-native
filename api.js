import axios from 'axios';

const callApi = async (method, path, data, jwt, params) => {
  const headers = {
    Authorization: jwt != null ? `Bearer ${jwt}` : null,
    'Content-Type': 'application/json',
  };
  // const baseUrl = 'http://192.168.0.25:8000/api/v1/';
  const baseUrl = 'http://172.16.35.115:8000/api/v1/';
  const fullUrl = `${baseUrl}${path}`;

  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

export default {
  createAccount: (form) => callApi('post', 'users/', form),
  token: (form) => callApi('post', 'users/token/', form),
  rooms: (page = 1, token) =>
    callApi('get', `rooms/?page=${page}`, null, token),
  favs: (pk) => callApi('get', `users/${pk}/favs`),
  toggleFav: (pk, roomId, token) =>
    callApi('put', `users/${pk}/favs/`, { pk: roomId }, token),
  search: (form, token) => callApi('get', 'rooms/search/', null, token, form),
  getUser: (pk) => callApi('get', `users/${pk}/`),
  updateUser: (pk, form, token) =>
    callApi('patch', `users/${pk}/`, form, token, null),
};
