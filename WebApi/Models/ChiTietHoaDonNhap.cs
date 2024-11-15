using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace WebApi.Models
{
    public class ChiTietHoaDonNhap
    {
        [Key]
        public string ma_cthdn { get; set; } = Guid.NewGuid().ToString();
        public string ma_sp { get; set; }
        public int so_luong { get; set; }
        public int tong_tien { get; set; }
        public string ma_hdn { get; set; }
        public virtual HoaDonNhap HoaDonNhap { get; set; }
        public virtual SanPham SanPham { get; set; }
    }
}
