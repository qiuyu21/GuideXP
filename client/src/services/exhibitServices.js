import http from "./httpServices";

const endpoint = "/exhibit";

/**
 */
export async function postNewExhibit(data) {
    //multipart/data
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        if (key === "files" && data[key]) {
            for (const file of data[key]) {
                formData.append(file.name, file.originFileObj);
            }
        } else if (key === "description") {
            formData.append(key, JSON.stringify(value));
        } else formData.append(key, value);
    }
    const { data: response } = await http.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
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
