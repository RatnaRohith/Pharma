import http from './httpService';

export function getAllUsers() {
  return http.get(process.env.REACT_APP_API_URL + '/api/users');
}

export function getUser(userID) {
  return http.get(process.env.REACT_APP_API_URL + `/api/users/${userID}`);
}

export function getAllActivities() {
  return http.get(process.env.REACT_APP_API_URL + '/api/users/track-activity/all-activities');
}

export function register(user) {
  return http.post(process.env.REACT_APP_API_URL + '/api/users/create-user', {
    name: user.name,
    email: user.email,
    password: user.password
  });
}

export function deleteUser(userID) {
  return http.delete(process.env.REACT_APP_API_URL + `/api/users/${userID}`);
}

export function updateUser(userID, user) {
  console.log("HERE", user)
  return http.put(process.env.REACT_APP_API_URL + `/api/users/${userID}`, {
    name: user.name,
    email: user.email,
    pass: user.password
  });
}