import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import ThongBao from "../../components/ThongBao";
import { hoadonbanService } from "../../services/HoaDonBanService";
import useHookMutation from "../../hooks/useHookMutation";
import { setDeleteHDB, setListHDB, setXoaHDB } from "../../redux/slice/hoadonban.slice";
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch, CiViewList } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal } from "@mui/material";

function AdminHoaDonBanPage() {
    const { list_hdb } = useSelector(state => state.hdb);
    const [openModalCTHD, setOpenModalCTHD] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [thongbao, setThongBao] = useState({
        isOpen: false,
        type: "",
        message: ""
    });
    const [formData, setFormData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("ma_hdb");

    const dispatch = useDispatch();

    const { data: hdbData, isSuccess: isSuccessFetchGetAllHdb } = useQuery({
        queryKey: ['get-all-hdb'],
        queryFn: hoadonbanService.getTatCaHoaDonBan
    });



    //Xóa hóa đơn
    const handleOpenModalDeleteHDB = (hdb) => {
        setFormData(hdb);
        setOpenModalDelete(true);
    };

    const deleteHDBMutation = useHookMutation((id) => {
        return hoadonbanService.xoaHoaDonBan(id);
    });

    const handleDeleteHDB = (id) => {
        deleteHDBMutation.mutate(id, {
            onSuccess: (data) => {
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Xóa hóa đơn thành công!"
                });
                dispatch(setDeleteHDB(data));
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
    };

    useEffect(() => {
        if (isSuccessFetchGetAllHdb && hdbData) {
            dispatch(setListHDB(hdbData));
        }
    }, [isSuccessFetchGetAllHdb, hdbData]);

    useEffect(() => {
        let timmerId;
        if (thongbao.isOpen) {
            timmerId = setTimeout(() => {
                setThongBao({
                    isOpen: false,
                    type: "",
                    message: ""
                });
            }, 3000);
        }

        return () => clearTimeout(timmerId);
    }, [thongbao.isOpen]);

    const handleSearchClick = async (opt) => {
        switch (opt) {
            case "ma_hdb":
                if (searchQuery) {
                    await hoadonbanService.getHDBById(searchQuery).then(data => {
                        dispatch(setListHDB(data));
                    }).catch(error => {
                        console.error("Error fetching data by ma_hdb:", error);
                    });
                }
                break;

            case "acc_id":
                if (searchQuery) {
                    await hoadonbanService.getHoaDonBanByAccId(searchQuery).then(data => {
                        dispatch(setListHDB(data));
                    }).catch(error => {
                        console.error("Error fetching data by acc_id:", error);
                    });
                }
                break;

            case "tong_tien":
                if (searchQuery) {
                    await hoadonbanService.layDanhSachHoaDonTheoTongTien(searchQuery).then(data => {
                        dispatch(setListHDB(data));
                    }).catch(error => {
                        console.error("Error fetching data by tong_tien:", error);
                    });
                }
                break;

            case "thanh_toan":
                const status = searchQuery === "Đã thanh toán" ? true : false;
                await hoadonbanService.layDanhSachHoaDonTheoTrangThai(status).then(data => {
                    dispatch(setListHDB(data));
                }).catch(error => {
                    console.error("Error fetching data by thanh_toan:", error);
                });
                break;

            case "phuong_thuc_thanh_toan":
                if (searchQuery) {
                    await hoadonbanService.layDanhSachHoaDonTheoPhuongThucThanhToan(searchQuery).then(data => {
                        dispatch(setListHDB(data));
                    }).catch(error => {
                        console.error("Error fetching data by phuong_thuc_thanh_toan:", error);
                    });
                }
                break;

            default:
                console.error("Invalid search option");
        }
    };


    return (
        <div className="bg-white px-4 py-5 h-full">
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <FiShoppingCart size={30} />
                    <p className="text-2xl font-bold">Hóa đơn bán</p>
                </div>
            </div>
            <div className="flex mt-2">
                <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className="border border-gray-300 rounded-l-xl outline-none flex-1 px-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="bg-gray-50 border border-gray-300 border-l-0 text-gray-900 text-base outline-none w-96"
                    value={searchOption}
                    onChange={(e) => setSearchOption(e.target.value)}
                >
                    <option value="ma_hdb">Tìm kiếm theo mã hóa đơn</option>
                    <option value="acc_id">Tìm kiếm theo mã tài khoản</option>
                    <option value="tong_tien">Tìm kiếm theo giá tiền lớn hơn</option>
                    <option value="thanh_toan">Đã thanh toán</option>
                    <option value="phuong_thuc_thanh_toan">Phương thức thanh toán</option>
                </select>
                <button
                    onClick={() => handleSearchClick(searchOption)}
                    className="bg-orange-400 flex items-center justify-center px-2 py-1 text-white text-base rounded-r-2xl hover:bg-orange-200"
                >
                    <CiSearch size={40} />
                    <span className="text-base font-bold">Tìm kiếm</span>
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-sm">
                            <th className="px-6 py-3">Mã hóa đơn bán</th>
                            <th className="px-6 py-3">Ngày tạo</th>
                            <th className="px-6 py-3">Tổng tiền</th>
                            <th className="px-6 py-3">Đã thanh toán</th>
                            <th className="px-6 py-3">Phương thức thanh toán</th>
                            <th className="px-6 py-3">Mã tài khoản</th>
                            <th className="px-6 py-3 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list_hdb && list_hdb.length > 0 ? list_hdb.map((hdb) => (
                            <tr key={hdb?.ma_hdb} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{hdb?.ma_hdb}</td>
                                <td className="px-6 py-4">{hdb?.ngay_tao}</td>
                                <td className="px-6 py-4">{hdb?.tong_tien}</td>
                                <td className="px-6 py-4">{hdb?.thanh_toan ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                <td className="px-6 py-4">{hdb?.phuong_thuc_thanh_toan}</td>
                                <td className="px-6 py-4">{hdb?.acc_id}</td>
                                <td className="px-6 py-4 flex justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            setFormData(hdb);
                                            setOpenModalCTHD(true);
                                        }}
                                        className="px-2 py-2 rounded-full bg-green-600">
                                        <CiViewList color="#fff" size={20} />
                                    </button>
                                    <button onClick={() => handleOpenModalDeleteHDB(hdb)} className="px-2 py-2 rounded-full bg-red-300">
                                        <RiDeleteBin6Line color="#fff" size={20} />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="text-center px-6 py-4">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Modal
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md sm:w-[600px] sm:max-w-lg sm:mx-auto">
                    <p className="text-lg font-bold mb-4">Xóa hóa đơn bán?</p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleDeleteHDB(formData?.ma_hdb)}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                        >
                            Xóa
                        </button>
                        <button
                            onClick={() => setOpenModalDelete(false)}
                            className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
            {thongbao.isOpen && <ThongBao type={thongbao.type} message={thongbao.message} />}
        </div>
    );
}

export default AdminHoaDonBanPage;
