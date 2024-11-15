using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Dtos.DanhMuc;
using WebApi.Interfaces;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("danhmuc")]
    public class DanhMucController : Controller
    {
        private readonly ILogger<DanhMucController> _logger;
        private readonly IDanhMucRepository _danhMucRepository;
        private readonly IMapper _mapper;

        public DanhMucController(ILogger<DanhMucController> logger, IDanhMucRepository danhMucRepository, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _danhMucRepository = danhMucRepository;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var danhMucs = await _danhMucRepository.GetDanhMucs();
            return Ok(_mapper.Map<List<DanhMucDto>>(danhMucs));
        }

        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var danhMuc = await _danhMucRepository.GetDanhMucById(id);
            if (danhMuc == null)
            {
                return NotFound("Category not found");
            }
            return Ok(_mapper.Map<DanhMucDto>(danhMuc));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateDanhMucDto createDanhMucDto)
        {
            var danhMuc = await _danhMucRepository.CreateDanhMuc(createDanhMucDto);
            if (danhMuc == null)
            {
                return BadRequest("Category already exists");
            }
            return Ok(_mapper.Map<DanhMucDto>(danhMuc));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CreateDanhMucDto updateDanhMucDto)
        {
            var danhMuc = await _danhMucRepository.UpdateDanhMuc(id, updateDanhMucDto);
            if (danhMuc == null)
            {
                return NotFound("Category not found");
            }
            return Ok(_mapper.Map<DanhMucDto>(danhMuc));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var danhMuc = await _danhMucRepository.DeleteDanhMuc(id);
            if (danhMuc == null)
            {
                return NotFound("Category not found");
            }
            return Ok(_mapper.Map<DanhMucDto>(danhMuc));
        }       
    }
}