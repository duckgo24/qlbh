using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.ChiTietHoaDonNhap;

namespace WebApi.Dtos.HoaDonNhap
{
    public class createHoaDonNhapDto
    {
        public bool thanh_toan { get; set; }
        public string phuong_thuc_thanh_toan { get; set; }
        public List<createChiTietHoaDonNhapDto> danh_sach_san_pham{ get; set; }

    }
}