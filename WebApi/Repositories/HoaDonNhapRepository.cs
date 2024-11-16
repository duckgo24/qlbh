using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos.ChiTietHoaDonNhap;
using WebApi.Dtos.HoaDonNhap;
using WebApi.Dtos.HoaDonNhap;
using WebApi.Dtos.SanPham;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class HoaDonNhapRepository : IHoaDonNhapRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IChiTietHoaDonNhapRepository _chiTietHoaDonNhapRepository;
        private readonly ISanPhamRepository _sanPhamRepository;
        private readonly IUser _user;
        public HoaDonNhapRepository(ApplicationDbContext context, IUser user, IChiTietHoaDonNhapRepository chiTietHoaDonNhapRepository, ISanPhamRepository sanPhamRepository)
        {
            _context = context;
            _user = user;
            _chiTietHoaDonNhapRepository = chiTietHoaDonNhapRepository;
            _sanPhamRepository = sanPhamRepository;
        }

        public async Task<List<HoaDonNhap>> GetHoaDonNhaps()
        {
            var listHDN = await _context.HoaDonNhaps.ToListAsync();
            foreach (HoaDonNhap hdn in listHDN)
            {
                hdn.ChiTietHoaDonNhaps = await _chiTietHoaDonNhapRepository.GetChiTietHoaDonNhapByHdnId(hdn.ma_hdn);
            }
            return listHDN;
        }
        public async Task<HoaDonNhap> GetHoaDonNhapById(string id)
        {
            var hdn = await _context.HoaDonNhaps.FirstOrDefaultAsync(x => x.ma_hdn == id);

            hdn.ChiTietHoaDonNhaps = await _chiTietHoaDonNhapRepository.GetChiTietHoaDonNhapByHdnId(hdn.ma_hdn);

            return hdn;
        }
        public async Task<HoaDonNhap> CreateHoaDonNhap(createHoaDonNhapDto _createHoaDonNhapDto)
        {
            var _hdnCreated = _context.HoaDonNhaps.Add(new HoaDonNhap
            {
                acc_id = _user.GetCurrentUser(),
                tong_tien = 0,
                thanh_toan = _createHoaDonNhapDto.thanh_toan,
                phuong_thuc_thanh_toan = _createHoaDonNhapDto.phuong_thuc_thanh_toan,
            });

            await _context.SaveChangesAsync();

            foreach (createChiTietHoaDonNhapDto cthdn in _createHoaDonNhapDto.danh_sach_san_pham)
            {
                await _chiTietHoaDonNhapRepository.CreateChiTietHoaDonNhap(cthdn, _hdnCreated.Entity.ma_hdn);
                var sanPham = await _sanPhamRepository.GetById(cthdn.ma_sp);
                var soLuongMoi = sanPham.so_luong + cthdn.so_luong;
                await _sanPhamRepository.UpdateSoLuong(cthdn.ma_sp, soLuongMoi);
            }

            await _context.Entry(_hdnCreated.Entity).Collection(h => h.ChiTietHoaDonNhaps).LoadAsync();

            int sum = _hdnCreated.Entity.ChiTietHoaDonNhaps.Sum(x => x.tong_tien);
            _hdnCreated.Entity.tong_tien = sum;

            await _context.SaveChangesAsync();
            return _hdnCreated.Entity;
        }

        public async Task<HoaDonNhap> DeleteHoaDonNhap(string id)
        {
            var hdn = await _context.HoaDonNhaps.FirstOrDefaultAsync(x => x.ma_hdn == id);
            if (hdn == null)
            {
                return null;
            }
            hdn.ChiTietHoaDonNhaps = await _chiTietHoaDonNhapRepository.GetChiTietHoaDonNhapByHdnId(hdn.ma_hdn);
            _context.HoaDonNhaps.Remove(hdn);
            await _context.SaveChangesAsync();
            return hdn;
        }

        public async Task<List<HoaDonNhap>> GetHoaDonNhapTheoTongTien(decimal tongTien) 
        {
            var listHdN = await _context.HoaDonNhaps.Where(x => x.tong_tien >= tongTien).ToListAsync();
            foreach (HoaDonNhap hdn in listHdN)
            {
                hdn.ChiTietHoaDonNhaps = await _chiTietHoaDonNhapRepository.GetChiTietHoaDonNhapByHdnId(hdn.ma_hdn);
            }
            return listHdN;
        }


        public async Task<List<HoaDonNhap>> GetHoaDonNhapDaThanhToan()
        {
            var listHdN = await _context.HoaDonNhaps.Where(x => x.thanh_toan == true).ToListAsync();
            foreach (HoaDonNhap hdn in listHdN)
            {
                hdn.ChiTietHoaDonNhaps = await _chiTietHoaDonNhapRepository.GetChiTietHoaDonNhapByHdnId(hdn.ma_hdn);
            }
            return listHdN;
        }

        public async Task<List<HoaDonNhap>> GetHoaDonNhapChuaThanhToan()
        {
            var listHdN = await _context.HoaDonNhaps.Where(x => x.thanh_toan == false).ToListAsync();
            foreach (HoaDonNhap hdn in listHdN)
            {
                hdn.ChiTietHoaDonNhaps = await _chiTietHoaDonNhapRepository.GetChiTietHoaDonNhapByHdnId(hdn.ma_hdn);
            }
            return listHdN;
        }
    }
}
