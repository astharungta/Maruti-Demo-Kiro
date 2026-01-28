using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class DealerController : ControllerBase
{
    private readonly AppDbContext _context;

    public DealerController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Dealer>>> GetDealers()
    {
        return await _context.Dealers.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Dealer>> GetDealer(int id)
    {
        var dealer = await _context.Dealers.FindAsync(id);
        if (dealer == null) return NotFound();
        return dealer;
    }

    [HttpPost]
    public async Task<ActionResult<Dealer>> CreateDealer(Dealer dealer)
    {
        _context.Dealers.Add(dealer);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDealer), new { id = dealer.Id }, dealer);
    }
}
