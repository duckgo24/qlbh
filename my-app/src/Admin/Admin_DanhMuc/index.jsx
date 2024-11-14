

import { BiCategory, BiPlus } from "react-icons/bi";
import { RiEditLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import useHookMutation from "../../hooks/useHookMutation";
import { danhMucService } from "../../services/DanhMucSevice";
import ThongBao from "../../components/ThongBao";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setAddDanhMuc, setDanhMuc, setDeleteDanhMuc, setEditDanhMuc, } from "../../redux/slice/danhmuc.slice";

function AdminDanhMucPage() {
    const { list_danhmuc } = useSelector(state => state.danhmuc);
    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(null);

    const handleOpenDeleteModal = (id) => {
        setOpenModalDelete(id);
    };

    const handleCloseDeleteModal = () => {
        setOpenModalDelete(null);
    };
    const [thongbao, setThongBao] = useState({
        isOpen: false,
        type: "",
        message: ""
    })
    const [formData, setFormData] = useState({
    })
    const [option, setOption] = useState();

    const dispatch = useDispatch();

    const { data: danhMucData, isSuccess: isSuccessFetchGetAllDanhMuc } = useQuery({
        queryKey: ['get-all-danh-muc'],
        queryFn: danhMucService.getAllDanhMuc,
    });


    const addDanhMucMutation = useHookMutation((data) => {
        return danhMucService.createDanhMuc(data);
    });

    const handleAddDanhMuc = (e) => {
        e.preventDefault();
        if(!formData.ten_dm || !formData.mo_ta) {
            setThongBao({
                isOpen: true,
                type: "error",
                message: "Vui lòng nhập đầy đủ thông tin!"
            });
            return
        }
        addDanhMucMutation.mutate(formData, {
            onSuccess: (data) => {
                setOpenModal(false);
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Thêm danh mục thành công!"
                });
                dispatch(setAddDanhMuc(data));
                setFormData({});
                setOption("");
            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Thêm danh mục thất bại!"
                });
            }
        });
    };


    const deleteDanhMucMutation = useHookMutation((id) => {
        return danhMucService.deleteDanhMuc(id);
    })

    const handleDeleteDanhMuc = (id) => {
        deleteDanhMucMutation.mutate(id, {
            onSuccess: (data) => {
                setOpenModalDelete(false);
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Xóa danh mục thành công!"
                });
                dispatch(setDeleteDanhMuc({
                    ma_dm: id
                }));
            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Xóa danh mục thất bại!"
                });
            }
        });
    }

    const handleOpenModalSuaDanhMuc = (data) => {
        setFormData(data);
        setOption("Sua-DM");
        setOpenModal(true);
    }

    const editDanhMucMutation = useHookMutation((data) => {
        return danhMucService.updateDanhMuc(data.ma_dm, data);
    });
    
    const handleEditDanhMuc = (e) => {
        e.preventDefault();
        editDanhMucMutation.mutate((formData), {
            onSuccess: (data) => {
                setOpenModal(false);
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Sửa danh mục thành công!"
                });
                dispatch(setEditDanhMuc(data));
                setFormData({});
                setOption("");
            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Sửa danh mục thất bại!"
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
        if (isSuccessFetchGetAllDanhMuc) {
            dispatch(setDanhMuc(danhMucData));
        }
    }, [isSuccessFetchGetAllDanhMuc])

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
                    <BiCategory size={30} />
                    <p className="text-2xl font-bold">Danh mục</p>
                </div>
                <button
                    onClick={() => {
                        setOpenModal(true);
                        setOption("Them-DM");
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-green-600 rounded-lg text-white">
                    <BiPlus size={25} />
                    Thêm danh mục
                </button>

                <Modal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setOption("");
                    }}
                    className="flex justify-center items-center"
                >
                    <div className="bg-white p-4 w-96 rounded-lg">
                        <p className="text-2xl font-bold pb-5">
                            {option === "Them-DM" ? "Thêm danh mục" : "Sửa danh mục"}
                        </p>
                        <form className="flex flex-col gap-4">
                            <input name="ten_dm" onChange={handleOnChangeInput} value={formData.ten_dm} type="text" placeholder="Tên danh mục" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                            <textarea name="mo_ta" onChange={handleOnChangeInput} value={formData?.mo_ta} type="text" placeholder="Mô tả" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                            <button onClick={option === "Them-DM" ? handleAddDanhMuc : handleEditDanhMuc} className="bg-green-600 text-white p-2 rounded-lg">
                                {option === "Them-DM" ? "Thêm" : "Sửa"}
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-sm">
                            <td scope="col" className="px-6 py-3">
                                Mã danh mục
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Tên danh mục
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Mô tả
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Thao tác
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {list_danhmuc && list_danhmuc.length > 0 && list_danhmuc.map((dm) => (
                            <tr key={dm?.ma_dm} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                    {dm?.ma_dm}
                                </td>
                                <td className="px-6 py-4 ">
                                    {dm?.ten_dm}
                                </td>
                                <td className="px-6 py-4 text-base">
                                    {dm.mo_ta}
                                </td>
                                <td className="px-6 py-4 flex justify-center gap-4">
                                    <button onClick={() => handleOpenModalSuaDanhMuc(dm)} className="px-2 py-2 rounded-full bg-green-600">
                                        <RiEditLine color="#fff" size={25} />
                                    </button>
                                    <button onClick={() => handleOpenDeleteModal(dm?.ma_dm)} className="px-2 py-2 rounded-full bg-red-300">
                                        <MdDeleteOutline color="#000" size={25} />
                                        <Modal
                                            open={openModalDelete === dm?.ma_dm}
                                            onClose={handleCloseDeleteModal}
                                            className="flex justify-center items-center"
                                        >
                                            <div className="bg-white p-4 w-96 rounded-lg">
                                                <p className="text-2xl font-bold pb-5">Xác nhận xóa</p>
                                                <p>Bạn có chắc chắn muốn xóa danh mục {dm?.ten_dm} ?</p>
                                                <div className="flex gap-4">
                                                    <button onClick={() => handleDeleteDanhMuc(dm?.ma_dm)} className="bg-red-600 text-white p-2 rounded-lg px-7">Xóa</button>
                                                    <button onClick={handleCloseDeleteModal} className="bg-gray-300 text-white p-2 rounded-lg px-6">Hủy</button>
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
            <ThongBao isOpen={thongbao.isOpen} type={thongbao.type} message={thongbao.message} />
        </div>


    );
}

export default AdminDanhMucPage;

