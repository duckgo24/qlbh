import { FaStar } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";

function Product({ product }) {

    const navigate = useNavigate();

    const handleClickSanPham = () => {
        navigate(`/san-pham/${product?.ma_sp}`, {
            state: {
                ma_sp: product?.ma_sp
            }
        });
    }


    return (
        <div onClick={handleClickSanPham} className="product flex flex-col border border-solid border-gray-200 bg-white hover:border-red-400 cursor-pointer w-full max-w-60">
            <img src={product?.hinh_anh} alt={product?.ten_sp} className="w-full h-44" />
            <div className="px-2 flex flex-col gap-1">
                <p style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '48px'
                }}>
                    {product?.ten_sp}
                </p>
                <div className="flex gap-1 items-center">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <p className="text-xs mt-1">{Math.floor(Math.random() * 100)} đã bán</p>
                </div>
                <p className="text-start">{product?.mo_ta}</p>
                <p className="text-red-600">
                    {product?.gia_ban && new Intl.NumberFormat('vi-VN').format(product?.gia_ban)}
                    <sup>₫</sup>
                </p>
                <p className="text-sm text-end">Hiện có {product?.so_luong} có sẵn</p>
            </div>
        </div>
    );
}

export default Product;