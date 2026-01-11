using Microsoft.AspNetCore.Mvc;
using DmsBackend.Models;
using DmsBackend.Services;

namespace DmsBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    [HttpPost("process")]
    public ActionResult<PaymentResponse> ProcessPayment([FromBody] PaymentRequest request)
    {
        // Validate payment mode
        var (isValid, message) = ValidationService.ValidatePaymentMode(
            request.PaymentMode,
            request.BankName,
            request.ChequeNumber
        );

        if (!isValid)
        {
            return BadRequest(new PaymentResponse
            {
                Success = false,
                Message = message
            });
        }

        // Generate transaction ID
        var transactionId = $"TXN{DateTime.Now:yyyyMMddHHmmss}{new Random().Next(1000, 9999)}";

        return Ok(new PaymentResponse
        {
            Success = true,
            Message = "Payment processed successfully",
            TransactionId = transactionId,
            Amount = request.Amount,
            PaymentMode = request.PaymentMode,
            ProcessedAt = DateTime.Now
        });
    }

    [HttpPost("validate")]
    public ActionResult<object> ValidatePayment([FromBody] PaymentRequest request)
    {
        var (isValid, message) = ValidationService.ValidatePaymentMode(
            request.PaymentMode,
            request.BankName,
            request.ChequeNumber
        );

        return Ok(new { isValid, message });
    }
}

public class PaymentRequest
{
    public string PolicyNumber { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string PaymentMode { get; set; } = string.Empty;
    public string? BankName { get; set; }
    public string? ChequeNumber { get; set; }
}

public class PaymentResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public string TransactionId { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string PaymentMode { get; set; } = string.Empty;
    public DateTime ProcessedAt { get; set; }
}
