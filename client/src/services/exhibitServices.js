import http from "./httpServices";

const endpoint = "/exhibit";

/**
 */
export async function postNewExhibit(data) {
    const { data: response } = await http.post(endpoint, data);
    return response;
}

export async function getAllExhibits({ page, col, order }) {
    const p = page ? `page=${page}` : "";
    const s = order ? `&col=${col}&order=${order}` : "";
    const { data } = await http.get(endpoint + `?${p + s}`);
    return data;
}

export async function getSingleExhibit(exhibitId) {
    const { data } = await http.get(endpoint + `/${exhibitId}`);
    return data;
}

export default {
    postNewExhibit,
    getAllExhibits,
    getSingleExhibit
};
