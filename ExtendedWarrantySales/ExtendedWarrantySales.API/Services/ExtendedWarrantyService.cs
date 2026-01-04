using MarutiSuzuki.ExtendedWarrantySales.API.Data;

namespace MarutiSuzuki.ExtendedWarrantySales.API.Services;

public class ExtendedWarrantyService : IExtendedWarrantyService
{
    private readonly ApplicationDbContext _context;

    public ExtendedWarrantyService(ApplicationDbContext context)
    {
        _context = context;
    }

    // Service implementation
}