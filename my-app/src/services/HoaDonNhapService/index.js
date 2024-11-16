
import axiosJWT from "../../utils/axios.interceptor";

const baseURL = process.env.REACT_APP_API_URL;

async function getTatCaHoaDonNhap() {
    const res = await axiosJWT.get(`${baseURL}/hoadonnhap/get-all`);
    return res.data;
}

async function getHDNById(id) {
    try {
        const res = await axiosJWT.get(`${baseURL}/hoadonnhap/get-by-id/${id}`);
        return res.data;
    } catch (error) {
        return error.message;;
    }
}

async function taoHoaDonNhap(hoadonnhap) {
    const res = await axiosJWT.post(`${baseURL}/hoadonnhap/create`, hoadonnhap);
    return res.data;
}

async function xoaHoaDonNhap(id) {
    const res = await axiosJWT.delete(`${baseURL}/hoadonnhap/delete/${id}`);
    return res.data;
}

async function getHdnTheoTongTien(sum) {
    const res = await axiosJWT.get(`${baseURL}/hoadonnhap/get-by-tong-tien/${sum}`);
    return res.data;
}
async function getHdnDaThanhToan() {
    const res = await axiosJWT.get(`${baseURL}/hoadonnhap/get-da-thanh-toan`);
    return res.data;
}

async function getHDNChuaThanhToan() {
    const res = await axiosJWT.get(`${baseURL}/hoadonnhap/get-chua-thanh-toan`);
    return res.data;
}



export const hoadonnhapService = {
    getTatCaHoaDonNhap,
    getHDNById,
    taoHoaDonNhap,
    xoaHoaDonNhap,
    getHdnTheoTongTien,
    getHdnDaThanhToan,
    getHDNChuaThanhToan
}
