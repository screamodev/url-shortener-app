using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UrlChangerApi.Data.Entities;
using UrlChangerApi.Enums;

namespace UrlChangerApi.Data;

public class ApplicationDbContext : IdentityUserContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
    {
    }
    
    public DbSet<ShortUrl> ShortUrls { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.Entity<ShortUrl>()
            .HasOne(s => s.User)
            .WithMany()
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        var hasher = new PasswordHasher<User>();

        var adminEmail = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("SiteSettings")["AdminEmail"];
        var adminPassword = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("SiteSettings")["AdminPassword"];
        
        builder.Entity<User>().HasData(
            new User
            {
                Id = "80c8b6b1-e2b6-45e8-b044-8f2178a90111",
                NormalizedUserName = adminEmail.ToUpper(),
                PasswordHash = hasher.HashPassword(null, adminPassword),
                Email = adminEmail,
                NormalizedEmail = adminEmail.ToUpper(),
                Role = Role.Admin
            }
        );
    }
}