using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.SanPham
{
    public class UpdateSanPhamDto
    {
        public string ten_sp { get; set; }
        public int gia_ban { get; set; }
        public int gia_nhap { get; set; }
        public string don_vi { get; set; }
        public int so_luong { get; set; }
        public string hinh_anh { get; set; }
    }
}