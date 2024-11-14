using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebApi.Dtos.Account;
using WebApi.Dtos.ChiTietHoaDonBan;
using WebApi.Dtos.ChiTietHoaDonNhap;
using WebApi.Dtos.DanhMuc;
using WebApi.Dtos.HoaDonBan;
using WebApi.Dtos.HoaDonNhap;
using WebApi.Dtos.SanPham;
using WebApi.Models;

namespace WebApi.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Account, AccountDto>();
            CreateMap<Account, CreateAccountDto>();
            CreateMap<Account, UpdateAccountDto>();
            CreateMap<Account, LoginAccountDto>();

            CreateMap<DanhMuc, DanhMucDto>();
            CreateMap<DanhMuc, CreateDanhMucDto>();

            CreateMap<SanPham, SanPhamDto>();
            CreateMap<SanPham, CreateSanPhamDto>();
            CreateMap<SanPham, UpdateSanPhamDto>();

            CreateMap<HoaDonBan, HoaDonBanDto>();
            CreateMap<HoaDonBan, createHoaDonBanDto>();
            CreateMap<HoaDonBan, updateHoaDonBanDto>();
            
            CreateMap<ChiTietHoaDonBan, ChiTietHoaDonBanDto>();
            CreateMap<ChiTietHoaDonBan, createChiTietHoaDonBanDto>();

            CreateMap<HoaDonNhap, HoaDonNhapDto>();
            CreateMap<HoaDonNhap, createHoaDonNhapDto>();

            CreateMap<ChiTietHoaDonNhap, ChiTietHoaDonNhapDto>();
            CreateMap<ChiTietHoaDonNhap, createChiTietHoaDonNhapDto>();
            

        }
    }
}