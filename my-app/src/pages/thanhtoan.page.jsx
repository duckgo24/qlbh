import { useQuery } from "@tanstack/react-query";
import { hoadonbanService } from "../services/HoaDonBanService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setDeleteHDBChuaThanhToanByUser, setListHDBChoThanhToanByUser, setUpdateHDBChuaThanhToan } from "../redux/slice/hoadonban.slice";
import useHookMutation from "../hooks/useHookMutation";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

import RenderWithCondition from "../components/RenderWithCondition";
import { CircularProgress } from "@mui/material";

function ThanhToanPage() {
    const { my_account } = useSelector((state) => state.account);
    const { list_product } = useSelector((state) => state.product);
    const { list_hdb_cho_thanh_toan } = useSelector((state) => state.hdb);
  
    const location = useLocation();
    const { selectedHdbIds } = location.state;
  
    const [isReqThanhToanKhac, setIsReqThanhToanKhac] = useState(false);
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState("Thanh toán khi nhận hàng");
    const [diaChi, setDiaChi] = useState(my_account.dia_chi);
    const [isThayDoiDiaChi, setIsThayDoiDiaChi] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: hdbData, isSuccess: isSuccessFetchHdbChoTT, isLoading, isError } = useQuery({
        queryKey: ['get-hdb-by-ids', selectedHdbIds],
        queryFn: async () => {
            const results = await Promise.all(
                selectedHdbIds.map(hdbId => hoadonbanService.getHDBById(hdbId))
            );
            return results;
        }
    });

    const updateHDBMutation = useHookMutation((data) => {
        return hoadonbanService.capNhatHoaDonBan(data?.ma_hdb, data);
    })

    const handleThanhToan = async () => {
        setIsLoading(true);
        for (const hdbId of selectedHdbIds) {
            const updatedData = {
                ma_hdb: hdbId,
                phuong_thuc_thanh_toan: phuongThucThanhToan,
                dia_chi: diaChi,
            };

            await updateHDBMutation.mutateAsync(updatedData, {
                onSuccess: (data) => {
                    dispatch(setDeleteHDBChuaThanhToanByUser(data))
                    dispatch(setUpdateHDBChuaThanhToan(data))
                } 
            });
        };
        setIsLoading(false);
        navigate('/don-hang');
    }

    useEffect(() => {
        if (isSuccessFetchHdbChoTT && hdbData) {
            dispatch(setListHDBChoThanhToanByUser(hdbData));
        }
    }, [isSuccessFetchHdbChoTT, hdbData, dispatch]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data.</div>;

    return (
        <div className="mt-3 relative">
            <div className=" px-3 py-4 bg-white">
                <div className="flex items-center gap-2 py-4 text-lg text-orange-500">
                    <FaLocationDot size={30} />
                    <p>Địa chỉ nhận hàng</p>
                </div>
                <div>
                    <input disabled={!isThayDoiDiaChi} onChange={(e) => setDiaChi(e.target.value)} name="dia_chi" type="text" value={diaChi} placeholder="Địa chỉ nhận hàng..." className="border border-gray-300 p-1 outline-none text-base rounded-lg" />
                    <button
                        onClick={isThayDoiDiaChi ? () => setIsThayDoiDiaChi(false) : () => setIsThayDoiDiaChi(true)}
                        className="ml-2 hover:underline hover:text-orange-500">
                        {isThayDoiDiaChi ? "Lưu" : "Thay đổi"}
                    </button>
                </div>
            </div>

            <div className="grid px-3 py-4 bg-white mt-3" style={{ gridTemplateColumns: "30% auto" }}>
                <div className="flex items-center gap-2">
                    <p className="text-lg">Sản phẩm</p>
                </div>
                <div className="grid grid-flow-col text-center">
                    <p>Số lượng</p>
                    <p>Đơn giá</p>
                    <p>Số tiền</p>
                </div>
            </div>
            <div className="border border-solid border-gray-300 bg-white mt-6">
                {list_hdb_cho_thanh_toan && list_hdb_cho_thanh_toan.length > 0 ? (
                    list_hdb_cho_thanh_toan.map((hdb) => (
                        <div key={hdb?.ma_hdb}>
                            {hdb.chiTietHoaDonBans && hdb.chiTietHoaDonBans.length > 0 ? (
                                hdb.chiTietHoaDonBans.map((cthdb) => {
                                    let _pro = list_product.find(pro => pro.ma_sp === cthdb.ma_sp);
                                    return (
                                        <div key={cthdb.ma_cthdb} className="grid px-3 py-4" style={{ gridTemplateColumns: "30% auto" }}>
                                            <div className="flex items-center gap-3">
                                                <img src={_pro?.hinh_anh} alt={_pro?.ten_sp} className="w-16 h-16" />
                                                <div>
                                                    <p>{_pro?.ten_sp}</p>
                                                    <p className="text-xs border border-solid border-red-500 text-red-500 bg-orange-100">Miễn phí đổi trả 15 ngày</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-flow-col text-center items-center">
                                                <p>{cthdb.so_luong}</p>
                                                <p>{new Intl.NumberFormat('vi-VN').format(_pro?.gia_ban)}₫</p>
                                                <p>{new Intl.NumberFormat('vi-VN').format(cthdb?.tong_tien)}₫</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Không có hóa đơn thanh toán.</p>
                            )}
                        </div>
                    ))

                ) : (
                    <p>Không có hóa đơn thanh toán.</p>
                )}
            </div>
            <div className="flex flex-col border border-solid border-gray-300 bg-white mt-6 pb-5">
                <div className="flex justify-between items-center border-b py-2 px-2 border-solid border-gray-300">
                    <p>Phương thức thanh toán</p>
                    <RenderWithCondition condition={isReqThanhToanKhac}>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    setPhuongThucThanhToan("Thanh toán khi nhận hàng");
                                    setIsReqThanhToanKhac(false);
                                }}
                                className="px-2 py-2 border border-solid rounded-lg">
                                Thanh toán khi nhận hàng
                            </button>
                            <button
                                onClick={() => {
                                    setPhuongThucThanhToan("Thanh toán qua thẻ");
                                    setIsReqThanhToanKhac(false);
                                }}
                                className="px-2 py-2 border border-solid rounded-lg">
                                Thanh toán qua thẻ
                            </button>
                            <button
                                onClick={() => {
                                    setPhuongThucThanhToan("Thanh toán qua ví điện tử");
                                    setIsReqThanhToanKhac(false);
                                }}
                                className="px-2 py-2 border border-solid rounded-lg">
                                Thanh toán qua ví điện tử
                            </button>
                        </div>
                    </RenderWithCondition>
                    <div className="text-center w-52">
                        <p>{phuongThucThanhToan}</p>
                        <button onClick={() => setIsReqThanhToanKhac(true)} className="text-orange-500 hover:underline">Thay đổi</button>
                    </div>
                </div>
                <div className="flex flex-col text-end pr-5 mt-2 border-b py-2 border-solid border-gray-300">
                    <p className="text-lg float-right">Gỉảm giá: {new Intl.NumberFormat('vi-VN').format(0)}₫</p>
                    <p className="text-lg float-right">Tổng tiền: {new Intl.NumberFormat('vi-VN').format(list_hdb_cho_thanh_toan.reduce((acc, hdb) => acc + hdb.tong_tien, 0))}₫</p>
                </div>



                <div className="py-4 px-2">
                    <button onClick={handleThanhToan} disabled={isLoading} className={`bg-orange-500 rounded-lg float-right text-white py-2 px-8  mt-2 hover:opacity-45 relative ${isLoading && 'opacity-45'}`}>
                        <p>Thanh toán</p>
                        <RenderWithCondition condition={isLoading}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <CircularProgress size={40} color="secondary" />
                            </div>
                        </RenderWithCondition>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ThanhToanPage;
