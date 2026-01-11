using Microsoft.AspNetCore.Mvc;
using DmsBackend.Models;
using DmsBackend.Services;

namespace DmsBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class KYCController : ControllerBase
{
    [HttpPost("verify")]
    public ActionResult<KYCResponse> VerifyKYC([FromBody] KYCRequest request)
    {
        // Validate GST Number
        var (isGSTValid, gstMessage) = ValidationService.ValidateGST(request.GSTNumber);
        if (!isGSTValid)
        {
            return BadRequest(new KYCResponse
            {
                IsValid = false,
                GSTVerified = false,
                Message = gstMessage,
                DocumentsUploaded = request.Documents?.Count ?? 0
            });
        }

        // Validate Documents
        var (areDocsValid, docsMessage) = ValidationService.ValidateDocuments(request.Documents?.Count ?? 0);
        if (!areDocsValid)
        {
            return BadRequest(new KYCResponse
            {
                IsValid = false,
                GSTVerified = true,
                Message = docsMessage,
                DocumentsUploaded = request.Documents?.Count ?? 0
            });
        }

        return Ok(new KYCResponse
        {
            IsValid = true,
            GSTVerified = true,
            Message = "KYC verification successful",
            DocumentsUploaded = request.Documents.Count
        });
    }

    [HttpPost("validate-gst")]
    public ActionResult<object> ValidateGST([FromBody] GSTValidationRequest request)
    {
        var (isValid, message) = ValidationService.ValidateGST(request.GSTNumber);
        
        return Ok(new
        {
            isValid,
            message,
            gstNumber = request.GSTNumber
        });
    }
}

public class GSTValidationRequest
{
    public string GSTNumber { get; set; } = string.Empty;
}
