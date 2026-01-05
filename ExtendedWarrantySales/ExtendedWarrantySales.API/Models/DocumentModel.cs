namespace MarutiSuzuki.ExtendedWarrantySales.API.Models;

public class DocumentModel
{
    [MaxLength(500)]
    public string Remarks { get; set; }
}