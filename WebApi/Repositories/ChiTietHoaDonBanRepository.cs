using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos.ChiTietHoaDonBan;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class ChiTietHoaDonBanRepository : IChiTietHoaDonBanRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ISanPhamRepository _sanPhamRepository;
        public ChiTietHoaDonBanRepository(ApplicationDbContext context, ISanPhamRepository sanPhamRepository)
        {
            _context = context;
            _sanPhamRepository = sanPhamRepository;
        }

        public async Task<List<ChiTietHoaDonBan>> GetChiTietHoaDonBans()
        {
            return await _context.ChiTietHoaDonBans.ToListAsync();
        }
        public async Task<List<ChiTietHoaDonBan>> GetChiTietHoaDonBanByHdbId(string id)
        {
            return await _context.ChiTietHoaDonBans.Where(x => x.ma_hdb == id).ToListAsync();
        }
        public async Task<ChiTietHoaDonBan> CreateChiTietHoaDonBan(createChiTietHoaDonBanDto createChiTietHoaDonBanDto, string ma_hdb)
        {
            var checkSLSanPham = (await _sanPhamRepository.GetById(createChiTietHoaDonBanDto.ma_sp)).so_luong;

            if (checkSLSanPham < createChiTietHoaDonBanDto.so_luong)
            {
                throw new InvalidOperationException("Insufficient product quantity.");
            }

            var _cthdCreated = _context.ChiTietHoaDonBans.Add(new ChiTietHoaDonBan
            {
                ma_hdb = ma_hdb,
                ma_sp = createChiTietHoaDonBanDto.ma_sp,
                tong_tien = createChiTietHoaDonBanDto.so_luong * _context.SanPhams.FirstOrDefault(x => x.ma_sp == createChiTietHoaDonBanDto.ma_sp).gia_ban,
                so_luong = createChiTietHoaDonBanDto.so_luong,
            });

            await _context.SaveChangesAsync();
            return _cthdCreated.Entity;
        }

        public async Task<ChiTietHoaDonBan> DeleteChiTietHoaDonBan(string id)
        {
            var cthd = await _context.ChiTietHoaDonBans.FirstOrDefaultAsync(x => x.ma_cthdb == id);
            if (cthd == null)
            {
                return null;
            }
            _context.ChiTietHoaDonBans.Remove(cthd);
            await _context.SaveChangesAsync();
            return cthd;
        }
        public async Task<List<ChiTietHoaDonBan>> GetChiTietHoaDonBanByUserId(string userId)
        {

            return await _context.ChiTietHoaDonBans.Where(x => x.ma_hdb == userId).ToListAsync();
        }
    }
}