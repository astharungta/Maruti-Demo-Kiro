public class Claim
{
    public int Id { get; set; }
    public string ClaimNumber { get; set; } = string.Empty;
    public int WarrantyId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime FiledDate { get; set; }
    public DateTime? ResolvedDate { get; set; }
}
