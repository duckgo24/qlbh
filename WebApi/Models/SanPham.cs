using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class SanPham
    {
        [Key]
        public string ma_sp { get; set; } = Guid.NewGuid().ToString();
        public string ten_sp { get; set; }
        public int gia_ban { get; set; }
        public int gia_nhap { get; set; }
        public string don_vi { get; set; }
        public int so_luong { get; set; }
        public string hinh_anh { get; set; }
        public DateTime created_date { get; set; } = DateTime.Now;
        public string ma_dm { get; set; }
        public string created_by { get; set; }
        public virtual DanhMuc DanhMuc { get; set; }
        public virtual Account User { get; set; }
        public virtual ICollection<ChiTietHoaDonBan> ChiTietHoaDonBans { get; set; }
        public virtual ICollection<ChiTietHoaDonNhap> ChiTietHoaDonNhaps { get; set; }

    }
}