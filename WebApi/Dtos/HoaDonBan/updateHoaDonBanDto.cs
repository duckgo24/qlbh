using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.ChiTietHoaDonBan;
using WebApi.Models;

namespace WebApi.Dtos.HoaDonBan
{
    public class updateHoaDonBanDto
    {
        public bool thanh_toan { get; set; }
        public string phuong_thuc_thanh_toan { get; set; }
    }
}