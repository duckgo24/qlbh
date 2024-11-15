
import axiosJWT from "../../utils/axios.interceptor";
import delay from "../../utils/delay";

const baseURL = process.env.REACT_APP_API_URL;


async function getTatCaHoaDonBan() {
    const res = await axiosJWT.get(`${baseURL}/hoadonban/get-all`);
    return res.data;
}

//User
async function getHDBById(id) {
    const res = await axiosJWT.get(`${baseURL}/hoadonban/get-by-id/${id}`);
    return res.data;
}

async function layDanhSachHoaDonTheoNgay(ngay) {
    const res = await axiosJWT.get(`${baseURL}/hoadonban/get-theo-ngay/${ngay}`);
    return res.data;
}

async function layDanhSachHoaDonTheoTongTien(tong_tien) {
    const res = await axiosJWT.get(`${baseURL}/hoadonban/get-theo-tong-tien/${tong_tien}`);
    return res.data;
}

async function layDanhSachHoaDonTheoTrangThai({ thanh_toan }) {
    const res = await axiosJWT.get(`${baseURL}/hoadonban/get-theo-trang-thai/${thanh_toan}`);
    return res.data;
}
async function layDanhSachHoaDonByUser({ userId }) {
    const res = await axiosJWT.get(`${baseURL}/hoadonban/get-by-id/${userId}`);
    return res.data;
}

async function layDanhSachHoaDonDaThanhToanByUser({ userId }) {
    const res = await axiosJWT.get(`${baseURL}/hoadonban/get-da-thanh-toan-by-user-id/${userId}`);
    return res.data;
}
async function layDanhSachHoaDonChuaThanhToanByUser({ userId }) {
    const res = await axiosJWT.get(`${baseURL}/hoadonban/get-chua-thanh-toan-by-user-id/${userId}`);
    return res.data;
}

async function themHoaDonBan(data) {
    const res = await axiosJWT.post(`${baseURL}/hoadonban/create`, data);
    return res.data;
}

async function xoaHoaDonBan(id) {
    const res = await axiosJWT.delete(`${baseURL}/hoadonban/delete/${id}`);
    return res.data
}
async function capNhatHoaDonBan(id, data) {
    const res = await axiosJWT.put(`${baseURL}/hoadonban/update/${id}`, data);
    return res.data;
}



export const hoadonbanService = {
    getTatCaHoaDonBan,
    layDanhSachHoaDonTheoNgay,
    layDanhSachHoaDonTheoTongTien,
    layDanhSachHoaDonTheoTrangThai,
    layDanhSachHoaDonByUser,
    layDanhSachHoaDonChuaThanhToanByUser,
    layDanhSachHoaDonDaThanhToanByUser,
    getHDBById,
    themHoaDonBan,
    xoaHoaDonBan,
    capNhatHoaDonBan
}
