
import axiosJWT from "../../utils/axios.interceptor";

const baseURL = process.env.REACT_APP_API_URL;

async function getAllDanhMuc() {
    const response = await axiosJWT.get(`${baseURL}/danhmuc/get-all`);
    return response.data;
}

async function getDanhMucById(maDanhMuc) {
    const response = await axiosJWT.get(`${baseURL}/danhmuc/get-by-id/${maDanhMuc}`);
    return response.data;
}

async function createDanhMuc(data) {
    const response = await axiosJWT.post(`${baseURL}/danhmuc/create`, data);
    return response.data;
}

async function updateDanhMuc(id, data) {
    const response = await axiosJWT.put(`${baseURL}/danhmuc/update/${id}`, data);
    return response.data;
}

async function deleteDanhMuc(id) {
    const response = await axiosJWT.delete(`${baseURL}/danhmuc/delete/${id}`);
    return response.data;
}

export const danhMucService = {
    getAllDanhMuc,
    getDanhMucById,
    createDanhMuc,
    updateDanhMuc,
    deleteDanhMuc,
};