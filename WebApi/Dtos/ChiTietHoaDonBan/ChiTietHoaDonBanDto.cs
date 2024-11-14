using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Dtos.ChiTietHoaDonBan
{
    public class ChiTietHoaDonBanDto
    {
        public string ma_cthdb { get; set; }
        public string ma_sp { get; set; }
        public int so_luong { get; set; }
        public int tong_tien { get; set; }
        public string ma_hdb { get; set; }
    }
}