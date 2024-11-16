import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



export default function AdminPage() {

    const { list_product } = useSelector(state => state.product);
    const { list_danhmuc } = useSelector(state => state.danhmuc);
    const { list_hdb } = useSelector(state => state.hdb);
    const { list_hdn } = useSelector(state => state.hdn);
    const { list_account } = useSelector(state => state.account);
    


    return (
        <div className="grid grid-cols-4 gap-2 px-4 py-5">
            <div className="bg-blue-400 text-white pt-4">
                <p className="text-4xl px-4 py-2 font-bold">{list_account.length || 0}</p>
                <p className="px-4 text-xl pb-4">Tài khoản</p>
                <Link to={"/admin/tai-khoan"} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                }} className="w-full block pl-2">
                    {"Xem chi tiết -->"}
                </Link>
            </div>
            <div className="bg-green-400 text-white pt-4">
                <p className="text-4xl px-4 py-2 font-bold">{list_danhmuc.length || 0}</p>
                <p className="px-4 text-xl pb-4">Danh mục sản phẩm</p>
                <Link to={"/admin/danh-muc"} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                }} className="w-full block pl-2">
                    {"Xem chi tiết -->"}
                </Link>
            </div>
            <div className="bg-orange-400 text-white pt-4">
                <p className="text-4xl px-4 py-2 font-bold">{list_product.length || 0}</p>
                <p className="px-4 text-xl pb-4">Sản phẩm</p>
                <Link to={"/admin/san-pham"} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                }} className="w-full block pl-2">
                    {"Xem chi tiết -->"}
                </Link>
            </div>

            <div className="bg-violet-500 text-white pt-4">
                <p className="text-4xl px-4 py-2 font-bold">{list_hdb.length || 0}</p>
                <p className="px-4 text-xl pb-4">Hóa đơn bán</p>
                <Link to={"/admin/hoa-don-ban"} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                }} className="w-full block pl-2">
                    {"Xem chi tiết -->"}
                </Link>
            </div>

            <div className="bg-red-400 text-white pt-4">
                <p className="text-4xl px-4 py-2 font-bold">{list_hdb.length || 0}</p>
                <p className="px-4 text-xl pb-4">Hóa đơn nhập</p>
                <Link to={"/admin/hoa-don-nhap"} style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                }} className="w-full block pl-2">
                    {"Xem chi tiết -->"}
                </Link>
            </div>
        </div>
    )
}