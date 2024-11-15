using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class DanhMuc
    {
        [Key]
        public string ma_dm { get; set; } = Guid.NewGuid().ToString();
        public string ten_dm { get; set; }
        public string mo_ta { get; set; }
        public DateTime created_date { get; set; } = DateTime.Now;
        public string created_by { get; set; } 
        public virtual ICollection<SanPham> SanPhams { get; set; }
        public Account User { get; set; }  


    }
}