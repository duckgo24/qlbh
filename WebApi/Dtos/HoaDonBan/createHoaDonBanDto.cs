using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.ChiTietHoaDonBan;
using WebApi.Models;

namespace WebApi.Dtos.HoaDonBan
{
    public class createHoaDonBanDto
    {
        public string phuong_thuc_thanh_toan { get; set; }
        public List<createChiTietHoaDonBanDto> danh_sach_san_pham{ get; set; }
    }
}