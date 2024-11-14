using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.DanhMuc
{
    public class DanhMucDto
    {
        public string ma_dm { get; set; }
        public string ten_dm { get; set; }
        public string mo_ta { get; set; }
        public DateTime created_date { get; set; }
        public string created_by { get; set; }
    }
}