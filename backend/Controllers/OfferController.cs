using Microsoft.AspNetCore.Mvc;
using DmsBackend.Models;
using DmsBackend.Services;

namespace DmsBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfferController : ControllerBase
{
    private static readonly Dictionary<string, WarrantyPlan> _plans = new()
    {
        ["PLAT"] = new WarrantyPlan
        {
            Code = "PLAT",
            Name = "Platinum",
            Description = "Comprehensive coverage for engine, transmission, and electrical systems",
            BasePrice = 5000,
            MaxTenure = 3,
            Coverage = new List<string> { "Engine", "Transmission", "Electrical", "Fuel System" }
        },
        ["RPLAT"] = new WarrantyPlan
        {
            Code = "RPLAT",
            Name = "Royal Platinum",
            Description = "Premium coverage including AC and advanced electronics",
            BasePrice = 7500,
            MaxTenure = 4,
            Coverage = new List<string> { "Engine", "Transmission", "Electrical", "Fuel System", "AC", "Electronics" }
        },
        ["SOLI"] = new WarrantyPlan
        {
            Code = "SOLI",
            Name = "Solitaire",
            Description = "Ultimate coverage with zero depreciation",
            BasePrice = 10000,
            MaxTenure = 5,
            Coverage = new List<string> { "Engine", "Transmission", "Electrical", "Fuel System", "AC", "Electronics", "Zero Depreciation" }
        }
    };

    private static readonly List<AddonOption> _addons = new()
    {
        new AddonOption { Code = "RSA", Name = "Roadside Assistance", Description = "24x7 roadside assistance", Price = 1500 },
        new AddonOption { Code = "TYRE", Name = "Tyre Protection", Description = "Coverage for tyre damage", Price = 2000 },
        new AddonOption { Code = "KEY", Name = "Key Replacement", Description = "Lost key replacement", Price = 1000 },
        new AddonOption { Code = "BATT", Name = "Battery Protection", Description = "Battery replacement coverage", Price = 1200 }
    };

    [HttpPost("generate")]
    public ActionResult<WarrantyOffer> GenerateOffer([FromBody] OfferRequest request)
    {
        // Validate warranty type
        var (isValid, message) = ValidationService.ValidateWarrantyType(request.WarrantyType);
        if (!isValid)
            return BadRequest(new { message });

        if (!_plans.ContainsKey(request.WarrantyType.ToUpper()))
            return BadRequest(new { message = "Invalid warranty type" });

        var plan = _plans[request.WarrantyType.ToUpper()];
        
        if (request.Tenure > plan.MaxTenure)
            return BadRequest(new { message = $"Maximum tenure for {plan.Name} is {plan.MaxTenure} years" });

        var basePremium = plan.BasePrice * request.Tenure;
        var gst = basePremium * 0.18m;
        var totalAmount = basePremium + gst;

        var offer = new WarrantyOffer
        {
            VIN = request.VIN,
            WarrantyType = plan.Name,
            Tenure = request.Tenure,
            BasePremium = basePremium,
            AvailableAddons = _addons,
            GST = gst,
            TotalAmount = totalAmount
        };

        return Ok(offer);
    }

    [HttpPost("recommend")]
    public ActionResult<ProductRecommendation> RecommendProduct([FromBody] RecommendationRequest request)
    {
        // Simple recommendation logic based on vehicle age and mileage
        var vehicleAge = (DateTime.Now - request.ManufactureDate).TotalDays / 365.25;
        
        string recommendedPlan;
        string reason;

        if (vehicleAge < 2 && request.Mileage < 30000)
        {
            recommendedPlan = "SOLI";
            reason = "Your vehicle is relatively new with low mileage. Solitaire plan offers the best comprehensive coverage.";
        }
        else if (vehicleAge < 3 && request.Mileage < 50000)
        {
            recommendedPlan = "RPLAT";
            reason = "Royal Platinum plan provides excellent coverage for your vehicle's age and usage.";
        }
        else
        {
            recommendedPlan = "PLAT";
            reason = "Platinum plan offers essential coverage suitable for your vehicle's profile.";
        }

        var recommendation = new ProductRecommendation
        {
            RecommendedPlan = _plans[recommendedPlan].Name,
            Reason = reason,
            AlternativePlans = _plans.Values.Where(p => p.Code != recommendedPlan).ToList()
        };

        return Ok(recommendation);
    }

    [HttpGet("plans")]
    public ActionResult<List<WarrantyPlan>> GetAllPlans()
    {
        return Ok(_plans.Values.ToList());
    }

    [HttpGet("addons")]
    public ActionResult<List<AddonOption>> GetAllAddons()
    {
        return Ok(_addons);
    }
}

public class OfferRequest
{
    public string VIN { get; set; } = string.Empty;
    public string WarrantyType { get; set; } = string.Empty;
    public int Tenure { get; set; }
}

public class RecommendationRequest
{
    public string VIN { get; set; } = string.Empty;
    public DateTime ManufactureDate { get; set; }
    public int Mileage { get; set; }
}
