using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BCrypt.Net;
using WebApi.Data;
using WebApi.Dtos.Account;
using WebApi.Mappers;
using WebApi.Models;
using Microsoft.EntityFrameworkCore;
using WebApi.Repositories;
using WebApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using WebApi.Dtos.Token;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IMapper _mapper;
        public IAccountRepository _accountRepository { get; set; }

        public AccountController(ILogger<AccountController> logger, IAccountRepository accountRepository, IMapper mapper)
        {
            _logger = logger;
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll()
        {

            List<Account> accounts = await _accountRepository.GetAccounts();
            return Ok(_mapper.Map<List<AccountDto>>(accounts));
        }

        [HttpPut("update-user/{id}")]
        public async Task<IActionResult> updateUser([FromRoute] string id, [FromBody] UpdateUserDto updateUserDto)
        {

            var accountModel = await _accountRepository.updateInfoUser(id, updateUserDto);

            if (accountModel == null)
            {
                return NotFound("Account not found");
            }
            return Ok(new { message = "Account updated", account = _mapper.Map<AccountDto>(accountModel) });
        }

        
        [HttpPut("update/{id}")]
        public async Task<IActionResult> updateAccount([FromRoute] string id, [FromBody] UpdateAccountDto updateAccountDto)
        {

            var accountModel = await _accountRepository.updateAccount(id, updateAccountDto);

            if (accountModel == null)
            {
                return NotFound("Account not found");
            }
            return Ok(new { message = "Account updated", account = _mapper.Map<AccountDto>(accountModel) });
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> delete([FromRoute] string id)
        {
            var accountModel = await _accountRepository.deleteAccount(id);

            if (accountModel == null)
            {
                return NotFound("Account not found");
            }

            return Ok(new { message = "Account deleted", account = _mapper.Map<AccountDto>(accountModel) });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginAccountDto accountDto)
        {
            var result = await _accountRepository.Login(accountDto);

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Invalid username or password"
                });
            }

            return Ok(new
            {
                account = _mapper.Map<AccountDto>(result[0]),
                access_token = ((TokenDto)result[1]).access_token,
                refresh_token = ((TokenDto)result[1]).refresh_token
            });
        }



        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> register([FromBody] CreateAccountDto accountDto)
        {
            var accountModel = await _accountRepository.Register(accountDto);
            if (accountModel == null)
            {
                return BadRequest(new
                {
                    message = "Account already exists"
                });

            }
            return Ok(_mapper.Map<CreateAccountDto>(accountModel));
        }

        [HttpGet("auth")]
        public async Task<IActionResult> auth()
        {
            var data = await _accountRepository.Auth();
            if (data == null)
            {
                return BadRequest("Account not found");
            }
            return Ok(data);
        }
    }
}