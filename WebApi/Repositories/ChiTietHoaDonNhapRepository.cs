using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos.ChiTietHoaDonNhap;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class ChiTietHoaDonNhapRepository : IChiTietHoaDonNhapRepository
    {
        private readonly ApplicationDbContext _context;
        public ChiTietHoaDonNhapRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ChiTietHoaDonNhap>> GetChiTietHoaDonNhaps()
        {
            return await _context.ChiTietHoaDonNhaps.ToListAsync();
        }
        public async Task<List<ChiTietHoaDonNhap>> GetChiTietHoaDonNhapByHdnId(string id)
        {
            return await _context.ChiTietHoaDonNhaps.Where(x => x.ma_hdn == id).ToListAsync();
        }
        public async Task<ChiTietHoaDonNhap> CreateChiTietHoaDonNhap(createChiTietHoaDonNhapDto createChiTietHoaDonNhapDto, string ma_hdn)
        {

            var _cthdCreated = _context.ChiTietHoaDonNhaps.Add(new ChiTietHoaDonNhap
            {
                ma_hdn = ma_hdn,
                ma_sp = createChiTietHoaDonNhapDto.ma_sp,
                tong_tien = createChiTietHoaDonNhapDto.so_luong * _context.SanPhams.FirstOrDefault(x => x.ma_sp == createChiTietHoaDonNhapDto.ma_sp).gia_ban,
                so_luong = createChiTietHoaDonNhapDto.so_luong,
            });

            await _context.SaveChangesAsync();
            return _cthdCreated.Entity;
        }
        public async Task<ChiTietHoaDonNhap> DeleteChiTietHoaDonNhap(string id)
        {
            var cthd = await _context.ChiTietHoaDonNhaps.FirstOrDefaultAsync(x => x.ma_cthdn == id);
            if (cthd == null)
            {
                return null;
            }
            _context.ChiTietHoaDonNhaps.Remove(cthd);
            await _context.SaveChangesAsync();
            return cthd;
        }
        public async Task<List<ChiTietHoaDonNhap>> GetChiTietHoaDonNhapByUserId(string userId)
        {
            return await _context.ChiTietHoaDonNhaps.Where(x => x.ma_hdn == userId).ToListAsync();
        }
    }
}