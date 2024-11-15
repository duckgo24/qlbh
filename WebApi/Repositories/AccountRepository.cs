using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos.Account;
using WebApi.Dtos.Token;
using WebApi.Interfaces;
using WebApi.Mappers;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly IUser _user;
        public AccountRepository(ApplicationDbContext context, ITokenService tokenService, IUser user)
        {
            _context = context;
            _tokenService = tokenService;
            _user = user;
        }

        public async Task<List<Account>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }

        public async Task<Account> updateAccount(string id, UpdateAccountDto accountDto)
        {
            var accountModel = await _context.Accounts.FirstOrDefaultAsync(a => a.acc_id == id);
            if (accountModel == null)
            {
                return null;
            }

            accountModel.nick_name = accountDto.nick_name;
            accountModel.full_name = accountDto.full_name;
            accountModel.gioi_tinh = accountDto.gioi_tinh;
            accountModel.sdt = accountDto.sdt;
            accountModel.dia_chi = accountDto.dia_chi;
            accountModel.avatar = accountDto.avatar;
            accountModel.ngay_sinh = accountDto.ngay_sinh;
            accountModel.isAdmin = accountDto.isAdmin;

            await _context.SaveChangesAsync();
            return accountModel;
        }

        public async Task<Account> deleteAccount(string id)
        {
            var accountModel = await _context.Accounts.FirstOrDefaultAsync(a => a.acc_id == id);
            if (accountModel == null)
            {
                return null;
            }

            _context.Accounts.Remove(accountModel);
            await _context.SaveChangesAsync();
            return accountModel;
        }

        public async Task<Account> GetAccountById(string id)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.acc_id == id);
        }

        public async Task<List<object>> Login(LoginAccountDto loginAccountDto)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.username == loginAccountDto.username);
            if (account == null)
            {
                return null;
            }

            var isPasswordMatch = BCrypt.Net.BCrypt.Verify(loginAccountDto.password, account.password);
            if (!isPasswordMatch)
            {
                return null;
            }

            return new List<object>() {
                account,
                new TokenDto
                {

                    access_token = _tokenService.createToken(account),
                    refresh_token = _tokenService.createRefreshToken(account),
                },
            };
        }


        public async Task<Account> Register(CreateAccountDto createAccountDto)
        {
            var checkAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.username == createAccountDto.username);

            if (checkAccount != null)
            {
                return null;
            }

            var account = new Account
            {
                username = createAccountDto.username,
                password = BCrypt.Net.BCrypt.HashPassword(createAccountDto.password),
                nick_name = createAccountDto.nick_name,
                full_name = createAccountDto.full_name,
                gioi_tinh = createAccountDto.gioi_tinh,
                sdt = createAccountDto.sdt,
                dia_chi = createAccountDto.dia_chi,
                avatar = createAccountDto.avatar,
                ngay_sinh = createAccountDto.ngay_sinh,
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return account;
        }

        public async Task<Account> Auth()
        {
            var acc_id = _user.GetCurrentUser();

            if (acc_id != null)
            {
                var findAccount = await GetAccountById(acc_id);
                return findAccount;
            }
            return null;
        }
    }
}