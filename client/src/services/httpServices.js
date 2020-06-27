import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (process.env.REACT_APP_ENV === "development")
      config.baseURL = process.env.REACT_APP_DEVELOPMENT_BACKEND_URL;
    else config.baseURL = process.env.REACT_APP_PRODUCTION_BACKEND_URL;

    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      process.env.REACT_APP_JWT_NAME
    )}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
