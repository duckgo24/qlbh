using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(
                    _configuration.GetConnectionString("DefaultConnection"),
                    new MySqlServerVersion(new Version(8, 0, 21))
                );
            }
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<DanhMuc> DanhMucs { get; set; }
        public DbSet<SanPham> SanPhams { get; set; }
        public DbSet<HoaDonNhap> HoaDonNhaps { get; set; }
        public DbSet<ChiTietHoaDonNhap> ChiTietHoaDonNhaps { get; set; }
        public DbSet<HoaDonBan> HoaDonBans { get; set; }
        public DbSet<ChiTietHoaDonBan> ChiTietHoaDonBans { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(a => a.acc_id);
            });

            modelBuilder.Entity<DanhMuc>(entity =>
            {
                entity.HasKey(dm => dm.ma_dm);
                entity.HasOne(dm => dm.User)
                      .WithMany(u => u.DanhMucs)
                      .HasForeignKey(dm => dm.created_by);
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.HasKey(sp => sp.ma_sp);
                entity.HasOne(sp => sp.User)
                      .WithMany(u => u.SanPhams)
                      .HasForeignKey(sp => sp.created_by);
                entity.HasOne(sp => sp.DanhMuc)
                      .WithMany(dm => dm.SanPhams)
                      .HasForeignKey(sp => sp.ma_dm);
            });

            modelBuilder.Entity<HoaDonNhap>(entity =>
            {
                entity.HasKey(hdn => hdn.ma_hdn);
                entity.HasOne(hdn => hdn.Account)
                      .WithMany(a => a.HoaDonNhaps)
                      .HasForeignKey(hdn => hdn.acc_id);
            });

            modelBuilder.Entity<ChiTietHoaDonNhap>(entity =>
            {
                entity.HasKey(cthdn => cthdn.ma_cthdn);
                entity.HasOne(cthdn => cthdn.HoaDonNhap)
                      .WithMany(hdn => hdn.ChiTietHoaDonNhaps)
                      .HasForeignKey(cthdn => cthdn.ma_hdn);
                entity.HasOne(cthdn => cthdn.SanPham)
                .WithMany(sp => sp.ChiTietHoaDonNhaps)
                .HasForeignKey(cthdn => cthdn.ma_sp);
            });

            modelBuilder.Entity<HoaDonBan>(entity =>
            {
                entity.HasKey(hdb => hdb.ma_hdb);
                entity.HasOne(hdb => hdb.Account)
                      .WithMany(a => a.HoaDonBans)
                      .HasForeignKey(hdb => hdb.acc_id);
            });

            modelBuilder.Entity<ChiTietHoaDonBan>(entity =>
            {
                entity.HasKey(cthdb => cthdb.ma_cthdb);
                entity.HasOne(cthdb => cthdb.HoaDonBan)
                      .WithMany(hdb => hdb.ChiTietHoaDonBans)
                      .HasForeignKey(cthdb => cthdb.ma_hdb);
                entity.HasOne(cthdb => cthdb.SanPham)
                      .WithMany(sp => sp.ChiTietHoaDonBans)
                      .HasForeignKey(cthdb => cthdb.ma_sp);
            });

        }
    }
}