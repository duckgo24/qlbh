import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { RiDeleteBin6Line, RiEditLine, RiProductHuntLine } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";

import useHookMutation from "../../hooks/useHookMutation";

import ThongBao from "../../components/ThongBao";


import getLinkImage from "../../utils/getLinkImage";
import { accountService } from "../../services/AccountService";
import { setListAccount, setUpdateAccount } from "../../redux/slice/account.slice";




function AaccinTaiKhoanPage() {
    const { list_account } = useSelector(state => state.account);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [thongbao, setThongBao] = useState({
        isOpen: false,
        type: "",
        message: ""
    })
    const [formData, setFormData] = useState({

    });
    const dispatch = useDispatch();
    const { data: taikhoanData, isSuccess: isSuccessFetchGetAllTaiKhoan } = useQuery({
        queryKey: ['get-all-account'],
        queryFn: accountService.getAllAccount
    });



    const handleOpenDeleteModal = (id) => {
        setOpenModalDelete(id);
    };

    const handleCloseDeleteModal = () => {
        setOpenModalDelete(null);
    };




    const deleteTaiKhoanMutation = useHookMutation((id) => {
        return accountService.deleteAccount(id);
    })

    const handleDeleteTaiKhoan = (id) => {
        deleteTaiKhoanMutation.mutate(id, {
            onSuccess: () => {
                setOpenModalDelete(false);
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Xóa tài khoản thành công!"
                });
                dispatch();
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

    const handleOpenModalSuaTaiKhoan = (data) => {
        setFormData(data);

    }

    const editTaiKhoanMutation = useHookMutation((data) => {
        return accountService.updateUser(data)
    });

    const handleEditTaiKhoan = (e) => {
        e.preventDefault();
        editTaiKhoanMutation.mutate((formData), {
            onSuccess: (data) => {
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Sửa tài khoản thành công!"
                });
                dispatch(setUpdateAccount(data));
                setFormData({});
                setImgUrl(null);

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

    const handleOnChangeImage = async (e) => {
        const file = e.target.files[0];
        setImgPreview(URL.createObjectURL(file));
        const url = await getLinkImage(file);
        if (url) {
            setImgUrl(url);
            setImgPreview(null);
            setFormData({
                ...formData,
                hinh_anh: url
            });
        }

    };

    const inputImageRef = useRef(null);

    const handleClickGetImage = (e) => {
        if (inputImageRef.current) {
            inputImageRef.current.click();
        }
    };



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
                <div className="flex items-center gap-3">
                    <RiProductHuntLine size={30} />
                    <p className="text-2xl font-bold">tài khoản</p>
                </div>
                <button
                    onClick={() => {

                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-green-600 rounded-lg text-white">
                    <BiPlus size={25} />
                    Thêm tài khoản
                </button>

                {/* <Modal
                    open={false}
                    onClose={() => {
                       

                    }}
                    className="flex justify-center items-center"
                >
                   
                </Modal> */}
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
                                    {acc.isBan ? "Đã cấm" : "Bình thường"}
                                </td>
                                <td className="px-6 py-4 text-base">
                                    {acc.isAdmin ? "Admin" : "Người dùng"}
                                </td>
                                <td className="px-6 py-4 flex justify-center gap-4">
                                    <button className="px-2 py-2 rounded-full bg-green-600">
                                        <RiEditLine color="#fff" size={25} />
                                    </button>
                                    <button className="px-2 py-2 rounded-full bg-red-300">
                                        <RiDeleteBin6Line color="#fff" size={25} />
                                        <Modal

                                            className="flex justify-center items-center"
                                        >
                                            <div className="bg-white p-4 w-96 rounded-lg">
                                                <p className="text-2xl font-bold pb-5">Xác nhận xóa</p>
                                                <p>Bạn có chắc chắn muốn xóa danh mục {acc?.ten_acc} ?</p>
                                                <div className="flex gap-4">
                                                    <button className="bg-red-600 text-white p-2 rounded-lg px-7">Xóa</button>
                                                    <button className="bg-gray-300 text-white p-2 rounded-lg px-6">Hủy</button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </button>
                                </td>
                            </tr>
                        ))};
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-4 rounded-lg">
                <p className="text-2xl font-bold pb-5">
                    
                </p>
                <div className="flex gap-6">
                    <form className="flex flex-col gap-4">
                        <input name="ten_sp" onChange={handleOnChangeInput} value={formData.username} type="text" placeholder="Tên sản phẩm" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                        <input name="gia_ban" onChange={handleOnChangeInput} value={formData?.password} type="number" placeholder="Giá bán" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                        <input name="gia_nhap" onChange={handleOnChangeInput} value={formData?.isBan} type="number" placeholder="Giá bán" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                        <input name="don_vi" onChange={handleOnChangeInput} value={formData?.isAdmin} type="text" placeholder="Đơn vị" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                    </form>

                </div>
                <button className="bg-green-600 text-white float-right p-2 rounded-lg px-16 py-2 mt-5">
                    Sửa
                </button>
            </div>
            <ThongBao isOpen={thongbao.isOpen} type={thongbao.type} message={thongbao.message} />
        </div>


    );
}

export default AaccinTaiKhoanPage;