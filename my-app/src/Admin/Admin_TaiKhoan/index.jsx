import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import useHookMutation from "../../hooks/useHookMutation";
import ThongBao from "../../components/ThongBao";
import { accountService } from "../../services/AccountService";
import { setDeleteAccount, setListAccount, setUpdateAccount } from "../../redux/slice/account.slice";
import { MdOutlineSwitchAccount } from "react-icons/md";




function AaccinTaiKhoanPage() {
    const { list_account } = useSelector(state => state.account);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [thongbao, setThongBao] = useState({
        isOpen: false,
        type: "",
        message: ""
    })
    const [formData, setFormData] = useState({});

    const dispatch = useDispatch();
    const { data: taikhoanData, isSuccess: isSuccessFetchGetAllTaiKhoan } = useQuery({
        queryKey: ['get-all-account'],
        queryFn: accountService.getAllAccount
    });



    const handleOpenModalXoaTaiKhoan = (acc) => {
        setOpenModalDelete(true);
        setFormData(acc);
    };




    const deleteTaiKhoanMutation = useHookMutation((id) => {
        return accountService.deleteAccount(id);
    })

    const handleDeleteTaiKhoan = () => {
        deleteTaiKhoanMutation.mutate(formData?.acc_id, {
            onSuccess: (data) => {
                setOpenModalDelete(false);
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Xóa tài khoản thành công!"
                });
                dispatch(setDeleteAccount(data.account));
            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Xóa tài khoản thất bại!"
                });
            }
        });
    }


    // Sửa tài khoản
    const handleOpenModalSuaTaiKhoan = (acc) => {
        setFormData(acc);
        setOpenEditModal(true);
    }

    const updateTaiKhoanMutation = useHookMutation((data) => {
        return accountService.updateAccount(data)
    });

    const handleUpdateTaiKhoan = (e) => {
        e.preventDefault();
        console.log(formData);
        
        updateTaiKhoanMutation.mutate((formData), {
            onSuccess: (data) => {
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Sửa tài khoản thành công!"
                });
                dispatch(setUpdateAccount(data.account));
                setFormData({});
                setOpenEditModal(false);

            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Sửa tài khoản thất bại!"
                });
            }
        });
    }


    const handleOnChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }




    useEffect(() => {
        if (isSuccessFetchGetAllTaiKhoan) {
            dispatch(setListAccount(taikhoanData));
        }
    }, [isSuccessFetchGetAllTaiKhoan])

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
                <div className="flex items-center gap-1">
                    <MdOutlineSwitchAccount size={30} />
                    <p className="text-2xl font-bold">Tài khoản</p>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-sm">
                            <td scope="col" className="px-6 py-3">
                                Mã tài khoản
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Tên đăng nhập
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Mật khẩu
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Ban
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Quyền
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Thao tác
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {list_account && list_account.length > 0 && list_account.map((acc) => (
                            <tr key={acc?.acc_id} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                    {acc?.acc_id}
                                </td>
                                <td className="px-6 py-4 ">
                                    {acc?.username}
                                </td>
                                <td className="px-6 py-4 text-base">
                                    {acc.password}
                                </td>
                                <td className="px-6 py-4 text-base">
                                    {acc.isBan ? "Đã cấm" : "False"}
                                </td>
                                <td className="px-6 py-4 text-base">
                                    {acc.isAdmin ? "Admin" : "Người dùng"}
                                </td>
                                <td className="px-6 py-4 flex justify-center gap-4">
                                    <button onClick={() => handleOpenModalSuaTaiKhoan(acc)} className="px-2 py-2 rounded-full bg-green-600">
                                        <RiEditLine color="#fff" size={25} />
                                    </button>
                                    <button onClick={() => handleOpenModalXoaTaiKhoan(acc)} className="px-2 py-2 rounded-full bg-red-300">
                                        <RiDeleteBin6Line color="#fff" size={25} />
                                    </button>
                                </td>
                            </tr>
                        ))};
                    </tbody>
                </table>
            </div>
            <Modal
                open={!!openModalDelete}
                onClose={() => {
                    setOpenModalDelete(false);
                    setFormData({});
                }}
                className="flex justify-center items-center"
            >
                <div className="bg-white p-4 w-96 rounded-lg">
                    <p className="text-2xl font-bold pb-5">Xác nhận xóa</p>
                    <p>Bạn có chắc chắn muốn xóa tài khoản {formData?.username} ?</p>
                    <div className="flex gap-4">
                        <button
                            onClick={handleDeleteTaiKhoan}
                            className="bg-red-600 text-white p-2 rounded-lg px-7"
                        >
                            Xóa
                        </button>
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
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                className="flex justify-center items-center"
            >
                <div className="bg-white p-4 rounded-lg w-96 flex flex-col">
                    <p className="text-2xl font-bold pb-5">
                        Sửa tài khoản
                    </p>
                    <div className="flex gap-6 flex-1 w-full">
                        <form className="flex flex-col gap-4 flex-1">
                            <input name="username" onChange={handleOnChangeInput} value={formData.username} type="text" placeholder="Tên đăng nhập" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl flex-1" />
                            <input name="password"  onChange={handleOnChangeInput} value={formData?.password} type="text" placeholder="Mật khẩu" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl flex-1" />
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    checked={formData?.isBan}
                                    onChange={(e) => setFormData({ ...formData, isBan: e.target.checked })}
                                    type="checkbox"
                                    value={formData?.isBan || false}
                                    className="sr-only peer"
                                />
                                <span className="ms-3 text-sm font-base text-gray-900 w-16">Ban</span>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    checked={formData?.isAdmin}
                                    onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                                    type="checkbox"
                                    value={formData?.isAdmin || false}
                                    className="sr-only peer"
                                />
                                <span className="ms-3 text-sm font-base text-gray-900 w-16">Admin</span>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </form>

                    </div>
                    <button onClick={handleUpdateTaiKhoan} className="bg-green-600 text-white float-right p-2 rounded-lg px-16 py-2 mt-5">
                        Cập nhật
                    </button>
                </div>
            </Modal>
            <ThongBao isOpen={thongbao.isOpen} type={thongbao.type} message={thongbao.message} />
        </div>


    );
}

export default AaccinTaiKhoanPage;