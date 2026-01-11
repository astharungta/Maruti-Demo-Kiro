using Microsoft.AspNetCore.Mvc;
using DmsBackend.Models;
using DmsBackend.Services;

namespace DmsBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VINController : ControllerBase
{
    // Sample vehicle database
    private static readonly List<Vehicle> _vehicles = new()
    {
        new Vehicle { VIN = "MA3ERLF3S00123456", Model = "Swift VXI", RegistrationNumber = "DL-01-AB-1234", ManufactureDate = DateTime.Now.AddYears(-2), Mileage = 25000, DealerCode = "DLR001" },
        new Vehicle { VIN = "MA3ERLF3S00123457", Model = "Baleno Delta", RegistrationNumber = "DL-02-CD-5678", ManufactureDate = DateTime.Now.AddYears(-3), Mileage = 45000, DealerCode = "DLR001" },
        new Vehicle { VIN = "MA3ERLF3S00123458", Model = "Dzire VXI", RegistrationNumber = "DL-03-EF-9012", ManufactureDate = DateTime.Now.AddYears(-1), Mileage = 15000, DealerCode = "DLR002" },
        new Vehicle { VIN = "MA3ERLF3S00123459", Model = "Ertiga ZXI", RegistrationNumber = "DL-04-GH-3456", ManufactureDate = DateTime.Now.AddYears(-4), Mileage = 75000, DealerCode = "DLR001" },
    };

    [HttpPost("enquiry")]
    public ActionResult<VINEnquiryResponse> VINEnquiry([FromBody] VINEnquiryRequest request)
    {
        // Validate VIN format
        var (isValid, message) = ValidationService.ValidateVIN(request.VIN);
        if (!isValid)
        {
            return BadRequest(new VINEnquiryResponse
            {
                IsValid = false,
                IsEligible = false,
                Message = message
            });
        }

        // Find vehicle
        var vehicle = _vehicles.FirstOrDefault(v => v.VIN == request.VIN);
        if (vehicle == null)
        {
            return NotFound(new VINEnquiryResponse
            {
                IsValid = false,
                IsEligible = false,
                Message = "Invalid VIN - Vehicle not found"
            });
        }

        // Update mileage
        vehicle.Mileage = request.CurrentMileage;

        // Check eligibility
        var (isEligible, reason) = ValidationService.CheckEligibility(vehicle.ManufactureDate, vehicle.Mileage);
        vehicle.IsEligible = isEligible;
        vehicle.EligibilityReason = reason;

        var eligiblePlans = new List<string>();
        if (isEligible)
        {
            eligiblePlans = new List<string> { "Platinum", "Royal Platinum", "Solitaire" };
        }

        return Ok(new VINEnquiryResponse
        {
            IsValid = true,
            IsEligible = isEligible,
            Message = reason,
            VehicleDetails = vehicle,
            EligiblePlans = eligiblePlans
        });
    }

    [HttpGet("{vin}")]
    public ActionResult<Vehicle> GetVehicleByVIN(string vin)
    {
        var vehicle = _vehicles.FirstOrDefault(v => v.VIN == vin);
        if (vehicle == null)
            return NotFound(new { message = "Vehicle not found" });

        return Ok(vehicle);
    }
}
