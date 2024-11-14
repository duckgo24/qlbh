import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { productService } from "../services/ProductService";
import RenderWithConditon from "../components/RenderWithCondition";
import { FaCartPlus, FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import ThongBao from "../components/ThongBao";
import useHookMutation from "../hooks/useHookMutation";
import { hoadonbanService } from "../services/HoaDonBanService";

function ChiTietSanPham() {
    const location = useLocation();
    const ma_sp = location.state?.ma_sp;

    const [soLuongMua, setSoLuongMua] = useState(0);
    const [thongbao, setThongBao] = useState({
        isOpen: false,
        type: "",
        message: ""
    })

    const sanPhamMuaMutations = useHookMutation((data) => {
        return hoadonbanService.themHoaDonBan(data);
    });

    const handleClickThemVaoGioHang = () => {
        if (soLuongMua <= 0) {
            setThongBao({
                isOpen: true,
                type: "error",
                message: "Số lượng mua phải lớn hơn 0"
            })

            return;
        }

        sanPhamMuaMutations.mutate(
            {
                "phuong_thuc_thanh_toan": "Thanh toán khi nhận hàng",
                "danh_sach_san_pham": [
                    {
                        ma_sp,
                        so_luong: soLuongMua
                    }
                ]
            },
            {
                onSuccess: (data) => {
                    setThongBao({
                        isOpen: true,
                        type: "success",
                        message: "Thêm vào giỏ hàng thành công"
                    })
                    setSoLuongMua(0);
                },
                onError: (error) => {
                    setThongBao({
                        isOpen: true,
                        type: "error",
                        message: error.response.data.message
                    })
                    console.error(error);
                }
            }
        )
    };


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


    const { data: product, isPending, isSuccess: isFetchGetProductByIdSuccess, error } = useQuery({
        queryKey: ['product-by-id', ma_sp],
        queryFn: () => productService.getProductById({ ma_sp })
    })

    return (
        <div>
            {isPending && <div>Loading...</div>}
            <RenderWithConditon condition={isFetchGetProductByIdSuccess}>
                <div className="bg-white mt-5 p-4">
                    <div className="py-2 bg-slate-300 px-3 rounded-lg">{`Trang chủ > Sản phẩm > ${product?.ten_sp}`}</div>
                    <div className="flex gap-6 bg-white mt-2">
                        <img src={product?.hinh_anh} alt={product?.ten_sp} height={450} width={450} />
                        <div>
                            <p className="text-2xl">{product?.ten_sp}</p>
                            <div className="flex gap-1 items-center">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                {/* <p className="text-xs mt-1">{Math.floor(Math.random() * 100)} đã bán</p> */}
                            </div>
                            <div className="flex gap-3 mt-3">
                                <p className="text-red-600 text-xl font-bold">
                                    {product?.gia_ban && new Intl.NumberFormat('vi-VN').format(product?.gia_ban)}
                                    <sup>₫</sup>
                                </p>
                                <p className=" text-clip line-through">
                                    {product?.gia_nhap && new Intl.NumberFormat('vi-VN').format(product?.gia_nhap)}
                                    <sup>₫</sup>
                                </p>
                            </div>

                            <div className="flex gap-2 text-lg mt-3">
                                <p className="font-bold">Chinh sách hoàn trả: </p>
                                <p>Đổi trả trong 30 ngày</p>
                            </div>
                            <div className="flex gap-2 text-lg mt-3">
                                <p className="font-bold">Vận chuyển: </p>
                                <div className="flex gap-1">
                                    <img src="../images/giao_hang.webp" alt="giao_hang" className="h-6" />
                                    <p>Miễn phí giao hàng </p>
                                </div>
                            </div>
                            <div className="flex gap-2 text-lg mt-3">
                                <p className="font-bold">Số lượng hiện có:</p>
                                <p>{product?.so_luong}</p>
                            </div>
                            <div className="flex gap-2 text-lg mt-3 items-center">
                                <p>Đặt mua:</p>
                                <div className="flex items-center border border-solid ">
                                    <button className="px-3" onClick={() => setSoLuongMua(prev => prev + 1)}>
                                        <FaPlus />
                                    </button>
                                    <span className="border border-solid border-l border-r px-7 py-2">{soLuongMua}</span>
                                    <button className=" px-3" onClick={() => setSoLuongMua(prev => prev - 1)}>
                                        <FaMinus />
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-5 mt-3">
                                <button onClick={handleClickThemVaoGioHang} className="bg-red-500 text-white px-4 py-2 mt-3 flex items-center hover:bg-red-400">
                                    <FaCartPlus className="mr-2" />
                                    <p>Thêm vào giỏ hàng</p>
                                </button>
                                <button className="bg-yellow-500 text-white px-7 py-2 mt-3 hover:bg-yellow-400">Mua ngay</button>
                            </div>
                        </div>
                    </div>
                    <ThongBao isOpen={thongbao.isOpen} type={thongbao.type} message={thongbao.message} />
                </div>

            </RenderWithConditon>
        </div>
    );
}

export default ChiTietSanPham;
