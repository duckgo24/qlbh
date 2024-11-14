using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.SanPham
{
    public class SanPhamDto
    {
        public string ma_sp { get; set; }
        public string ten_sp { get; set; }
        public int gia_ban { get; set; }
        public int gia_nhap { get; set; }
        public string don_vi { get; set; }
        public int so_luong { get; set; }
        public string hinh_anh { get; set; }
        public DateTime created_date { get; set; }
        public string ma_dm { get; set; }
        public string created_by { get; set; }
    }
}