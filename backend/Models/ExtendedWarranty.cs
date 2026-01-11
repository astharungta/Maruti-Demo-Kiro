namespace DmsBackend.Models;

public class ExtendedWarranty
{
    public string PolicyNumber { get; set; } = string.Empty;
    public string VIN { get; set; } = string.Empty;
    public string CustomerCode { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string WarrantyType { get; set; } = string.Empty;
    public decimal Premium { get; set; }
    public decimal GST { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int ContractMileage { get; set; }
    public string PaymentMode { get; set; } = string.Empty;
    public decimal PremiumReceived { get; set; }
    public string? BankName { get; set; }
    public string? ChequeNumber { get; set; }
    public string BookletNumber { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";
    public bool CancelFlag { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public List<string> Addons { get; set; } = new();
}

public class WarrantyOffer
{
    public string VIN { get; set; } = string.Empty;
    public string WarrantyType { get; set; } = string.Empty;
    public int Tenure { get; set; }
    public decimal BasePremium { get; set; }
    public List<AddonOption> AvailableAddons { get; set; } = new();
    public decimal GST { get; set; }
    public decimal TotalAmount { get; set; }
}

public class AddonOption
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
}

public class ProductRecommendation
{
    public string RecommendedPlan { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public List<WarrantyPlan> AlternativePlans { get; set; } = new();
}

public class WarrantyPlan
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public int MaxTenure { get; set; }
    public List<string> Coverage { get; set; } = new();
}
