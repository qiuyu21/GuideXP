import jwtDecode from "jwt-decode";
import http from "./httpServices";

const endpoint = "/auth";

export function getUser() {
  try {
    const jwt = localStorage.getItem(process.env.REACT_APP_JWT_NAME);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

/**
 * data: {email, password}
 */
export async function login(data) {
  const { data: response } = await http.post(endpoint + "/login", data);
  localStorage.setItem(process.env.REACT_APP_JWT_NAME, response.message.token);
}

export function logout() {
  localStorage.removeItem(process.env.REACT_APP_JWT_NAME);
}

export default {
  getUser,
  login,
  logout,
};
