import http from "./httpServices";

const endpoint = "/exhibit";

/**
 */
export async function postNewExhibit(data) {
    const { data: response } = await http.post(endpoint, data);
    return response;
}

export default {
    postNewExhibit,
};
