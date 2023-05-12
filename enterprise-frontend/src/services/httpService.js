import axios from "axios";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Loggin the error", error);
    console.error("An unexpected error occured.");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  // calling protected endpoints
  axios.defaults.headers.common["x-auth-token"] = jwt;
  axios.defaults.headers.common["crossdomain"] = true;
  axios.defaults.headers.common["count"] = 2;
}

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  setJwt
};
