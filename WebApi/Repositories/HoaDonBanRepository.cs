using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos.ChiTietHoaDonBan;
using WebApi.Dtos.HoaDonBan;
using WebApi.Dtos.SanPham;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class HoaDonBanRepository : IHoaDonBanRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IChiTietHoaDonBanRepository _chiTietHoaDonBanRepository;
        private readonly IUser _user;
        private readonly ISanPhamRepository _sanPhamRepository;
        public HoaDonBanRepository(ApplicationDbContext context, IUser user, IChiTietHoaDonBanRepository chiTietHoaDonBanRepository, ISanPhamRepository sanPhamRepository)
        {
            _context = context;
            _user = user;
            _chiTietHoaDonBanRepository = chiTietHoaDonBanRepository;
            _sanPhamRepository = sanPhamRepository;
        }

        public async Task<List<HoaDonBan>> GetHoaDonBans()
        {
            var listHDB = await _context.HoaDonBans.ToListAsync();
            foreach (HoaDonBan hdb in listHDB)
            {
                hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);
            }
            return listHDB;
        }

        public async Task<List<HoaDonBan>> GetHoaDonBanTheoNgay(DateTime ngay)
        {
            var listHDB = await _context.HoaDonBans.Where(x => x.ngay_tao.Date == ngay.Date).ToListAsync();
            foreach (HoaDonBan hdb in listHDB)
            {
                hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);
            }
            return listHDB;
        }
        public async Task<List<HoaDonBan>> GetHoaDonBanTheoTongTien(decimal tongTien)
        {
            var listHDB = await _context.HoaDonBans.Where(x => x.tong_tien >= tongTien).ToListAsync();
            foreach (HoaDonBan hdb in listHDB)
            {
                hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);
            }
            return listHDB;
        }
        public async Task<List<HoaDonBan>> GetHoaDonBanTheoTrangThai(bool thanh_toan)
        {
            var listHDB = await _context.HoaDonBans.Where(x => x.thanh_toan == thanh_toan).ToListAsync();
            foreach (HoaDonBan hdb in listHDB)
            {
                hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);
            }
            return listHDB;
        }
        public async Task<HoaDonBan> GetHoaDonBanById(string id)
        {
            var hdb = await _context.HoaDonBans.FirstOrDefaultAsync(x => x.ma_hdb == id);

            hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);

            return hdb;
        }

        public async Task<HoaDonBan> CreateHoaDonBan(createHoaDonBanDto _createHoaDonBanDto)
        {
            var _hdbCreated = _context.HoaDonBans.Add(new HoaDonBan
            {
                acc_id = _user.GetCurrentUser(),
                tong_tien = 0,
                thanh_toan = false,
                phuong_thuc_thanh_toan = _createHoaDonBanDto.phuong_thuc_thanh_toan,
            });

            await _context.SaveChangesAsync();

            foreach (createChiTietHoaDonBanDto cthdb in _createHoaDonBanDto.danh_sach_san_pham)
            {
                await _chiTietHoaDonBanRepository.CreateChiTietHoaDonBan(cthdb, _hdbCreated.Entity.ma_hdb);

                var sanPham = await _sanPhamRepository.GetById(cthdb.ma_sp);
                var soLuongMoi = sanPham.so_luong - cthdb.so_luong;
                await _sanPhamRepository.UpdateSoLuong(cthdb.ma_sp, soLuongMoi);
            }

            await _context.Entry(_hdbCreated.Entity).Collection(h => h.ChiTietHoaDonBans).LoadAsync();

            int sum = _hdbCreated.Entity.ChiTietHoaDonBans.Sum(x => x.tong_tien);
            _hdbCreated.Entity.tong_tien = sum;

            await _context.SaveChangesAsync();
            return _hdbCreated.Entity;
        }


        public async Task<HoaDonBan> UpdateHoaDonBan(string id, updateHoaDonBanDto _updateHoaDonBanDto)
        {
            var hdb = await _context.HoaDonBans.FirstOrDefaultAsync(x => x.ma_hdb == id);
            if (hdb == null)
            {
                return null;
            }
            hdb.thanh_toan = _updateHoaDonBanDto.thanh_toan;
            hdb.phuong_thuc_thanh_toan = _updateHoaDonBanDto.phuong_thuc_thanh_toan;
            hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);
            await _context.SaveChangesAsync();
            return hdb;
        }

        public async Task<HoaDonBan> DeleteHoaDonBan(string id)
        {
            var hdb = await _context.HoaDonBans
                .Include(h => h.ChiTietHoaDonBans)
                .FirstOrDefaultAsync(x => x.ma_hdb == id);

            if (hdb == null)
            {
                return null;
            }

            _context.ChiTietHoaDonBans.RemoveRange(hdb.ChiTietHoaDonBans);
            _context.HoaDonBans.Remove(hdb);

            await _context.SaveChangesAsync();

            return hdb;
        }

        public async Task<List<HoaDonBan>> GetHoaDonBanByUserId(string userId)
        {
            var listHdb = await _context.HoaDonBans.Where(x => x.acc_id == userId).ToListAsync();
            foreach (HoaDonBan hdb in listHdb)
            {
                hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);
            }
            return listHdb;
        }
        public async Task<List<HoaDonBan>> GetHoaDonBanDaThanhToanByUserId(string userId)
        {
            var listHdb = await _context.HoaDonBans.Where(x => x.acc_id == userId && x.thanh_toan == true).ToListAsync();
            foreach (HoaDonBan hdb in listHdb)
            {
                hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);
            }
            return listHdb;
        }
        public async Task<List<HoaDonBan>> GetHoaDonBanChuaThanhToanByUserId(string userId)
        {
            var listHdb = await _context.HoaDonBans.Where(x => x.acc_id == userId && x.thanh_toan == false).ToListAsync();
            foreach (HoaDonBan hdb in listHdb)
            {
                hdb.ChiTietHoaDonBans = await _chiTietHoaDonBanRepository.GetChiTietHoaDonBanByHdbId(hdb.ma_hdb);
            }
            return listHdb;
        }
    }
}
