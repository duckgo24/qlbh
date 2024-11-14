using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.ChiTietHoaDonNhap;
using WebApi.Models;

namespace WebApi.Dtos.HoaDonNhap
{
    public class HoaDonNhapDto
    {
        public string ma_hdn { get; set; }
        public DateTime ngay_tao { get; set; }
        public int tong_tien { get; set; }
        public bool thanh_toan { get; set; }
        public string phuong_thuc_thanh_toan { get; set; }
        public string acc_id { get; set; }
        public List<ChiTietHoaDonNhapDto> chiTietHoaDonNhaps { get; set; }

    }
}