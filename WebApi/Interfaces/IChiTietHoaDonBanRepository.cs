using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.ChiTietHoaDonBan;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IChiTietHoaDonBanRepository
    {
        Task<List<ChiTietHoaDonBan>> GetChiTietHoaDonBans();
        Task<List<ChiTietHoaDonBan>> GetChiTietHoaDonBanByHdbId(string id);
        Task<ChiTietHoaDonBan> CreateChiTietHoaDonBan(createChiTietHoaDonBanDto createChiTietHoaDonBanDto, string ma_hdb);
        Task<ChiTietHoaDonBan> DeleteChiTietHoaDonBan(string id);
        Task<List<ChiTietHoaDonBan>> GetChiTietHoaDonBanByUserId(string userId);
    }
}