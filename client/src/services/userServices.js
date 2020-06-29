import http from "./httpServices";

const endpoint = "/user";

/**
 * query: Object({page, col, order})
 */
export async function getCustomers({ page, col, order }) {
  const p = page ? `page=${page}` : "";
  const s = order ? `&col=${col}&order=${order}` : "";
  const { data } = await http.get(endpoint + `/customer?${p + s}`);
  return data;
}

/**
 * data: Object({name, description, email, first_name, last_name, days})
 */
export async function postNewCustomer(data) {
  const { data: response } = await http.post(endpoint + "/customer", data);
  return response;
}

export default {
  getCustomers,
  postNewCustomer,
};
