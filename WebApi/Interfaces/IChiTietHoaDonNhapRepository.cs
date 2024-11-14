using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.ChiTietHoaDonNhap;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IChiTietHoaDonNhapRepository
    {
        Task<List<ChiTietHoaDonNhap>> GetChiTietHoaDonNhaps();
        Task<List<ChiTietHoaDonNhap>>GetChiTietHoaDonNhapByHdnId(string id);
        Task<ChiTietHoaDonNhap> CreateChiTietHoaDonNhap(createChiTietHoaDonNhapDto createChiTietHoaDonNhapDto, string ma_hdn);
        Task<ChiTietHoaDonNhap> DeleteChiTietHoaDonNhap(string id);
        Task<List<ChiTietHoaDonNhap>> GetChiTietHoaDonNhapByUserId(string userId);
    }
}