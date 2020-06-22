import jwtDecode from "jwt-decode";

export function getUser() {
  try {
    const jwt = localStorage.getItem(process.env.REACT_APP_JWT_NAME);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  getUser,
};
