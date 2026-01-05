namespace Company.MigratedApp.API.Models;

public class MainEntity
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
}