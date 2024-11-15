using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.Account;
using WebApi.Dtos.Token;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IAccountRepository
    {
        Task<List<Account>> GetAccounts();
        Task<Account> updateAccount(string id, UpdateAccountDto updateAccountDto);
        Task<Account> updateInfoUser(string id, UpdateUserDto updateUserDto);
        Task<Account> deleteAccount(string id);

        Task<Account> GetAccountById(string id);
        Task<List<object>> Login(LoginAccountDto loginAccountDto);
        Task<Account> Register(CreateAccountDto createAccountDto);
        Task<Account> Auth();
    }
}