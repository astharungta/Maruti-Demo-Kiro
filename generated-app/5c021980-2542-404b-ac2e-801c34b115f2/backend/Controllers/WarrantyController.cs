using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class WarrantyController : ControllerBase
{
    private readonly AppDbContext _context;

    public WarrantyController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Warranty>>> GetWarranties()
    {
        return await _context.Warranties.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Warranty>> GetWarranty(int id)
    {
        var warranty = await _context.Warranties.FindAsync(id);
        if (warranty == null) return NotFound();
        return warranty;
    }

    [HttpPost]
    public async Task<ActionResult<Warranty>> CreateWarranty(Warranty warranty)
    {
        _context.Warranties.Add(warranty);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetWarranty), new { id = warranty.Id }, warranty);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWarranty(int id, Warranty warranty)
    {
        if (id != warranty.Id) return BadRequest();
        _context.Entry(warranty).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWarranty(int id)
    {
        var warranty = await _context.Warranties.FindAsync(id);
        if (warranty == null) return NotFound();
        _context.Warranties.Remove(warranty);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
