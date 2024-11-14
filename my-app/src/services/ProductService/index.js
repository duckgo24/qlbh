import axiosJWT from "../../utils/axios.interceptor";


const baseURL = process.env.REACT_APP_API_URL;

async function getAllProduct() {
    const response = await axiosJWT.get(`${baseURL}/sanpham/get-all`);
    return response.data;
}

async function getProductBestSales({ limit }) {
    const response = await axiosJWT.get(`${baseURL}/sanpham/best-sales`, {
        params: {
            limit
        }
    });
    return response.data;
}


async function getProductNew({ limit }) {
    const response = await axiosJWT.get(`${baseURL}/sanpham/news`, {
        params: {
            limit
        }
    });
    return response.data;
}


async function getProductByDanhMuc({ ma_dm, limit }) {
    const response = await axiosJWT.get(`${baseURL}/sanpham/get-by-ma-dm`, {
        params: {
            ma_dm,
            limit
        }
    });
    return response.data;
}

async function getProductById({ma_sp}) {
    const response = await axiosJWT.get(`${baseURL}/sanpham/get-by-id/${ma_sp}`);
    return response.data;
}

async function createProduct(data) {
    const response = await axiosJWT.post(`${baseURL}/sanpham/create`, data);
    return response.data;
}

async function updateProduct(id, data) {
    console.log(id);
    const response = await axiosJWT.put(`${baseURL}/sanpham/update/${id}`, data);
    return response.data;
}

async function deleteProduct(id) {
    const response = await axiosJWT.delete(`${baseURL}/sanpham/delete/${id}`);
    return response.data;
}


export const productService = {
    getProductBestSales,
    getProductNew,
    getProductByDanhMuc,
    getProductById,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}