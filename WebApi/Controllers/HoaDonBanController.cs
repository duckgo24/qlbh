using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Dtos.HoaDonBan;
using WebApi.Interfaces;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("hoadonban")]
    public class HoaDonBanController : Controller
    {
        private readonly ILogger<HoaDonBanController> _logger;
        private readonly IHoaDonBanRepository _hoaDonBanRepository;
        private readonly IMapper _mapper;

        public HoaDonBanController(ILogger<HoaDonBanController> logger, IHoaDonBanRepository hoaDonBanRepository, IMapper mapper)
        {
            _logger = logger;
            _hoaDonBanRepository = hoaDonBanRepository;
            _mapper = mapper;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> getAll()
        {
            List<Models.HoaDonBan> hoaDonBans = await _hoaDonBanRepository.GetHoaDonBans();
            return Ok(_mapper.Map<List<HoaDonBanDto>>(hoaDonBans));
        }

        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            Models.HoaDonBan hoaDonBan = await _hoaDonBanRepository.GetHoaDonBanById(id);
            if (hoaDonBan == null)
            {
                return NotFound("HoaDonBan not found");
            }
            return Ok(_mapper.Map<HoaDonBanDto>(hoaDonBan));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] createHoaDonBanDto _createHoaDonBanDto)
        {
            try
            {
                Models.HoaDonBan hoaDonBan = await _hoaDonBanRepository.CreateHoaDonBan(_createHoaDonBanDto);
                return Ok(_mapper.Map<HoaDonBanDto>(hoaDonBan));
            }
            catch (InvalidOperationException ex) when (ex.Message == "Insufficient product quantity.")
            {
                return BadRequest(new { message = "Không đủ số lượng sản phẩm" });
            }
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] updateHoaDonBanDto _updateHoaDonBanDto)
        {
            Models.HoaDonBan hoaDonBan = await _hoaDonBanRepository.UpdateHoaDonBan(id, _updateHoaDonBanDto);
            if (hoaDonBan == null)
            {
                return NotFound("HoaDonBan not found");
            }
            return Ok(_mapper.Map<HoaDonBanDto>(hoaDonBan));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            Models.HoaDonBan hoaDonBan = await _hoaDonBanRepository.DeleteHoaDonBan(id);
            if (hoaDonBan == null)
            {
                return NotFound("HoaDonBan not found");
            }
            return Ok(_mapper.Map<HoaDonBanDto>(hoaDonBan));
        }

        [HttpGet("get-by-user-id/{userId}")]
        public async Task<IActionResult> GetByUserId(string userId)
        {
            List<Models.HoaDonBan> hoaDonBans = await _hoaDonBanRepository.GetHoaDonBanByUserId(userId);
            return Ok(_mapper.Map<List<HoaDonBanDto>>(hoaDonBans));
        }

        [HttpGet("get-da-thanh-toan-by-user-id/{userId}")]
        public async Task<IActionResult> GetDaThanhToanByUserId(string userId)
        {
            List<Models.HoaDonBan> hoaDonBans = await _hoaDonBanRepository.GetHoaDonBanDaThanhToanByUserId(userId);
            return Ok(_mapper.Map<List<HoaDonBanDto>>(hoaDonBans));
        }

        [HttpGet("get-chua-thanh-toan-by-user-id/{userId}")]
        public async Task<IActionResult> GetChuaThanhToanByUserId(string userId)
        {
            List<Models.HoaDonBan> hoaDonBans = await _hoaDonBanRepository.GetHoaDonBanChuaThanhToanByUserId(userId);
            return Ok(_mapper.Map<List<HoaDonBanDto>>(hoaDonBans));
        }


    }
}