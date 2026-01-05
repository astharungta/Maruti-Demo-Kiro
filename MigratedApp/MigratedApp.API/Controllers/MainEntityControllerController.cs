using Microsoft.AspNetCore.Mvc;
using Company.MigratedApp.API.Services;

namespace Company.MigratedApp.API.Controllers;

[ApiController]
[Route("api/mainentity")]
public class MainEntityControllerController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "API is working" });
    }
}