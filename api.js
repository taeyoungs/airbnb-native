import axios from 'axios';

const callApi = async (method, path, data, jwt) => {
  const headers = {
    Authorization: jwt,
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://172.20.10.3:8000/api/v1/';
  const fullUrl = `${baseUrl}${path}`;

  console.log(`${method} ${fullUrl} ${data}`);

  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, { headers });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

export default {
  createAccount: (form) => callApi('post', 'users/', form),
  token: (form) => callApi('post', 'users/token/', form),
};
// export const getRooms = () => callApi('get', 'rooms/');
