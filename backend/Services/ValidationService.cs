using System.Text.RegularExpressions;
using DmsBackend.Models;

namespace DmsBackend.Services;

public class ValidationService
{
    // VIN Validation - 17 character alphanumeric
    public static (bool isValid, string message) ValidateVIN(string vin)
    {
        if (string.IsNullOrWhiteSpace(vin))
            return (false, "VIN is required");

        if (vin.Length != 17)
            return (false, "VIN must be exactly 17 characters");

        if (!Regex.IsMatch(vin, "^[A-HJ-NPR-Z0-9]{17}$"))
            return (false, "Invalid VIN format");

        return (true, "Valid VIN");
    }

    // GST Number Validation - 15 character alphanumeric
    public static (bool isValid, string message) ValidateGST(string gstNumber)
    {
        if (string.IsNullOrWhiteSpace(gstNumber))
            return (false, "GST Number is required");

        if (gstNumber.Length != 15)
            return (false, "GST Number must be exactly 15 characters");

        if (!Regex.IsMatch(gstNumber, "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"))
            return (false, "Invalid GST Number format");

        return (true, "Valid GST Number");
    }

    // Vehicle Eligibility Check
    public static (bool isEligible, string reason) CheckEligibility(DateTime manufactureDate, int mileage)
    {
        var vehicleAge = (DateTime.Now - manufactureDate).TotalDays / 365.25;

        // Vehicle must be less than 5 years old
        if (vehicleAge > 5)
            return (false, "Vehicle is not eligible for extended warranty - Age exceeds 5 years");

        // Vehicle must have less than 100,000 km
        if (mileage > 100000)
            return (false, "Vehicle is not eligible for extended warranty - Mileage exceeds 100,000 km");

        // Vehicle must be at least 6 months old
        if (vehicleAge < 0.5)
            return (false, "Vehicle is not eligible for extended warranty - Must be at least 6 months old");

        return (true, "Vehicle is eligible for extended warranty");
    }

    // Payment Mode Validation
    public static (bool isValid, string message) ValidatePaymentMode(string paymentMode, string? bankName, string? chequeNumber)
    {
        var validModes = new[] { "CASH", "CHEQUE", "CARD", "UPI", "EMI", "WALLET" };
        
        if (!validModes.Contains(paymentMode.ToUpper()))
            return (false, "Invalid payment mode");

        if (paymentMode.ToUpper() == "CHEQUE")
        {
            if (string.IsNullOrWhiteSpace(bankName))
                return (false, "Bank name is required for cheque payment");
            
            if (string.IsNullOrWhiteSpace(chequeNumber))
                return (false, "Cheque number is required for cheque payment");
        }

        return (true, "Valid payment mode");
    }

    // Document Count Validation
    public static (bool isValid, string message) ValidateDocuments(List<DocumentUpload> documents)
    {
        if (documents == null || documents.Count < 4)
            return (false, "Please upload minimum 4 documents");

        return (true, "Documents validated");
    }

    // Warranty Type Validation
    public static (bool isValid, string message) ValidateWarrantyType(string warrantyType)
    {
        var validTypes = new[] { "PLAT", "RPLAT", "SOLI", "GOLD", "SILV" };
        
        if (!validTypes.Contains(warrantyType.ToUpper()))
            return (false, "Invalid warranty type");

        return (true, "Valid warranty type");
    }

    // Mobile Number Validation
    public static (bool isValid, string message) ValidateMobile(string mobile)
    {
        if (string.IsNullOrWhiteSpace(mobile))
            return (false, "Mobile number is required");

        // Remove any spaces or special characters
        mobile = Regex.Replace(mobile, @"[^\d]", "");

        if (mobile.Length != 10)
            return (false, "Mobile number must be 10 digits");

        if (!Regex.IsMatch(mobile, "^[6-9][0-9]{9}$"))
            return (false, "Invalid mobile number format");

        return (true, "Valid mobile number");
    }

    // Email Validation
    public static (bool isValid, string message) ValidateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return (false, "Email is required");

        if (!Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            return (false, "Invalid email format");

        return (true, "Valid email");
    }
}
