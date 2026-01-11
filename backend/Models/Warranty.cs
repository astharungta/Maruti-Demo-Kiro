namespace DmsBackend.Models;

public class Warranty
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string VehicleModel { get; set; } = string.Empty;
    public string RegistrationNumber { get; set; } = string.Empty;
    public string PlanType { get; set; } = string.Empty;
    public DateTime PurchaseDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Active";
}

public class WarrantyRequest
{
    public string CustomerName { get; set; } = string.Empty;
    public string VehicleModel { get; set; } = string.Empty;
    public string RegistrationNumber { get; set; } = string.Empty;
    public string PlanType { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}
