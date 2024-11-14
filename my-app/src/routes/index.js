import AdminPage from "../Admin";
import AdminDanhMucPage from "../Admin/Admin_DanhMuc";
import AdminHoaDonBanPage from "../Admin/Admin_HoaDonBan";
import AdminHoaDonNhapPage from "../Admin/Admin_HoaDonNhap";
import AdminSanPhamPage from "../Admin/Admin_SanPham";
import AdminTaiKhoanPage from "../Admin/Admin_TaiKhoan";
import ChiTietSanPham from "../pages/chitietsanpham.page";
import DanhMucPage from "../pages/danhmuc.page";
import GioHang from "../pages/giohang.page";
import Home from "../pages/home";
import ThanhToanPage from "../pages/thanhtoan.page";
import ThongTinNguoiDung from "../pages/thongtinnguoidung.page";

export const appRoutes = [
    {
        path: '/',
        component: Home,
        isLayout: true,
    },
    {
        path: '/danh-muc',
        component: DanhMucPage,
        isLayout: true,
    },
    {
        path: '/san-pham/:ma_sp',
        component: ChiTietSanPham,
        isLayout: true,
    },
    {
        path: '/thong-tin-nguoi-dung',
        component: ThongTinNguoiDung,
        isLayout: true,
    },
    {
        path: '/gio-hang',
        component: GioHang,
        isLayout: true,
    },
    {
        path: '/thanh-toan',
        component: ThanhToanPage,
        isLayout: true,
    },

    //Route admin
    {
        path:'/admin',
        component: AdminPage,
        isLayout: false
    },
    {
        path:'/admin/danh-muc',
        component: AdminDanhMucPage,
        isLayout: false,
    },
    {
        path: '/admin/san-pham',
        component: AdminSanPhamPage,
        isLayout: false,
    },
    {
        path: '/admin/tai-khoan',
        component: AdminTaiKhoanPage,
        isLayout: false,
    },
    {
        path: '/admin/hoa-don-ban',
        component: AdminHoaDonBanPage,
        isLayout: false,
    },
    {
        path: '/admin/hoa-don-nhap',
        component: AdminHoaDonNhapPage,
        isLayout: false,
    }
]