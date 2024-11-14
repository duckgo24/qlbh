using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.ChiTietHoaDonNhap
{
    public class ChiTietHoaDonNhapDto
    {
        public string ma_cthdb { get; set; }
        public string ma_sp { get; set; }
        public int so_luong { get; set; }
        public int tong_tien { get; set; }
        public string ma_hdb { get; set; }
    }
}