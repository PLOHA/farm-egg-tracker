using Microsoft.EntityFrameworkCore;
using FarmEggTracker.API.Models;

namespace FarmEggTracker.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<AnimalType> AnimalTypes { get; set; }
        public DbSet<EggRecord> EggRecords { get; set; }
    }
}
