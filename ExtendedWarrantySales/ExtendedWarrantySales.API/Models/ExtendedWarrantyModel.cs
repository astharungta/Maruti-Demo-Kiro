namespace MarutiSuzuki.ExtendedWarrantySales.API.Models;

public class ExtendedWarrantyModel
{
    [Required]
    [MaxLength(100)]
    public string VIN { get; set; }

    [Required]
    [MaxLength(50)]
    public string OldWarrantyType { get; set; }

    [Required]
    [MaxLength(50)]
    public string NewWarrantyType { get; set; }

    [Required]
    public int ContractMileage { get; set; }

    [Required]
    [MaxLength(20)]
    public string PaymentMode { get; set; }
}