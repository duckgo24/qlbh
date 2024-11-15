using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.Account
{
    public class AccountDto
    {
        public string acc_id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string nick_name { get; set; }
        public string full_name { get; set; }
        public string gioi_tinh { get; set; }
        public string sdt { get; set; }
        public string dia_chi { get; set; }
        public string avatar { get; set; }
        public DateTime ngay_sinh { get; set; }
        public bool isAdmin { get; set; }
    }
}