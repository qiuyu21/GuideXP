import http from "./httpServices";

const endpoint = "/exhibit";

/**
 * data: Object({name, description, email, first_name, last_name, days})
 */
export async function postNewExhibit(data) {
    console.log(data);
    // const { data: response } = await http.post(endpoint, data);
    // return response;
}

export default {
    postNewExhibit,
};
