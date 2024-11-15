using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Account
    {
        [Key]
        public string acc_id { get; set; } = Guid.NewGuid().ToString();

        public string username { get; set; }
        public string password { get; set; }
        public string nick_name { get; set; }
        public string full_name { get; set; }
        public string gioi_tinh { get; set; }
        public string sdt { get; set; }
        public string dia_chi { get; set; }
        public string avatar { get; set; }
        public DateTime ngay_sinh { get; set; }
        public bool isBan { get; set; } = false;

        public bool isAdmin { get; set; } = false;

        public virtual ICollection<DanhMuc> DanhMucs { get; set; }
        public virtual ICollection<SanPham> SanPhams { get; set; }
        public virtual ICollection<HoaDonNhap> HoaDonNhaps { get; set; }
        public virtual ICollection<HoaDonBan> HoaDonBans { get; set; }
    }

}
