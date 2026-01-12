using System.Text.RegularExpressions;

namespace DmsBackend.Services;

public class ValidationService
{
    // VIN Validation - BRD: 17-25 characters, uppercase, alphanumeric (OEM VIN format)
    public static (bool isValid, string message) ValidateVIN(string vin)
    {
        if (string.IsNullOrWhiteSpace(vin))
            return (false, "VIN is required (BRD: Mandatory field)");

        // BRD Rule: Upper case only
        var upperVin = vin.ToUpper();

        // BRD Rule: 17-25 characters (OEM VIN format)
        if (upperVin.Length < 17 || upperVin.Length > 25)
            return (false, "VIN must be 17-25 characters (BRD: OEM VIN format)");

        // BRD Rule: Alphanumeric only
        if (!Regex.IsMatch(upperVin, "^[A-Z0-9]+$"))
            return (false, "VIN must contain only letters and numbers (BRD: OEM format)");

        return (true, "Valid VIN (BRD validated)");
    }

    // GST Number Validation - BRD: 15 characters, specific format (pkg_einv.sp_validate_gstn)
    public static (bool isValid, string message) ValidateGST(string gstNumber)
    {
        if (string.IsNullOrWhiteSpace(gstNumber))
            return (false, "GST number is required (BRD: Mandatory)");

        // BRD Rule: 15 characters
        if (gstNumber.Length != 15)
            return (false, "GST number must be 15 characters (BRD: Length validation)");

        // BRD Rule: GST format - 2 digits, 5 letters, 4 digits, 1 letter, 1 alphanumeric, Z, 1 alphanumeric
        if (!Regex.IsMatch(gstNumber, "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"))
            return (false, "Invalid GST number format (BRD: pkg_einv.sp_validate_gstn)");

        return (true, "Valid GST number (BRD validated)");
    }

    // Vehicle Eligibility Check - BRD: Based on warranty type (OLD/NEW) and mileage limits
    public static (bool isEligible, string reason) CheckEligibility(DateTime retailDate, int mileage, string warrantyType = "NEW")
    {
        var vehicleAge = (DateTime.Now - retailDate).TotalDays / 365.25;

        // BRD Rule: Determine mileage limit based on warranty type
        // OLD type: 40,000 km, NEW type: 100,000 km
        int maxMileage = warrantyType == "OLD" ? 40000 : 100000;

        // BRD Rule: Vehicle must have mileage <= purchase limit
        if (mileage > maxMileage)
            return (false, $"Vehicle is not eligible - Mileage exceeds {maxMileage} km (BRD: {warrantyType} type limit)");

        // BRD Rule: Warranty eligibility via PKG_EXTE_WAR.SP_EW_VIN_VALIDATE
        // Typically vehicles must be within warranty period
        if (vehicleAge > 10)
            return (false, "Vehicle is not eligible - Age exceeds warranty period (BRD: Eligibility check)");

        return (true, "Vehicle is eligible for extended warranty (BRD validated)");
    }

    // Payment Mode Validation - BRD: Cannot be NULL, controls OTP and loyalty
    public static (bool isValid, string message) ValidatePaymentMode(string paymentMode, string? bankName, string? chequeNumber)
    {
        // BRD Rule: Valid payment modes (C=Cash, O=Online, etc.)
        var validModes = new[] { "C", "CASH", "O", "ONLINE", "CHEQUE", "CARD", "UPI", "EMI", "WALLET" };
        
        if (string.IsNullOrWhiteSpace(paymentMode))
            return (false, "Payment mode is required (BRD: Cannot be NULL)");

        if (!validModes.Contains(paymentMode.ToUpper()))
            return (false, "Invalid payment mode (BRD: Please select payment mode)");

        // BRD Rule: Cheque/DD requires bank details
        if (paymentMode.ToUpper() == "CHEQUE")
        {
            if (string.IsNullOrWhiteSpace(bankName))
                return (false, "Bank name is required for cheque payment (BRD: Mandatory for cheque/DD)");
            
            if (string.IsNullOrWhiteSpace(chequeNumber))
                return (false, "Cheque number is required for cheque payment (BRD: Mandatory for cheque/DD)");
        }

        return (true, "Valid payment mode (BRD validated)");
    }

    // Document Count Validation - BRD: Minimum 4 documents required
    public static (bool isValid, string message) ValidateDocuments(int documentCount)
    {
        if (documentCount < 4)
            return (false, "Please upload minimum 4 documents (BRD: Minimum requirement)");

        return (true, "Documents validated (BRD validated)");
    }

    // Warranty Type Validation - BRD: Must exist in VM_EW_PARAM
    public static (bool isValid, string message) ValidateWarrantyType(string warrantyType)
    {
        // BRD Rule: Valid warranty types from VM_EW_PARAM
        var validTypes = new[] { "PLAT", "RPLAT", "SOLI", "GOLD", "SILV" };
        
        if (string.IsNullOrWhiteSpace(warrantyType))
            return (false, "Warranty type is required (BRD: Mandatory)");

        if (!validTypes.Contains(warrantyType.ToUpper()))
            return (false, "Invalid warranty type (BRD: Must exist in VM_EW_PARAM)");

        return (true, "Valid warranty type (BRD validated)");
    }

    // Mobile Number Validation - BRD: 10 digits, starts with 6-9 (Indian mobile format)
    public static (bool isValid, string message) ValidateMobile(string mobile)
    {
        if (string.IsNullOrWhiteSpace(mobile))
            return (false, "Phone number is required (BRD: Mandatory)");

        // Remove any spaces or special characters
        var cleaned = Regex.Replace(mobile, @"[^\d]", "");

        // BRD Rule: 10 digit Indian mobile number
        if (cleaned.Length != 10)
            return (false, "Phone must be 10 digits (BRD: Indian mobile format)");

        // BRD Rule: Must start with 6-9
        if (!Regex.IsMatch(cleaned, "^[6-9][0-9]{9}$"))
            return (false, "Phone must start with 6, 7, 8, or 9 (BRD: Indian mobile)");

        return (true, "Valid phone number (BRD validated)");
    }

    // Email Validation - BRD: Standard email format
    public static (bool isValid, string message) ValidateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return (false, "Email is required (BRD: Mandatory)");

        // BRD Rule: Email format validation
        if (!Regex.IsMatch(email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$"))
            return (false, "Invalid email format (BRD: Standard email validation)");

        return (true, "Valid email (BRD validated)");
    }

    // Name Validation - BRD: Min 3 characters, letters and spaces only
    public static (bool isValid, string message) ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return (false, "Name is required (BRD: Mandatory)");

        // BRD Rule: Min 3 characters validated
        if (name.Length < 3)
            return (false, "Name must be at least 3 characters (BRD: Min length)");

        // BRD Rule: Letters and spaces only
        if (!Regex.IsMatch(name, @"^[a-zA-Z\s]+$"))
            return (false, "Name can only contain letters and spaces (BRD: Format)");

        return (true, "Valid name (BRD validated)");
    }

    // Mileage Validation - BRD: Must be within limits (40K OLD, 100K NEW)
    public static (bool isValid, string message) ValidateMileage(int mileage, int minMileage = 0, int maxMileage = 100000)
    {
        if (mileage < 0)
            return (false, "Mileage must be a positive number (BRD: Validation)");

        // BRD Rule: Must be >= DUMMY_MILEAGE (last service)
        if (mileage < minMileage)
            return (false, $"Mileage must be >= {minMileage} km (BRD: >= last service)");

        // BRD Rule: Must be <= NB_EWR_PUR_MILEAGE (purchase limit: 40K OLD, 100K NEW)
        if (mileage > maxMileage)
            return (false, $"Mileage must be <= {maxMileage} km (BRD: Purchase limit)");

        return (true, "Valid mileage (BRD validated)");
    }

    // Address Validation - BRD: Min 3 characters required
    public static (bool isValid, string message) ValidateAddress(string address)
    {
        if (string.IsNullOrWhiteSpace(address))
            return (false, "Address is required (BRD: Mandatory)");

        // BRD Rule: Min 3 chars required
        if (address.Length < 3)
            return (false, "Address must be at least 3 characters (BRD: Min length)");

        return (true, "Valid address (BRD validated)");
    }
}
