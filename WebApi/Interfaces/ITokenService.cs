using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ITokenService
    {
        string createToken(Account account);
        string createRefreshToken(Account account);
    }
}