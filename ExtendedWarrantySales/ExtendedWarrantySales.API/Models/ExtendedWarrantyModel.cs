namespace Company.ExtendedWarrantySales.API.Models;

public class ExtendedWarrantyModel
{
    [Required]
    [MaxLength(100)]
    public string Vin { get; set; }

    [Required]
    [MaxLength(50)]
    public string ExteWarrTypeOld { get; set; }

    [Required]
    [MaxLength(50)]
    public string ExteWarrTypeNew { get; set; }

    [Required]
    public int ExteContractMileage { get; set; }

    [Required]
    [MaxLength(20)]
    public string PayMode { get; set; }
}