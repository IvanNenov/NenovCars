using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApiAuth.Data.Models;
using WebApiAuth.Data.Models.User;

namespace WebApiAuth.Data
{
    public class WebApiAuthDbContext : IdentityDbContext
    {
        public WebApiAuthDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<UserFavoriteCar> UserFavoriteCars { get; set; }
        public DbSet<Car> Cars { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.HasMany(x => x.Cars).WithOne(x => x.CarOwner);
            });

            builder.Entity<UserFavoriteCar>(entity =>
            {
                entity.HasKey(x => new { x.ApplicationUserId, x.CarId });
            });

            builder.Entity<ApplicationUser>(entity =>
            {
                entity.HasMany(x => x.FavoriteCars).WithOne(x => x.ApplicationUser);
            });

            builder.Entity<Car>(entity =>
            {
                entity.HasMany(x => x.UserFavoriteCars).WithOne(x => x.Car);
            });

            builder.Entity<Car>(entity =>
            {
                entity.HasOne(x => x.CarOwner).WithMany(x => x.Cars);
            });

            base.OnModelCreating(builder);
        }
    }
}