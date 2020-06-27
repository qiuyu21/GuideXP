import http from "./httpServices";

const endpoint = "/user";

export async function getCustomers() {
  const { data } = await http.get(endpoint + "/customer");
  return data;
}

export default {
  getCustomers,
};
