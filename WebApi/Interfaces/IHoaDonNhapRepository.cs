using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos.HoaDonNhap;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IHoaDonNhapRepository
    {
        Task<List<HoaDonNhap>> GetHoaDonNhaps();
        Task<HoaDonNhap> GetHoaDonNhapById(string id);
        Task<HoaDonNhap> CreateHoaDonNhap(createHoaDonNhapDto createHoaDonNhapDto);
        Task<HoaDonNhap> DeleteHoaDonNhap(string id);
        Task<List<HoaDonNhap>> GetHoaDonNhapTheoTongTien(decimal tongTien);
        Task<List<HoaDonNhap>> GetHoaDonNhapDaThanhToan();
        Task<List<HoaDonNhap>> GetHoaDonNhapChuaThanhToan();
    }
}