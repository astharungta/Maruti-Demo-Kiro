using Company.MigratedApp.API.Data;

namespace Company.MigratedApp.API.Services;

public class MainEntityService : IMainEntityService
{
    private readonly ApplicationDbContext _context;

    public MainEntityService(ApplicationDbContext context)
    {
        _context = context;
    }

    // Service implementation
}