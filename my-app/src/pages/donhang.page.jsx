import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { hoadonbanService } from '../services/HoaDonBanService';
import RenderWithCondition from '../components/RenderWithCondition';
import { Link } from 'react-router-dom';

export default function DonHangPage() {
    const [data, setData] = useState([]);
    const { list_product } = useSelector(state => state.product);
    const { my_account } = useSelector((state) => state.account);
    const [activeBtn, setBtnActive] = useState(0);

    const {
        data: hdbDaThanhToanData,
        isError: isErrorFetchGetHdbDaThanhToan,
        isSuccess: isSuccessFetchGetHdbDaThanhToan,
        isLoading: isLoadingFetchGetHdbDaThanhToan
    } = useQuery({
        queryKey: ["get-hdb-da-tt-by-user"],
        queryFn: () => hoadonbanService.layDanhSachHoaDonDaThanhToanByUser({ userId: my_account.acc_id })
    });

    const {
        data: hdbChuaThanhToanData,
        isError: isErrorFetchGetHdbChuaThanhToan,
        isSuccess: isSuccessFetchGetHdbChuaThanhToan,
        isLoading: isLoadingFetchGetHdbChuaThanhToan
    } = useQuery({
        queryKey: ["get-hdb-chua-tt-by-user"],
        queryFn: () => hoadonbanService.layDanhSachHoaDonChuaThanhToanByUser({ userId: my_account.acc_id })
    });

    useEffect(() => {
        if (isSuccessFetchGetHdbChuaThanhToan) {
            setData(hdbChuaThanhToanData);
        }
    }, [isErrorFetchGetHdbChuaThanhToan])




    const handleButtonClick = (index) => {
        setBtnActive(index);
        if (index === 0) {
            setData(hdbDaThanhToanData);
        }
        if (index === 1) {
            setData(hdbChuaThanhToanData);
        }
    };

    return (
        <div className="mt-2 bg-white min-h-96">
            <div className=" grid grid-cols-6 bg-slate-100">
                <button
                    onClick={() => handleButtonClick(0)}
                    className={`border-t-0 border-l-0 border-r-0 py-2 ${activeBtn === 0 ? 'border-orange-500 border-b-2 border-solid' : ''}`}
                >
                    Đã mua
                </button>
                <button
                    onClick={() => handleButtonClick(1)}
                    className={`border-t-0 border-l-0 border-r-0 py-2 ${activeBtn === 1 ? 'border-orange-500 border-b-2 border-solid' : ''}`}
                >
                    Chờ thanh toán
                </button>
                <button
                    onClick={() => handleButtonClick(2)}
                    className={`border-t-0 border-l-0 border-r-0 py-2 ${activeBtn === 2 ? 'border-orange-500 border-b-2 border-solid' : ''}`}
                >
                    Vận chuyển
                </button>
                <button
                    onClick={() => handleButtonClick(3)}
                    className={`border-t-0 border-l-0 border-r-0 py-2 ${activeBtn === 3 ? 'border-orange-500 border-b-2 border-solid' : ''}`}
                >
                    Đã nhận
                </button>
                <button
                    onClick={() => handleButtonClick(4)}
                    className={`border-t-0 border-l-0 border-r-0 py-2 ${activeBtn === 4 ? 'border-orange-500 border-b-2 border-solid' : ''}`}
                >
                    Đã hủy
                </button>
                <button
                    onClick={() => handleButtonClick(5)}
                    className={`border-t-0 border-l-0 border-r-0 py-2 ${activeBtn === 5 ? 'border-orange-500 border-b-2 border-solid' : ''}`}
                >
                    Trả hàng/Hoàn tiền
                </button>
            </div>
            <div>
                <RenderWithCondition condition={!data || data.length === 0}>
                    <p>Hiện chưa có đơn hàng nào? Mua ngày thôi nào
                        <Link to="/" className="text-blue-500 hover:underline">Tại đây</Link>
                    </p>
                </RenderWithCondition>


                <RenderWithCondition condition={data && data.length > 0}>
                    {/* <div className="grid px-3 bg-gray-300" style={{ gridTemplateColumns: "30% auto" }}>
                        <p className="text-lg text-center">Sản phẩm</p>
                        <div className="grid grid-flow-col text-center">
                            <p>Số lượng</p>
                            <p>Đơn giá</p>
                            <p>Số tiền</p>
                        </div>
                    </div> */}
                    <div className=" bg-white">
                        {data && data.map((hdb) => (
                            <div className='border border-solid border-gray-500 mt-2 px-2 py-2 rounded-lg' key={hdb?.ma_hdb}>
                                {hdb.chiTietHoaDonBans && hdb.chiTietHoaDonBans.map((cthdb) => {
                                    let _pro = list_product.find(pro => pro.ma_sp === cthdb.ma_sp);
                                    return (
                                        <div key={cthdb.ma_cthdb} className="grid px-3 py-4 border border-solid border-gray-300 bg-gray-200" style={{ gridTemplateColumns: "30% auto" }}>
                                            <div className="flex items-center gap-3 px-3">
                                                <img src={_pro?.hinh_anh} alt={_pro?.ten_sp} className="w-24 h-24" />
                                                <div className='flex flex-col gap-1'>
                                                    <p>{_pro?.ten_sp}</p>
                                                    <p className="text-xs border border-solid border-red-500 text-red-500 bg-orange-100">Miễn phí đổi trả 15 ngày</p>
                                                    <img src="../images/back.jpg" alt="back" width={150} height={15} />
                                                </div>
                                            </div>
                                            <div className="grid grid-flow-col text-center items-center">
                                                <p>Số lượng :
                                                    <span className='text-orange-500 px-2'>
                                                        {cthdb.so_luong}
                                                    </span>
                                                </p>
                                                <p>Giá bán:
                                                    <span className='text-orange-500 px-2'>
                                                        {new Intl.NumberFormat('vi-VN').format(_pro?.gia_ban)}₫
                                                    </span>
                                                </p>
                                                <p>Tổng tiền:
                                                    <span className='text-orange-500 px-2'>
                                                        {new Intl.NumberFormat('vi-VN').format(cthdb?.tong_tien)}₫
                                                    </span>
                                                </p>
                                            </div>

                                        </div>
                                    );
                                })}
                                <div className='flex items-center gap-1 bg-white px-3 pt-2'>
                                    <img src="../images/free-ship.png" alt="giao_hang" className="h-6" />
                                    <p className='text-sm text-green-900'>
                                        {activeBtn === 0 ? 'Đặt hàng thành công' : 'giao hàng miễn phí'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RenderWithCondition>
            </div>
        </div>
    );
}
