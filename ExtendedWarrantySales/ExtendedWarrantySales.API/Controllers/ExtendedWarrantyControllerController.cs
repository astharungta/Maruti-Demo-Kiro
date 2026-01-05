using Microsoft.AspNetCore.Mvc;
using MarutiSuzuki.ExtendedWarrantySales.API.Services;

namespace MarutiSuzuki.ExtendedWarrantySales.API.Controllers;

[ApiController]
[Route("api/extended-warranty")]
public class ExtendedWarrantyControllerController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "API is working" });
    }
}