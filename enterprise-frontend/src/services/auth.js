import jwtDecode from 'jwt-decode';
import http from './httpService';

const tokenKey = 'token';

http.setJwt(getJwt());

export function login(email, password) {
  const Endpoint = process.env.REACT_APP_API_URL + '/api/auth';
  return http.post(Endpoint, {
    email,
    password,
  });
}

export function logout() {
  console.log('in logout')
  localStorage.removeItem(tokenKey);
  window.location = '/';
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    // window.location = '/';
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
};

