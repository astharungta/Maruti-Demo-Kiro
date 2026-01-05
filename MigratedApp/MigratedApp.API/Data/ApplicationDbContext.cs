using Microsoft.EntityFrameworkCore;
using Company.MigratedApp.API.Models;

namespace Company.MigratedApp.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<MainEntity> MainEntitys { get; set; }
}