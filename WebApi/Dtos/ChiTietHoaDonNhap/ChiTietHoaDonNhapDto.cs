using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.ChiTietHoaDonNhap
{
    public class ChiTietHoaDonNhapDto
    {
        public string ma_cthdn { get; set; }
        public string ma_sp { get; set; }
        public int so_luong { get; set; }
        public int tong_tien { get; set; }
        public string ma_hdn { get; set; }
    }
}