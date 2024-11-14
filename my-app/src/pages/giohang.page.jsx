import { useQuery } from "@tanstack/react-query";
import { hoadonbanService } from "../services/HoaDonBanService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setDeleteHDBChuaThanhToanByUser, setListHDBChuaThanhToanByUser } from "../redux/slice/hoadonban.slice";
import useHookMutation from "../hooks/useHookMutation";
import { useNavigate } from "react-router-dom";

function GioHang() {
    const { my_account } = useSelector((state) => state.account);
    const { list_product } = useSelector((state) => state.product);
    const { hdb_chua_thanh_toan_by_user } = useSelector((state) => state.hdb);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState([]);

    const { data: hdbChuaTTData, isSuccess: isSuccessFetchHdbChuaTT, isLoading, isError } = useQuery({
        queryKey: ['get-hdb-chua-thanh-toan'],
        queryFn: () => hoadonbanService.layDanhSachHoaDonChuaThanhToanByUser({ userId: my_account.acc_id })
    });

    useEffect(() => {
        if (isSuccessFetchHdbChuaTT) {
            dispatch(setListHDBChuaThanhToanByUser(hdbChuaTTData));
        }
    }, [isSuccessFetchHdbChuaTT]);


    const handleCheckboxChange = (hdbId, cthdbId, price, quantity) => {
        setSelectedItems((prevSelectedItems) => {
            const existingItemIndex = prevSelectedItems.findIndex(
                (item) => item.hdbId === hdbId && item.cthdbId === cthdbId
            );
            if (existingItemIndex > -1) {
                return prevSelectedItems.filter(
                    (item) => item.hdbId !== hdbId || item.cthdbId !== cthdbId
                );
            } else {
                return [
                    ...prevSelectedItems,
                    { hdbId, cthdbId, price, quantity }
                ];
            }
        });
    };

    const calculateTotal = () => {
        return selectedItems.reduce(
            (total, item) => {
                total.amount += item.price * item.quantity;
                total.quantity += item.quantity;
                return total;
            },
            { amount: 0, quantity: 0 }
        );
    };

    const { amount, quantity } = calculateTotal();

    const deleteHdbMutation = useHookMutation((id) => {
        return hoadonbanService.xoaHoaDonBan(id);
    });

    const handleDeleteHDB = async (id) => {
        deleteHdbMutation.mutate(id, {
            onSuccess: () => {
                dispatch(setDeleteHDBChuaThanhToanByUser({
                    ma_hdb: id
                }));
            }
        });
    };

    const handleClickMuaHang = () => {
        const selectedHdbIds = selectedItems.map(item => item.hdbId);

        navigate('/thanh-toan', {
            state: {
                selectedHdbIds, 
            }
        });
    };
    

    return (
        <div className=" mt-3">
            <div className="grid px-3 py-4 bg-white" style={{ gridTemplateColumns: "30% auto" }}>
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-6 w-6" />
                    <p className="text-lg">Sản phẩm</p>
                </div>
                <div className="grid grid-flow-col text-center">
                    <p>Số lượng</p>
                    <p>Đơn giá</p>
                    <p>Số tiền</p>
                    <p>Thao tác</p>
                </div>
            </div>
            <div className="border border-solid border-gray-300 bg-white mt-6">
                {hdb_chua_thanh_toan_by_user && hdb_chua_thanh_toan_by_user.map((hdb) => (
                    <div key={hdb?.ma_hdb}>
                        {hdb.chiTietHoaDonBans && hdb.chiTietHoaDonBans.map((cthdb) => {
                            let _pro = list_product.find(pro => pro.ma_sp === cthdb.ma_sp);
                            return (
                                <div key={cthdb.ma_cthdb} className="grid px-3 py-4" style={{ gridTemplateColumns: "30% auto" }}>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4"
                                            onChange={() => handleCheckboxChange(hdb.ma_hdb, cthdb.cthdbId, _pro?.gia_ban, cthdb.so_luong)}
                                        />
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
                                        <button onClick={() => handleDeleteHDB(hdb?.ma_hdb)} className="text-red-500 hover:underline">Xóa</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="flex justify-between p-4  border border-solid border-gray-300 bg-white mt-6">
                <div className="flex items-center">
                    <input type="checkbox" />
                    <p className="ml-2">Chọn tất cả</p>
                    <button className="ml-4 text-orange-500 hover:underline">Xóa</button>
                </div>
                <div className="text-right flex gap-5 items-center">
                    <p>Tổng thanh toán:</p>
                    <p className="text-clip text-orange-500">
                        {new Intl.NumberFormat('vi-VN').format(amount)}<sup>₫</sup>
                    </p>
                    <p>({quantity} sản phẩm)</p>
                    <button onClick={handleClickMuaHang} className="bg-orange-500 text-white px-4 py-2">Mua hàng</button>
                </div>
            </div>
        </div>
    );
}

export default GioHang;
