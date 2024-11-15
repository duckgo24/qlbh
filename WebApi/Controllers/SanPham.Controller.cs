using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos.SanPham;
using WebApi.Interfaces;
using WebApi.Mappers;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("sanpham")]

    public class SanPhamController : ControllerBase
    {
        public ISanPhamRepository _sanPhamRepository { get; set; }
        public SanPhamController(ISanPhamRepository sanPhamRepository)
        {
            _sanPhamRepository = sanPhamRepository;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var dsSp = await _sanPhamRepository.GetAll();
            if (dsSp == null)
            {
                return NotFound("Product not found");
            }
            return Ok(dsSp);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetByTenSp([FromQuery] string q)
        {
            var dsSp = await _sanPhamRepository.searchSanPham(q);
            if (dsSp == null)
            {
                return NotFound("Product not found");
            }
            return Ok(dsSp);
        }
        
        [HttpGet("best-sales")]
        public async Task<IActionResult> GetSanPhamBestSales([FromQuery] int limit)
        {
            var dsSp = await _sanPhamRepository.GetSanPhamBestSales(limit);
            if (dsSp == null)
            {
                return NotFound("Product not found");
            }
            return Ok(dsSp);
        }
        [HttpGet("news")]
        public async Task<IActionResult> GetSanPhamNews([FromQuery] int limit)
        {
            var dsSp = await _sanPhamRepository.GetSanPhamNews(limit);
            if (dsSp == null)
            {
                return NotFound("Product not found");
            }
            return Ok(dsSp);
        }
        [HttpGet("get-by-ma-dm")]
        public async Task<IActionResult> GetSanPhamByMaDM([FromQuery] string ma_dm, [FromQuery] int limit)
        {
            var dsSp = await _sanPhamRepository.GetSanPhamByMaDM(ma_dm, limit);
            if (dsSp == null)
            {
                return NotFound("Product not found");
            }
            return Ok(dsSp);
        }

        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var sp = await _sanPhamRepository.GetById(id);
            if (sp == null)
            {
                return NotFound("Product not found");
            }
            return Ok(sp);
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateSanPhamDto createSanPhamDto)
        {
            var sp = await _sanPhamRepository.Create(createSanPhamDto);
            if (sp == null)
            {
                return BadRequest("Product already exists");
            }
            return Ok(sp);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdateSanPhamDto sanPhamDto)
        {
            var sp = await _sanPhamRepository.Update(id, sanPhamDto);
            if (sp == null)
            {
                return NotFound("Product not found");
            }
            return Ok(sp);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var sp = await _sanPhamRepository.Delete(id);
            if (sp == null)
            {
                return NotFound("Product not found");
            }
            return Ok(sp);
        }

        [HttpGet("get-by-user-id/{userId}")]
        public async Task<IActionResult> GetSanPhamByUserId(string userId)
        {
            var dsSp = await _sanPhamRepository.GetSanPhamByUserId(userId);
            return Ok(dsSp);
        }

    }


}