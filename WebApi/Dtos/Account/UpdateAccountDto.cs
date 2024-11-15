using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.Account
{
    public class UpdateAccountDto
    {
        public string username { get; set; }
        public string password { get; set; }
        public bool isBan { get; set; }
        public bool isAdmin { get; set; }
    }
}