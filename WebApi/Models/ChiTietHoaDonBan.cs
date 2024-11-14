using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class ChiTietHoaDonBan
    {
        [Key]
        public string ma_cthdb { get; set; } = Guid.NewGuid().ToString();
        public string ma_sp { get; set; }
        public int so_luong { get; set; }
        public int tong_tien { get; set; }
        public string ma_hdb { get; set; }
        public virtual HoaDonBan HoaDonBan { get; set; }
        public virtual SanPham SanPham { get; set; }
    }
}