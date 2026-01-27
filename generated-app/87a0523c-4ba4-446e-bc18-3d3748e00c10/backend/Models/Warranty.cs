public class Warranty
{
    public int Id { get; set; }
    public string PolicyNumber { get; set; } = string.Empty;
    public string VehicleVin { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; } = "Active";
    public decimal Premium { get; set; }
    public int CustomerId { get; set; }
}
