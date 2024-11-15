using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.HoaDonBan;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IHoaDonBanRepository
    {
        Task<List<HoaDonBan>> GetHoaDonBans();
        Task<HoaDonBan> GetHoaDonBanById(string id);
        Task<HoaDonBan> CreateHoaDonBan(createHoaDonBanDto createHoaDonBanDto);
        Task<HoaDonBan> UpdateHoaDonBan(string id, updateHoaDonBanDto updateHoaDonBanDto);
        Task<HoaDonBan> DeleteHoaDonBan(string id);
        Task<List<HoaDonBan>> GetHoaDonBanByUserId(string userId);
        Task<List<HoaDonBan>> GetHoaDonBanDaThanhToanByUserId(string userId);
        Task<List<HoaDonBan>> GetHoaDonBanChuaThanhToanByUserId(string userId);
    }
}