using Microsoft.AspNetCore.Mvc;
using DmsBackend.Models;
using DmsBackend.Services;

namespace DmsBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WarrantyController : ControllerBase
{
    private static List<ExtendedWarranty> _warranties = new()
    {
        new ExtendedWarranty 
        { 
            PolicyNumber = "MSW20240001", 
            VIN = "MA3ERLF3S00123456",
            CustomerName = "Rahul Verma", 
            WarrantyType = "Platinum", 
            StartDate = DateTime.Now.AddMonths(-10), 
            EndDate = DateTime.Now.AddDays(8), 
            Premium = 5000,
            GST = 900,
            TotalAmount = 5900,
            Status = "Active",
            CreatedDate = DateTime.Now.AddMonths(-10),
            CreatedBy = "SA001"
        },
        new ExtendedWarranty 
        { 
            PolicyNumber = "MSW20240002", 
            VIN = "MA3ERLF3S00123457",
            CustomerName = "Priya Singh", 
            WarrantyType = "Royal Platinum", 
            StartDate = DateTime.Now.AddMonths(-8), 
            EndDate = DateTime.Now.AddDays(12), 
            Premium = 7500,
            GST = 1350,
            TotalAmount = 8850,
            Status = "Active",
            CreatedDate = DateTime.Now.AddMonths(-8),
            CreatedBy = "SA002"
        },
        new ExtendedWarranty 
        { 
            PolicyNumber = "MSW20240003", 
            VIN = "MA3ERLF3S00123458",
            CustomerName = "Sanjay Kumar", 
            WarrantyType = "Solitaire", 
            StartDate = DateTime.Now.AddMonths(-6), 
            EndDate = DateTime.Now.AddDays(15), 
            Premium = 10000,
            GST = 1800,
            TotalAmount = 11800,
            Status = "Active",
            CreatedDate = DateTime.Now.AddMonths(-6),
            CreatedBy = "SA001"
        }
    };

    [HttpGet]
    public ActionResult<IEnumerable<ExtendedWarranty>> GetAll()
    {
        return Ok(_warranties);
    }

    [HttpGet("{policyNumber}")]
    public ActionResult<ExtendedWarranty> GetByPolicyNumber(string policyNumber)
    {
        var warranty = _warranties.FirstOrDefault(w => w.PolicyNumber == policyNumber);
        if (warranty == null)
            return NotFound();
        return Ok(warranty);
    }

    [HttpPost("register")]
    public ActionResult<ExtendedWarranty> RegisterContract([FromBody] WarrantyRegistrationRequest request)
    {
        // Validate VIN
        var (isVINValid, vinMessage) = ValidationService.ValidateVIN(request.VIN);
        if (!isVINValid)
            return BadRequest(new { message = vinMessage });

        // Validate warranty type
        var (isTypeValid, typeMessage) = ValidationService.ValidateWarrantyType(request.WarrantyType);
        if (!isTypeValid)
            return BadRequest(new { message = typeMessage });

        // Generate policy number
        var policyNumber = $"MSW{DateTime.Now:yyyyMMdd}{_warranties.Count + 1:D4}";

        var warranty = new ExtendedWarranty
        {
            PolicyNumber = policyNumber,
            VIN = request.VIN,
            CustomerCode = request.CustomerCode,
            CustomerName = request.CustomerName,
            WarrantyType = request.WarrantyType,
            Premium = request.Premium,
            GST = request.Premium * 0.18m,
            TotalAmount = request.Premium * 1.18m,
            StartDate = DateTime.Now,
            EndDate = DateTime.Now.AddYears(request.Tenure),
            ContractMileage = request.ContractMileage,
            PaymentMode = request.PaymentMode,
            PremiumReceived = request.PremiumReceived,
            BankName = request.BankName,
            ChequeNumber = request.ChequeNumber,
            BookletNumber = $"BKL{DateTime.Now:yyyyMMdd}{_warranties.Count + 1:D4}",
            Status = "Active",
            CancelFlag = false,
            CreatedBy = request.CreatedBy,
            CreatedDate = DateTime.Now,
            Addons = request.Addons ?? new List<string>()
        };

        _warranties.Add(warranty);
        return CreatedAtAction(nameof(GetByPolicyNumber), new { policyNumber = warranty.PolicyNumber }, warranty);
    }

    [HttpPut("{policyNumber}")]
    public ActionResult<ExtendedWarranty> UpdateContract(string policyNumber, [FromBody] WarrantyUpdateRequest request)
    {
        var warranty = _warranties.FirstOrDefault(w => w.PolicyNumber == policyNumber);
        if (warranty == null)
            return NotFound(new { message = "Warranty contract not found" });

        // Update allowed fields
        if (!string.IsNullOrEmpty(request.CustomerName))
            warranty.CustomerName = request.CustomerName;
        
        if (request.ContractMileage > 0)
            warranty.ContractMileage = request.ContractMileage;

        return Ok(warranty);
    }

    [HttpPost("{policyNumber}/cancel")]
    public ActionResult<object> CancelContract(string policyNumber, [FromBody] CancellationRequest request)
    {
        var warranty = _warranties.FirstOrDefault(w => w.PolicyNumber == policyNumber);
        if (warranty == null)
            return NotFound(new { message = "Warranty contract not found" });

        if (warranty.CancelFlag)
            return BadRequest(new { message = "Contract is already cancelled" });

        warranty.CancelFlag = true;
        warranty.Status = "Cancelled";

        return Ok(new
        {
            message = "Contract cancelled successfully",
            policyNumber = warranty.PolicyNumber,
            cancelledAt = DateTime.Now,
            reason = request.Reason
        });
    }

    [HttpGet("expiring")]
    public ActionResult<IEnumerable<ExtendedWarranty>> GetExpiring()
    {
        var expiring = _warranties.Where(w => 
            w.EndDate <= DateTime.Now.AddDays(30) && 
            w.Status == "Active" &&
            !w.CancelFlag
        );
        return Ok(expiring);
    }

    [HttpGet("stats")]
    public ActionResult<object> GetStats()
    {
        var activeWarranties = _warranties.Count(w => w.Status == "Active" && !w.CancelFlag);
        var expiringCount = _warranties.Count(w => 
            w.EndDate <= DateTime.Now.AddDays(10) && 
            w.Status == "Active" &&
            !w.CancelFlag
        );
        var monthlyRevenue = _warranties
            .Where(w => w.CreatedDate >= DateTime.Now.AddMonths(-1))
            .Sum(w => w.TotalAmount);
        var totalRevenue = _warranties.Sum(w => w.TotalAmount);

        return Ok(new
        {
            activeWarranties,
            expiringCount,
            monthlyRevenue,
            totalRevenue,
            averageContractValue = activeWarranties > 0 ? totalRevenue / activeWarranties : 0,
            planDistribution = _warranties
                .GroupBy(w => w.WarrantyType)
                .Select(g => new { plan = g.Key, count = g.Count() })
                .ToList()
        });
    }
}

public class WarrantyRegistrationRequest
{
    public string VIN { get; set; } = string.Empty;
    public string CustomerCode { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string WarrantyType { get; set; } = string.Empty;
    public decimal Premium { get; set; }
    public int Tenure { get; set; }
    public int ContractMileage { get; set; }
    public string PaymentMode { get; set; } = string.Empty;
    public decimal PremiumReceived { get; set; }
    public string? BankName { get; set; }
    public string? ChequeNumber { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public List<string>? Addons { get; set; }
}

public class WarrantyUpdateRequest
{
    public string? CustomerName { get; set; }
    public int ContractMileage { get; set; }
}

public class CancellationRequest
{
    public string Reason { get; set; } = string.Empty;
}
