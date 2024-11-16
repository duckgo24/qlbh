using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Dtos.HoaDonNhap;
using WebApi.Interfaces;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Authorize(policy: "Admin")]
    [ApiController]
    [Route("hoadonnhap")]
    public class HoaDonNhapController : Controller
    {
        private readonly ILogger<HoaDonNhapController> _logger;
        private readonly IHoaDonNhapRepository _hoaDonNhapRepository;
        private readonly IMapper _mapper;

        public HoaDonNhapController(ILogger<HoaDonNhapController> logger, IHoaDonNhapRepository hoaDonNhapRepository, IMapper mapper)
        {
            _logger = logger;
            _hoaDonNhapRepository = hoaDonNhapRepository;
            _mapper = mapper;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> getAll()
        {
            List<Models.HoaDonNhap> hoaDonNhaps = await _hoaDonNhapRepository.GetHoaDonNhaps();
            return Ok(_mapper.Map<List<HoaDonNhapDto>>(hoaDonNhaps));
        }

        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            Models.HoaDonNhap hoaDonNhap = await _hoaDonNhapRepository.GetHoaDonNhapById(id);
            if (hoaDonNhap == null)
            {
                return NotFound("HoaDonNhap not found");
            }
            return Ok(_mapper.Map<HoaDonNhapDto>(hoaDonNhap));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] createHoaDonNhapDto _createHoaDonNhapDto)
        {
            Models.HoaDonNhap hoaDonNhap = await _hoaDonNhapRepository.CreateHoaDonNhap(_createHoaDonNhapDto);
            return Ok(_mapper.Map<HoaDonNhapDto>(hoaDonNhap));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            Models.HoaDonNhap hoaDonNhap = await _hoaDonNhapRepository.DeleteHoaDonNhap(id);
            if (hoaDonNhap == null)
            {
                return NotFound("HoaDonNhap not found");
            }
            return Ok(_mapper.Map<HoaDonNhapDto>(hoaDonNhap));
        }

        [HttpGet("get-by-tong-tien/{tongTien}")]
        public async Task<IActionResult> GetByTongTien(decimal tongTien)
        {
            List<Models.HoaDonNhap> hoaDonNhaps = await _hoaDonNhapRepository.GetHoaDonNhapTheoTongTien(tongTien);
            return Ok(_mapper.Map<List<HoaDonNhapDto>>(hoaDonNhaps));
        }

        [HttpGet("get-da-thanh-toan")]
        public async Task<IActionResult> GetDaThanhToan()
        {
            List<Models.HoaDonNhap> hoaDonNhaps = await _hoaDonNhapRepository.GetHoaDonNhapDaThanhToan();
            return Ok(_mapper.Map<List<HoaDonNhapDto>>(hoaDonNhaps));
        }

        [HttpGet("get-chua-thanh-toan")]
        public async Task<IActionResult> GetChuaThanhToan()
        {
            List<Models.HoaDonNhap> hoaDonNhaps = await _hoaDonNhapRepository.GetHoaDonNhapChuaThanhToan();
            return Ok(_mapper.Map<List<HoaDonNhapDto>>(hoaDonNhaps));
        }

    }
}