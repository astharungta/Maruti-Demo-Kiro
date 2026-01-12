namespace DmsBackend.Models;

public class Vehicle
{
    public string VIN { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public string RegistrationNumber { get; set; } = string.Empty;
    public DateTime ManufactureDate { get; set; }
    public int Mileage { get; set; }
    public string DealerCode { get; set; } = string.Empty;
    public bool IsEligible { get; set; }
    public string EligibilityReason { get; set; } = string.Empty;
}

public class VINEnquiryRequest
{
    public string VIN { get; set; } = string.Empty;
    public int CurrentMileage { get; set; }
}

public class VINEnquiryResponse
{
    public bool IsValid { get; set; }
    public bool IsEligible { get; set; }
    public string Message { get; set; } = string.Empty;
    public Vehicle? VehicleDetails { get; set; }
    public List<string> EligiblePlans { get; set; } = new();
}
