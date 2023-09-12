import axios from 'axios';

const API_URL = 'https://goalsetter-backend-w8zw.onrender.com/api/users/';
// const API_URL = 'http://localhost:5000/api/users/'

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {

  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const forgotPassword = async (userData) => {
  const response = await axios.patch(API_URL + 'updatePassword', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}



const logout = async () => {
  localStorage.removeItem('user');

};

const authService = { register, logout, login, forgotPassword };

export default authService;
