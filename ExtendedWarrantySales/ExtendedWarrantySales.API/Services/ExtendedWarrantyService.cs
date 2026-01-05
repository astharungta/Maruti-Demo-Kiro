using Company.ExtendedWarrantySales.API.Data;

namespace Company.ExtendedWarrantySales.API.Services;

public class ExtendedWarrantyService : IExtendedWarrantyService
{
    private readonly ApplicationDbContext _context;

    public ExtendedWarrantyService(ApplicationDbContext context)
    {
        _context = context;
    }

    // Service implementation
}