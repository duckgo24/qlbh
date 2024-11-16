
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch, CiViewList } from "react-icons/ci";


import ThongBao from "../../components/ThongBao";
import useHookMutation from "../../hooks/useHookMutation";
import RenderWithCondition from "../../components/RenderWithCondition";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { hoadonnhapService } from "../../services/HoaDonNhapService";
import { setDeleteHDN, setListHDN } from "../../redux/slice/hoadonnhap.slice";



function AdminHoaDonNhapPage() {
    const { list_hdn } = useSelector(state => state.hdn);
    const { list_product } = useSelector(state => state.product);
    const [openModalCTHD, setOpenModalCTHD] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [thongbao, setThongBao] = useState({
        isOpen: false,
        type: "",
        message: ""
    })
    const [formData, setFormData] = useState({});
    const [data, setData] = useState(list_hdn);
    const [optionSearch, setOptionSearch] = useState("ma_hd");
    const [searchInput, setSearchInput] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { data: hdnData, isSuccess: isSuccessFetchGetAllHdn } = useQuery({
        queryKey: ['get-all-hdn'],
        queryFn: hoadonnhapService.getTatCaHoaDonNhap
    });


    const handleOpenModalDeleteHDN = (hdn) => {
        setFormData(hdn);
        setOpenModalDelete(true);
    };


    const deleteHDNMutation = useHookMutation((id) => {
        return hoadonnhapService.xoaHoaDonNhap(id);
    });

    const handleDeleteHDN = (id) => {
        deleteHDNMutation.mutate(id, {
            onSuccess: (data) => {
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Xóa hóa đơn thành công!"
                });
                dispatch(setDeleteHDN(data));
                setOpenModalDelete(false);
                setFormData({});
            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Xóa hóa đơn thất bại!"
                });
            }
        });
    }

    const handleSearch = async () => {
        if(searchInput) {
            return;
        }
        setLoading(true);
        if (optionSearch === "ma_hd") {

            const data = await hoadonnhapService.getHDNById(searchInput);
            if (data) {
                setData([data]);
            }
        }
        if (optionSearch === "gia_tien") {
            const data = await hoadonnhapService.getHdnTheoTongTien(searchInput || 0);
            if (data) {
                setData(data);
            }
        }
        if (optionSearch === "da_thanh_toan") {
            const data = await hoadonnhapService.getHdnDaThanhToan();
            if (data) {
                setData(data);
            }
        }
        if (optionSearch === "chua_thanh_toan") {
            const data = await hoadonnhapService.getHDNChuaThanhToan();
            if (data) {
                setData(data);
            }
        }
        if (optionSearch === "all") {
            setData(null);
        }
        setLoading(false);
    }


    useEffect(() => {
        if (isSuccessFetchGetAllHdn) {
            dispatch(setListHDN(hdnData));
        }
    }, [isSuccessFetchGetAllHdn])

    useEffect(() => {
        let timmerId;
        if (thongbao.isOpen) {
            timmerId = setTimeout(() => {
                setThongBao({
                    isOpen: false,
                    type: "",
                    message: ""
                })
            }, 3000)
        }

        return () => clearTimeout(timmerId);
    }, [thongbao.isOpen])

    return (
        <div className='bg-white px-4 py-5 h-full'>
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <BiPurchaseTagAlt size={30} />,
                    <p className="text-2xl font-bold">Hóa đơn nhập</p>
                </div>
            </div>
            <div className="flex mt-2">
                <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder="Nhập từ khóa tìm kiếm..." className={`border border-gray-300 rounded-l-xl outline-none flex-1 px-4 ${loading && 'opacity-45'}`} />
                <select onChange={(e) => setOptionSearch(e.target.value)} className="bg-gray-50 border border-gray-300 border-l-0 text-gray-900 text-base outline-none w-96">
                    <option value="ma_hd">Tìm kiếm theo mã hóa đơn</option>
                    <option value="gia_tien">Tìm kiếm theo giá tiền lớn hơn</option>
                    <option value="da_thanh_toan">Đã thanh toán</option>
                    <option value="chua_thanh_toan">Chưa thanh toán</option>
                    <option value="all">Tất cả</option>
                </select>
                <button onClick={handleSearch} className="bg-orange-400 flex items-center justify-center px-2 py-1 text-white text-base rounded-r-2xl hover:bg-orange-200">
                    <CiSearch size={40} />
                    <span className="text-base font-bold">Tìm kiếm</span>
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-sm">
                            <td scope="col" className="px-6 py-3">
                                Mã hóa đơn nhập
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Ngày tạo
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Tổng tiền
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Đã thanh toán
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Phương thức thanh toán
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Mã tài khoản
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Thao tác
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderWithCondition condition={!data}>
                            {list_hdn && list_hdn.length > 0 && list_hdn.map((hdn) => (
                                <tr key={hdn?.ma_hdn} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                        {hdn?.ma_hdn}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.ngay_tao}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.tong_tien}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.thanh_toan ? "Đã thanh toán" : "Chưa thanh toán"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.phuong_thuc_thanh_toan}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.acc_id}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-4">
                                        <button
                                            onClick={() => {
                                                setFormData(hdn);
                                                setOpenModalCTHD(true);
                                            }}
                                            className="px-2 py-2 rounded-full bg-green-600">
                                            <CiViewList color="#fff" size={20} />
                                        </button>
                                        <button onClick={() => handleOpenModalDeleteHDN(hdn)} className="px-2 py-2 rounded-full bg-red-300">
                                            <RiDeleteBin6Line color="#fff" size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))};
                        </RenderWithCondition>
                        <RenderWithCondition condition={data}>
                            {data && data.length > 0 && data.map((hdn) => (
                                <tr key={hdn?.ma_hdn} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                        {hdn?.ma_hdn}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.ngay_tao}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.tong_tien}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.thanh_toan ? "Đã thanh toán" : "Chưa thanh toán"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.phuong_thuc_thanh_toan}
                                    </td>
                                    <td className="px-6 py-4">
                                        {hdn?.acc_id}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-4">
                                        <button
                                            onClick={() => {
                                                setFormData(hdn);
                                                setOpenModalCTHD(true);

                                            }}
                                            className="px-2 py-2 rounded-full bg-green-600">
                                            <CiViewList color="#fff" size={20} />
                                        </button>
                                        <button onClick={() => handleOpenModalDeleteHDN(hdn)} className="px-2 py-2 rounded-full bg-red-300">
                                            <RiDeleteBin6Line color="#fff" size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))};
                        </RenderWithCondition>
                    </tbody>
                </table>
            </div>
            <Modal
                open={openModalDelete}
                onClose={() => {
                    setOpenModalDelete(false);
                    setFormData({});
                }}
                className="flex justify-center items-center"
            >
                <div className="bg-white p-4 w-96 rounded-lg">
                    <p className="text-2xl font-bold pb-5">Xác nhận xóa</p>
                    <p>Bạn có chắc chắn muốn xóa hóa đơn {formData?.ma_hdn} ?</p>
                    <div className="flex gap-4">
                        <button onClick={() => handleDeleteHDN(formData?.ma_hdn)} className="bg-red-600 text-white p-2 rounded-lg px-7">Xóa</button>
                        <button
                            onClick={() => {
                                setOpenModalDelete(false);
                                setFormData({});
                            }}
                            className="bg-gray-300 text-white p-2 rounded-lg px-6">
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                open={openModalCTHD}
                onClose={() => {
                    setFormData({});
                    setOpenModalCTHD(false);
                }}
                className="flex justify-center items-center"
            >
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tên sản phẩm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Giá bán
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số lượng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Thành tiền
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData && formData.chiTietHoaDonNhaps && formData.chiTietHoaDonNhaps.length > 0 ? (
                                formData.chiTietHoaDonNhaps.map((cthdn) => (
                                    <tr key={cthdn.ma_sp} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {list_product.find(pro => pro.ma_sp === cthdn.ma_sp)?.ten_sp || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {list_product.find(pro => pro.ma_sp === cthdn.ma_sp)?.gia_ban || 0}
                                        </td>
                                        <td className="px-6 py-4">
                                            {cthdn.so_luong}
                                        </td>
                                        <td className="px-6 py-4">
                                            {(list_product.find(pro => pro.ma_sp === cthdn.ma_sp)?.gia_ban || 0) * cthdn.so_luong}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center px-6 py-4">
                                        No data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </Modal>
            <ThongBao isOpen={thongbao.isOpen} type={thongbao.type} message={thongbao.message} />
        </div>
    );
}

export default AdminHoaDonNhapPage;