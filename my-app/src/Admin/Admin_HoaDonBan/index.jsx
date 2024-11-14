
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import ThongBao from "../../components/ThongBao";
import { hoadonbanService } from "../../services/HoaDonBanService";
import useHookMutation from "../../hooks/useHookMutation";
import { setListHDB, setXoaHDB } from "../../redux/slice/hoadonban.slice";
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";



function AdminHoaDonBanPage() {
    const { list_hdb } = useSelector(state => state.hdb);
    const [openModal, setOpenModal] = useState(false);
    const [thongbao, setThongBao] = useState({
        isOpen: false,
        type: "",
        message: ""
    })
    const [formData, setFormData] = useState({

    });
    const [option, setOption] = useState();
    const dispatch = useDispatch();
    const { data: hdbData, isSuccess: isSuccessFetchGetAllHdb } = useQuery({
        queryKey: ['get-all-hdb'],
        queryFn: hoadonbanService.getTatCaHoaDonBan
    });





    const deleteHDBMutation = useHookMutation((id) => {
        return hoadonbanService.xoaHoaDonBan(id);
    })

    const handleDeleteHDB = (id) => {
        deleteHDBMutation.mutate(id, {
            onSuccess: (data) => {

                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Xóa sản phẩm thành công!"
                });
                dispatch(setXoaHDB({
                    ma_hdb: data?.ma_hdb
                }));
            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Xóa sản phẩm thất bại!"
                });
            }
        });
    }









    useEffect(() => {
        if (isSuccessFetchGetAllHdb) {
            dispatch(setListHDB(hdbData));
        }
    }, [isSuccessFetchGetAllHdb])

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
                    <FiShoppingCart size={30} />,
                    <p className="text-2xl font-bold">Hóa đơn bán</p>
                </div>
            </div>
            <div className="flex mt-2">
                <input type="text" placeholder="Tim kiếm sản phẩm...." className="border border-gray-300 rounded-l-xl outline-none flex-1 px-4"/>
                <select className="bg-gray-50 border border-gray-300 border-l-0 text-gray-900 text-base outline-none w-96">
                    <option>Tìm kiếm theo mã hóa đơn</option>
                    <option>Tìm kiếm theo mã tài khoản</option>
                    <option>Tìm kiếm theo giá tiền</option>
                </select>
                <button className="bg-orange-400 flex items-center justify-center px-2 py-1 text-white text-base rounded-r-2xl hover:bg-orange-200">
                    <CiSearch size={40} />
                    <span className="text-base font-bold">Tìm kiếm</span>
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-sm">
                            <td scope="col" className="px-6 py-3">
                                Mã hóa đơn bán
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
                        {list_hdb && list_hdb.length > 0 && list_hdb.map((hdb) => (
                            <tr key={hdb?.ma_hdb} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                    {hdb?.ma_hdb}
                                </td>
                                <td className="px-6 py-4">
                                    {hdb?.ngay_tao}
                                </td>
                                <td className="px-6 py-4">
                                    {hdb?.tong_tien}
                                </td>
                                <td className="px-6 py-4">
                                    {hdb?.thanh_toan}
                                </td>
                                <td className="px-6 py-4">
                                    {hdb?.phuong_thuc_thanh_toan}
                                </td>
                                <td className="px-6 py-4">
                                    {hdb?.acc_id}
                                </td>
                                <td className="px-6 py-4 flex justify-center gap-4">
                                    <button className="px-2 py-2 rounded-full bg-green-600">

                                    </button>
                                    <button className="px-2 py-2 rounded-full bg-red-300">

                                        {/* <Modal
                                            open={openModalDelete === product?.ma_sp}
                                            onClose={handleCloseDeleteModal}
                                            className="flex justify-center items-center"
                                        >
                                            <div className="bg-white p-4 w-96 rounded-lg">
                                                <p className="text-2xl font-bold pb-5">Xác nhận xóa</p>
                                                <p>Bạn có chắc chắn muốn xóa sản phẩm {product?.ten_sp} ?</p>
                                                <div className="flex gap-4">
                                                    <button onClick={() => handleDeletesanPham(product?.ma_sp)} className="bg-red-600 text-white p-2 rounded-lg px-7">Xóa</button>
                                                    <button onClick={handleCloseDeleteModal} className="bg-gray-300 text-white p-2 rounded-lg px-6">Hủy</button>
                                                </div>
                                            </div>
                                        </Modal> */}
                                    </button>
                                </td>
                            </tr>
                        ))};
                    </tbody>
                </table>
            </div>
            <ThongBao isOpen={thongbao.isOpen} type={thongbao.type} message={thongbao.message} />
        </div>
    );
}

export default AdminHoaDonBanPage;