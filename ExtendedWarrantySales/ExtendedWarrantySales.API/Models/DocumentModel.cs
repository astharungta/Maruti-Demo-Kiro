namespace Company.ExtendedWarrantySales.API.Models;

public class DocumentModel
{
    [MaxLength(200)]
    public string Remarks { get; set; }
}