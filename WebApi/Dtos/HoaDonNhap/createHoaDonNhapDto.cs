using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.ChiTietHoaDonNhap;
using WebApi.Models;

namespace WebApi.Dtos.HoaDonNhap
{
    public class createHoaDonNhapDto
    {
        public bool thanh_toan { get; set; }
        public string phuong_thuc_thanh_toan { get; set; }
        public List<createChiTietHoaDonNhapDto> chiTietHoaDonNhapDtos { get; set; }
    }
}