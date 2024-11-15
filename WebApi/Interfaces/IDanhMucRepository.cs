using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.DanhMuc;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IDanhMucRepository
    {
        Task<List<DanhMuc>> GetDanhMucs();
        Task<DanhMuc> GetDanhMucById(string id);
        Task<DanhMuc> CreateDanhMuc(CreateDanhMucDto createDanhMucDto);
        Task<DanhMuc> UpdateDanhMuc(string id, CreateDanhMucDto updateDanhMucDto);
        Task<DanhMuc> DeleteDanhMuc(string id);
    }
}