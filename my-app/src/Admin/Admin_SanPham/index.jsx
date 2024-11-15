import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { RiDeleteBin6Line, RiEditLine, RiProductHuntLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";


import useHookMutation from "../../hooks/useHookMutation";
import { productService } from "../../services/ProductService";

import ThongBao from "../../components/ThongBao";

import { setAddProduct, setDeleteProduct, setListProduct, setUpdateProduct } from "../../redux/slice/product.slice";
import { BiPlus } from "react-icons/bi";
import getLinkImage from "../../utils/getLinkImage";




function AdminSanPhamPage() {
    const { list_product } = useSelector(state => state.product);
    const { list_danhmuc } = useSelector(state => state.danhmuc);
    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [thongbao, setThongBao] = useState({
        isOpen: false,
        type: "",
        message: ""
    })
    const [formData, setFormData] = useState({
        ma_dm: '',
        ten_sp: '',
        gia_ban: '',
        gia_nhap: '',
        don_vi: '',
        so_luong: '',
        hinh_anh: ''
    });
    const [option, setOption] = useState();
    const dispatch = useDispatch();
    const { data: sanPhamData, isSuccess: isSuccessFetchGetAllSanPham } = useQuery({
        queryKey: ['get-all-san-pham'],
        queryFn: productService.getAllProduct
    });

    //Thêm sản phẩm
    const addSanPhamMutation = useHookMutation((data) => {
        return productService.createProduct(data);
    });



    const handleAddSanPham = (e) => {
        e.preventDefault();
        if (!formData.ma_dm || !formData.ten_sp || !formData.gia_ban || !formData.gia_nhap || !formData.don_vi || !formData.so_luong || !formData.hinh_anh) {
            setThongBao({
                isOpen: true,
                type: "error",
                message: "Vui lòng nhập đầy đủ thông tin!"
            });
            return;
        }

        addSanPhamMutation.mutate(formData, {
            onSuccess: (data) => {
                setOpenModal(false);
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Thêm sản phẩm thành công!"
                });
                dispatch(setAddProduct(data));
                setFormData({});
                setImgUrl(null);
                setOption("");
            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Thêm sản phẩm thất bại!"
                });
            }
        });
    };


    //Xóa sản phẩm
    const handleOpenModalDeleteSanPham = (data) => {
        setOpenModalDelete(true);
        setFormData(data);
    };


    const deletesanPhamMutation = useHookMutation((id) => {
        return productService.deleteProduct(id);
    })

    const handleDeleteSanPham = (id) => {
        deletesanPhamMutation.mutate(id, {
            onSuccess: () => {
                setOpenModalDelete(false);
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Xóa sản phẩm thành công!"
                });
                dispatch(setDeleteProduct({
                    ma_sp: id
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

    //Sửa sản phẩm
    const handleOpenModalSuaSanPham = (data) => {
        setFormData(data);
        setOption("Sua-SP");
        setOpenModal(true);
    }

    const editSanPhamMutation = useHookMutation((data) => {
        return productService.updateProduct(data.ma_sp, data);
    });

    const handleEditSanPham = (e) => {
        e.preventDefault();
        editSanPhamMutation.mutate((formData), {
            onSuccess: (data) => {
                setOpenModal(false);
                setThongBao({
                    isOpen: true,
                    type: "success",
                    message: "Sửa sản phẩm thành công!"
                });
                dispatch(setUpdateProduct(data));
                setFormData({});
                setImgUrl(null);
                setOption("");
            },
            onError: (err) => {
                setThongBao({
                    isOpen: true,
                    type: "error",
                    message: "Sửa sản phẩm thất bại!"
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
        if (isSuccessFetchGetAllSanPham) {
            dispatch(setListProduct(sanPhamData));
        }
    }, [isSuccessFetchGetAllSanPham])

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

    useEffect(() => {
        if (list_danhmuc?.length > 0 && !formData.ma_dm) {
            setFormData((prevData) => ({ ...prevData, ma_dm: list_danhmuc[0].ma_dm }));
        }
    }, [list_danhmuc]);




    return (
        <div className='bg-white px-4 py-5 h-full'>
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <RiProductHuntLine size={30} />
                    <p className="text-2xl font-bold">Sản phẩm</p>
                </div>
                <button
                    onClick={() => {
                        setOpenModal(true);
                        setOption("Them-SP");
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-green-600 rounded-lg text-white">
                    <BiPlus size={25} />
                    Thêm sản phẩm
                </button>

                <Modal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setOption("");
                        setFormData({});
                    }}
                    className="flex justify-center items-center"
                >
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-2xl font-bold pb-5">
                            {option === "Them-SP" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                        </p>
                        <div className="flex gap-6">
                            <form className="flex flex-col gap-4">
                                <select
                                    name="ma_dm"
                                    onChange={handleOnChangeInput}
                                    value={formData?.ma_dm || ""}
                                    className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl"
                                >
                                    {list_danhmuc?.map((item) => (
                                        <option key={item.ma_dm} value={item.ma_dm}>
                                            {item.ten_dm}
                                        </option>
                                    ))}
                                </select>

                                <input name="ten_sp" onChange={handleOnChangeInput} value={formData.ten_sp} type="text" placeholder="Tên sản phẩm" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                                <input name="gia_ban" onChange={handleOnChangeInput} value={formData?.gia_ban} type="number" placeholder="Giá bán" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                                <input name="gia_nhap" onChange={handleOnChangeInput} value={formData?.gia_nhap} type="number" placeholder="Giá bán" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                                <input name="don_vi" onChange={handleOnChangeInput} value={formData?.don_vi} type="text" placeholder="Đơn vị" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />
                                <input name="so_luong" onChange={handleOnChangeInput} value={formData?.so_luong} type="number" placeholder="Số lượng" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl" />

                            </form>
                            <div className="flex flex-col">
                                <input
                                    ref={inputImageRef}
                                    name="hinh_anh"
                                    onChange={handleOnChangeImage}
                                    type="file"
                                    className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl"
                                    style={{ display: "none" }}
                                />

                                {imgUrl && <img src={imgUrl} alt="hinh_anh_sp" style={{ height: "20rem" }} />}
                                {imgPreview && <img src={imgPreview} alt="hinh_anh_sp" style={{ height: "20rem", filter: "blur(4px)" }} />}
                                {formData.hinh_anh && option !== "Them-SP" && <img src={formData.hinh_anh} alt="hinh_anh_sp" style={{ height: "20rem" }} />}
                                {!imgUrl && !imgPreview && !formData?.hinh_anh && <AiOutlinePicture size={300} />}

                                <button onClick={handleClickGetImage} className="py-2 px-2 mt-2 bg-slate-100">Chọn hình ảnh</button>
                            </div>
                        </div>
                        <button onClick={option === "Them-SP" ? handleAddSanPham : handleEditSanPham} className="bg-green-600 text-white float-right p-2 rounded-lg px-16 py-2 mt-5">
                            {option === "Them-SP" ? "Thêm" : "Sửa"}
                        </button>
                    </div>
                </Modal>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-sm">
                            <td scope="col" className="px-6 py-3">
                                Mã sản phẩm
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Tên sản phẩm
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Giá bán
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Giá nhập
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Đơn vị
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Hình ảnh
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Số lượng
                            </td>
                            <td scope="col" className="px-6 py-3">
                                Mã danh mục
                            </td>
                            <td scope="col" className="px-6 py-3 text-center">
                                Thao tác
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {list_product && list_product.length > 0 && list_product.map((product) => (
                            <tr key={product?.ma_sp} className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                    {product?.ma_sp}
                                </td>
                                <td className="px-6 py-4">
                                    {product?.ten_sp}
                                </td>
                                <td className="px-6 py-4">
                                    {product?.gia_ban}
                                </td>
                                <td className="px-6 py-4">
                                    {product?.gia_nhap}
                                </td>
                                <td className="px-6 py-4">
                                    {product?.don_vi}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={product?.hinh_anh} alt={product?.ten_sp} className="h-20 w-20" />
                                </td>
                                <td className="px-6 py-4">
                                    {product?.so_luong}
                                </td>
                                <td className="px-6 py-4">
                                    {product?.ma_dm}
                                </td>
                                <td className="px-6 py-4 flex justify-center gap-4">
                                    <button onClick={() => handleOpenModalSuaSanPham(product)} className="px-2 py-2 rounded-full bg-green-600">
                                        <RiEditLine color="#fff" size={25} />
                                    </button>
                                    <button onClick={() => handleOpenModalDeleteSanPham(product)} className="px-2 py-2 rounded-full bg-red-300">
                                        <RiDeleteBin6Line color="#fff" size={25} />
                                    </button>
                                </td>
                            </tr>
                        ))};
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
                    <p>Bạn có chắc chắn muốn xóa sản phẩm {formData?.ten_sp} ?</p>
                    <div className="flex gap-4">
                        <button onClick={() => handleDeleteSanPham(formData?.ma_sp)} className="bg-red-600 text-white p-2 rounded-lg px-7">Xóa</button>
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
            <ThongBao isOpen={thongbao.isOpen} type={thongbao.type} message={thongbao.message} />
        </div>


    );
}

export default AdminSanPhamPage;