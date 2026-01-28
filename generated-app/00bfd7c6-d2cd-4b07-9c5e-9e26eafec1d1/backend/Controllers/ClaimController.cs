using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ClaimController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClaimController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Claim>>> GetClaims()
    {
        return await _context.Claims.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Claim>> GetClaim(int id)
    {
        var claim = await _context.Claims.FindAsync(id);
        if (claim == null) return NotFound();
        return claim;
    }

    [HttpGet("stats")]
    public async Task<ActionResult<object>> GetStats()
    {
        var total = await _context.Claims.CountAsync();
        var pending = await _context.Claims.CountAsync(c => c.Status == "Pending");
        var approved = await _context.Claims.CountAsync(c => c.Status == "Approved");
        var totalAmount = await _context.Claims.SumAsync(c => c.Amount);
        
        return new { total, pending, approved, totalAmount };
    }

    [HttpPost]
    public async Task<ActionResult<Claim>> CreateClaim(Claim claim)
    {
        claim.ClaimNumber = $"CLM-{DateTime.Now:yyyy}-{(_context.Claims.Count() + 1):D3}";
        claim.FiledDate = DateTime.Now;
        _context.Claims.Add(claim);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetClaim), new { id = claim.Id }, claim);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateClaim(int id, Claim claim)
    {
        if (id != claim.Id) return BadRequest();
        _context.Entry(claim).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClaim(int id)
    {
        var claim = await _context.Claims.FindAsync(id);
        if (claim == null) return NotFound();
        _context.Claims.Remove(claim);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
