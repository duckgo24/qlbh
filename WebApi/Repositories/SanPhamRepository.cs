using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos.SanPham;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class SanPhamRepository : ISanPhamRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IUser _user;
        private readonly IMapper _mapper;
        public SanPhamRepository(ApplicationDbContext context, IUser user, IMapper mapper)
        {
            _context = context;
            _user = user;
            _mapper = mapper;
        }

        public async Task<List<SanPham>> GetAll()
        {
            return await _context.SanPhams.ToListAsync();
        }
        public async Task<List<SanPham>> GetSanPhamBestSales(int n)
        {
            return await _context.SanPhams.OrderByDescending(sp => sp.so_luong).Take(n).ToListAsync();
        }
        public async Task<List<SanPham>> GetSanPhamNews(int n)
        {
            return await _context.SanPhams.OrderByDescending(sp => sp.created_date).Take(n).ToListAsync();
        }
        public async Task<List<SanPham>> GetSanPhamByMaDM(string ma_dm, int n)
        {
            return await _context.SanPhams.Where(sp => sp.ma_dm == ma_dm).Take(n).ToListAsync();
        }
        public async Task<SanPham> GetById(string id)
        {
            return await _context.SanPhams.FirstOrDefaultAsync(a => a.ma_sp == id);
        }

        public async Task<SanPham> Create(CreateSanPhamDto createSanPhamDto)
        {
            var checkSanPham = await _context.SanPhams.FirstOrDefaultAsync(sp => sp.ten_sp == createSanPhamDto.ten_sp);

            if (checkSanPham != null)
            {
                return null;
            }

            var sanPham = new SanPham
            {
                ten_sp = createSanPhamDto.ten_sp,
                gia_ban = createSanPhamDto.gia_ban,
                gia_nhap = createSanPhamDto.gia_nhap,
                don_vi = createSanPhamDto.don_vi,
                so_luong = createSanPhamDto.so_luong,
                hinh_anh = createSanPhamDto.hinh_anh,
                created_date = DateTime.Now,
                created_by = _user.GetCurrentUser(),
                ma_dm = createSanPhamDto.ma_dm,
            };

            _context.SanPhams.Add(sanPham);
            await _context.SaveChangesAsync();
            return sanPham;
        }

        public async Task<SanPham> Update(string id, UpdateSanPhamDto updateSanPhamDto)
        {
            var sanPham = await _context.SanPhams.FirstOrDefaultAsync(sp => sp.ma_sp == id);
            if (sanPham == null)
            {
                return null;
            }

            sanPham.ten_sp = updateSanPhamDto.ten_sp;
            sanPham.gia_ban = updateSanPhamDto.gia_ban;
            sanPham.gia_nhap = updateSanPhamDto.gia_nhap;
            sanPham.don_vi = updateSanPhamDto.don_vi;
            sanPham.so_luong = updateSanPhamDto.so_luong;
            sanPham.hinh_anh = updateSanPhamDto.hinh_anh;  

            await _context.SaveChangesAsync();
            return sanPham;
        }

        public async Task<SanPham> UpdateSoLuong(string id, int so_luong)
        {
            var sanPham = await _context.SanPhams.FirstOrDefaultAsync(sp => sp.ma_sp == id);
            if (sanPham == null)
            {
                return null;
            }
            sanPham.so_luong = so_luong;
            await _context.SaveChangesAsync();
            return sanPham;
        }



        public async Task<SanPham> Delete(string id)
        {
            var sanPham = await _context.SanPhams.FirstOrDefaultAsync(sp => sp.ma_sp == id);
            if (sanPham == null)
            {
                return null;
            }

            _context.SanPhams.Remove(sanPham);
            await _context.SaveChangesAsync();
            return sanPham;
        }

        public async Task<List<SanPham>> GetSanPhamByUserId(string userId)
        {
            return await _context.SanPhams.Where(sp => sp.created_by == userId).ToListAsync();
        }
    }
}