using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class HoaDonBan
    {
        [Key]
        public string ma_hdb { get; set; } = Guid.NewGuid().ToString();
        public DateTime ngay_tao { get; set; } = DateTime.Now;
        public int tong_tien { get; set; }
        public bool thanh_toan { get; set; }
        public string phuong_thuc_thanh_toan { get; set; }
        public string acc_id { get; set; }
        public virtual Account Account { get; set; }
        public virtual ICollection<ChiTietHoaDonBan> ChiTietHoaDonBans { get; set; }

    }
}