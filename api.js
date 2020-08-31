import axios from 'axios';

const callApi = async (method, path, data, jwt) => {
  const headers = {
    Authorization: jwt != null ? `Bearer ${jwt}` : null,
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://192.168.0.25:8000/api/v1/';
  const fullUrl = `${baseUrl}${path}`;

  // console.log(`${method} ${fullUrl} ${data}`);

  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, { headers });
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
};
// export const getRooms = () => callApi('get', 'rooms/');
