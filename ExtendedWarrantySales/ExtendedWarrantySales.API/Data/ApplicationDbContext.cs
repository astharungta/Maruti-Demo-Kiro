using Microsoft.EntityFrameworkCore;
using Company.ExtendedWarrantySales.API.Models;

namespace Company.ExtendedWarrantySales.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<ExtendedWarrantyModel> ExtendedWarrantyModels { get; set; }
    public DbSet<DocumentModel> DocumentModels { get; set; }
    public DbSet<AddOnModel> AddOnModels { get; set; }
}