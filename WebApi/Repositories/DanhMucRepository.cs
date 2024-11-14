using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos.DanhMuc;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class DanhMucRepository : IDanhMucRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IUser _user;
        public DanhMucRepository(ApplicationDbContext context, IUser user)
        {
            _context = context;
            _user = user;
        }

        public async Task<List<DanhMuc>> GetDanhMucs()
        {
            return await _context.DanhMucs.ToListAsync();

        }
        public async Task<DanhMuc> GetDanhMucById(string id)
        {
            return await _context.DanhMucs.FirstOrDefaultAsync(a => a.ma_dm == id);
        }
        public async Task<DanhMuc> CreateDanhMuc(CreateDanhMucDto createDanhMucDto)
        {
            var checkDanhMuc = await _context.DanhMucs.FirstOrDefaultAsync(dm => dm.ten_dm == createDanhMucDto.ten_dm);

            if (checkDanhMuc != null)
            {
                return null;
            }

            var danhMuc = new DanhMuc
            {
                ten_dm = createDanhMucDto.ten_dm,
                mo_ta = createDanhMucDto.mo_ta,
                created_date = DateTime.Now,
                created_by = _user.GetCurrentUser(),
            };

            _context.DanhMucs.Add(danhMuc);
            await _context.SaveChangesAsync();
            return danhMuc;
        }
        public async Task<DanhMuc> UpdateDanhMuc(string id, CreateDanhMucDto updateDanhMucDto)
        {
            var danhMucModel = await _context.DanhMucs.FirstOrDefaultAsync(dm => dm.ma_dm == id);
            if (danhMucModel == null)
            {
                return null;
            }

            danhMucModel.ten_dm = updateDanhMucDto.ten_dm;
            danhMucModel.mo_ta = updateDanhMucDto.mo_ta;

            await _context.SaveChangesAsync();
            return danhMucModel;

        }
        public async Task<DanhMuc> DeleteDanhMuc(string id)
        {
            var danhMucModel = await _context.DanhMucs.FirstOrDefaultAsync(dm => dm.ma_dm == id);
            if (danhMucModel == null)
            {
                return null;
            }

            _context.DanhMucs.Remove(danhMucModel);
            await _context.SaveChangesAsync();
            return danhMucModel;
        }

    }
}