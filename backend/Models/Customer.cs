namespace DmsBackend.Models;

public class Customer
{
    public string CustomerCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Mobile { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string GSTNumber { get; set; } = string.Empty;
    public bool KYCVerified { get; set; }
    public List<string> Documents { get; set; } = new();
}

public class KYCRequest
{
    public string CustomerCode { get; set; } = string.Empty;
    public string GSTNumber { get; set; } = string.Empty;
    public List<DocumentUpload> Documents { get; set; } = new();
}

public class DocumentUpload
{
    public string DocumentType { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string Base64Content { get; set; } = string.Empty;
}

public class KYCResponse
{
    public bool IsValid { get; set; }
    public bool GSTVerified { get; set; }
    public string Message { get; set; } = string.Empty;
    public int DocumentsUploaded { get; set; }
}
