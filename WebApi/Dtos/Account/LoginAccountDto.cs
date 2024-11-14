using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.Account
{
    public class LoginAccountDto
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}