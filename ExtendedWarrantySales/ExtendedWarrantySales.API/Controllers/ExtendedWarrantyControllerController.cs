using Microsoft.AspNetCore.Mvc;
using Company.ExtendedWarrantySales.API.Services;

namespace Company.ExtendedWarrantySales.API.Controllers;

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