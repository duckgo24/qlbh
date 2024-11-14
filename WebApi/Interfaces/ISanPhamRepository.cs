using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.SanPham;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ISanPhamRepository
    {
        Task<List<SanPham>> GetAll();
        Task<List<SanPham>> GetSanPhamBestSales(int n);
        Task<List<SanPham>> GetSanPhamNews(int n);
        Task<List<SanPham>> GetSanPhamByMaDM(string ma_dm, int n);
        Task<SanPham> GetById(string id);
        Task<SanPham> Create(CreateSanPhamDto createSanPhamDto);
        Task<SanPham> Update(string id, UpdateSanPhamDto updateSanPhamDto);
        Task<SanPham> UpdateSoLuong(string id, int so_luong);
        Task<SanPham> Delete(string id);
        Task<List<SanPham>> GetSanPhamByUserId(string userId);
    }
}