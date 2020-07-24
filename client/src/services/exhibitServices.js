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
        } else formData.append(key, JSON.stringify(value));
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

export async function getSingleExhibit(exhibit_id) {
    const { data } = await http.get(endpoint + `/${exhibit_id}`);
    return data;
}

export async function getSingleExhibitLanguage(exhibit_id, language_code) {
    const { data } = await http.get(endpoint + `/${exhibit_id}/${language_code}`);
    return data;
}

export default {
    getAllExhibits,
    getSingleExhibit,
    getSingleExhibitLanguage,
    postNewExhibit,
};
