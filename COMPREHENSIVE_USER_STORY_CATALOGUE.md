# 📋 Comprehensive User Story Catalogue
## Extended Warranty Management System

**Generated:** 1/16/2026, 1:22:42 PM  
**Source:** Figma Design Code Files + ExtendedWarranty Field Rules & Defaults Document  
**Application:** Maruti Suzuki Extended Warranty Portal  
**Database:** Oracle Database with MWAR_EXTE, GM_VIN, GM_CIN, VM_EW_PARAM, GM_VAR tables

---

## 📊 Executive Summary

| Metric | Count |
|--------|-------|
| Total User Stories | 20 |
| Epics | 7 |
| Workflow Steps | 9 |
| Database Tables Referenced | 12+ |
| Stored Procedures Referenced | 15+ |
| Total Fields Documented | 197 |

### Epics Overview
1. **Vehicle Identification & Eligibility** - 3 user stories
2. **Plan Selection & Customization** - 3 user stories
3. **Customer Verification** - 2 user stories
4. **Policy & Payment** - 6 user stories
5. **Invoice & Delivery** - 4 user stories
6. **Contract Query & Management** - 1 user stories
7. **Workflow Navigation** - 1 user stories

---

## 🎯 User Journey Overview

The Extended Warranty workflow consists of 9 sequential steps:

| Step | Name | Primary Actor | Key Fields | Validation Complexity |
|------|------|---------------|------------|----------------------|
| 1 | Vehicle Identification | Dealer | VIN (546 lines trigger) | HIGH |
| 2 | Eligibility Check | System | NB_EWR_PUR_MILEAGE, NB_EWR_TYPE | HIGH |
| 3 | Plan Selection | Dealer/Customer | EXTE_WARR_TYPE, EXTE_VALID_DATE | MEDIUM |
| 4 | Add-ons Selection | Dealer/Customer | ADDON_YN, ADDON_TOT_AMT | MEDIUM |
| 5 | KYC Verification | Customer | EXTE_CUST_*, Documents | MEDIUM |
| 6 | Policy Confirmation | Dealer/Customer | EXTE_CONTRACT_MILEAGE, EXTE_EMP_CD | MEDIUM |
| 7 | Payment Processing | Customer | PAY_MODE, LOYL_REDEEM_PTS | MEDIUM |
| 8 | Invoice Generation | System | GST fields, TOTAL_PREMIUM | LOW |
| 9 | Delivery Completion | Dealer | Email, SMS delivery | LOW |

---

## 🔑 Critical Business Rules Summary

### Mileage Defaults (from GM_VAR table)
| Warranty Type | Mileage Limit | Source Field | Fallback |
|---------------|---------------|--------------|----------|
| OLD | 40,000 km | svar_warr_kms | 40,000 km |
| NEW | 100,000 km | svar_warr_kms_new | 100,000 km |

### GST Calculation Rules
| Condition | GST Type | Rates Applied |
|-----------|----------|---------------|
| warranty_state = customer_state | S (State) | CGST 9% + SGST 9% |
| warranty_state ≠ customer_state | I (Interstate) | IGST 18% |

### Premium Formula
```
TOTAL_PREMIUM = EXTE_PREMIUM_CALCULATED + CGST + SGST + IGST + CCP_TOTAL - LOYL_REDEEM_AMT
```

### Document Requirements
- Minimum 4 documents required
- Maximum file size: 5MB (5120 KB)
- Accepted formats: pdf, jpg, png, doc
- REMARKS mandatory for each document

---

## 📝 User Stories by Epic

### Vehicle Identification & Eligibility

| ID | Title | Actor | Key Fields |
|----|-------|-------|------------|
| CUS-001 | Capture Vehicle VIN for Warranty Eligibility | Dealer | VIN, EXTE_VIN_NO |
| CUS-002 | Scan RC Document for Vehicle Details | Dealer | EXTE_REGISTRATION_NO |
| CUS-003 | Check Vehicle Warranty Eligibility | System | NB_EWR_PUR_MILEAGE, EXTE_VALID_MILEAGE |

### Plan Selection & Customization

| ID | Title | Actor | Key Fields |
|----|-------|-------|------------|
| CUS-004 | View and Compare Warranty Plans | Dealer/Customer | EXTE_WARR_TYPE, NB_EXTE_WARR_TYPE_OLD |
| CUS-005 | Select Warranty Coverage Tenure | Dealer/Customer | EXTE_VALID_DATE, EXTE_CONTRACT_DATE |
| CUS-006 | Select Optional CCP Coverage Add-ons | Dealer/Customer | ADDON_CODE, ADDON_YN |

### Customer Verification

| ID | Title | Actor | Key Fields |
|----|-------|-------|------------|
| CUS-007 | Verify Customer Using Existing KYC | Customer | EXTE_CUST_CD, EXTE_CUST_NAME |
| CUS-008 | Complete Manual KYC Entry | Customer | REMARKS, DOC_SIZE |

### Policy & Payment

| ID | Title | Actor | Key Fields |
|----|-------|-------|------------|
| CUS-009 | Review Policy Details and Premium Breakdown | Dealer/Customer | EXTE_POLICY_NO, EXTE_PREMIUM_CALCULATED |
| CUS-010 | Select Payment Method | Customer | PAY_MODE, EXTE_PREMIUM_RCVD |
| CUS-011 | Pay Using Cheque or Demand Draft | Customer | EXTE_BANK_NAME, EXTE_CHEQUE_NO |
| CUS-012 | Redeem Loyalty Points for Payment | Customer | NB_LOY_CARD_NUM, NB_LOY_BAL_POINT |
| CUS-013 | Enter Contract Mileage | Dealer | EXTE_CONTRACT_MILEAGE, DUMMY_MILEAGE |
| CUS-014 | Assign Service Advisor / DSE | Dealer | EXTE_EMP_CD, NB_EMP_NAME |

### Invoice & Delivery

| ID | Title | Actor | Key Fields |
|----|-------|-------|------------|
| CUS-015 | Generate Invoice After Payment | System | SAC_CODE, GST_STATE_CD |
| CUS-016 | Send Policy Documents via Email | Dealer | EXTE_CUST_EMAIL |
| CUS-017 | Send Confirmation SMS | Dealer | EXTE_CUST_MOBILE, EXTE_CUST_PHONE |
| CUS-018 | Complete Warranty Delivery Process | Dealer | STATUS, EXTE_CANCEL_FLAG |

### Contract Query & Management

| ID | Title | Actor | Key Fields |
|----|-------|-------|------------|
| CUS-019 | Query Existing Warranty Contract | Dealer | NB_EWARR_NUM |

### Workflow Navigation

| ID | Title | Actor | Key Fields |
|----|-------|-------|------------|
| CUS-020 | Navigate Through Warranty Workflow Steps | Dealer | - |

---

## 📖 Detailed User Stories with Field Rules

### CUS-001: Capture Vehicle VIN for Warranty Eligibility

**Epic:** Vehicle Identification & Eligibility  
**Actor:** Dealer  
**Frontend Component:** `vehicle-id-capture.tsx`  
**Backend Services:** VIN validation API (sp_validate_oemvin), GM_VIN table, GM_CIN table, PKG_EXTE_WAR.SP_EW_VIN_VALIDATE

#### User Story
> As a dealer, I want to capture the vehicle VIN number so that I can check if the vehicle is eligible for extended warranty.

#### Acceptance Criteria
1. VIN input field accepts 17-25 alphanumeric characters (BRD: VIN field)
2. VIN is automatically converted to uppercase
3. VIN is validated in real-time using sp_validate_oemvin procedure
4. Invalid VIN format shows error: "Invalid VIN format"
5. System fetches vehicle details from GM_VIN table (make, model, year, registration)
6. System fetches customer details from GM_CIN table (name, address, mobile, email)
7. Multiple vehicles can be added for batch processing
8. VIN validation triggers population of 40+ fields automatically

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| VIN | VARCHAR2(25) | Yes | 17-25 chars, uppercase, OEM format | - |
| EXTE_VIN_NO | VARCHAR2(17) | Auto | First 17 chars of OEM VIN | - |
| OEM_VIN_NUMBER | VARCHAR2(25) | Auto | Complete OEM VIN | - |
| EXTE_CHASSIS_NO | VARCHAR2(7) | Auto | Last 7 chars of VIN | - |

#### Business Rules
- VIN validation is the MOST COMPLEX trigger (546 lines of code)
- Populates vehicle fields: EXTE_MODL_CODE, EXTE_VARIANT_CD, EXTE_SERV_MODL, EXTE_ENGINE_NO
- Populates customer fields: EXTE_CUST_NAME, EXTE_CUST_ADD1/2/3, EXTE_CUST_CITY, EXTE_CUST_STATE
- Determines warranty type (OLD/NEW) based on retail date vs P_EWR_CHANGE_DATE
- Retrieves mileage defaults from GM_VAR table (40K for OLD, 100K for NEW)

---

### CUS-002: Scan RC Document for Vehicle Details

**Epic:** Vehicle Identification & Eligibility  
**Actor:** Dealer  
**Frontend Component:** `vehicle-id-capture.tsx`  
**Backend Services:** OCR service, Document processing API, VIN validation API

#### User Story
> As a dealer, I want to scan the Registration Certificate (RC) document so that vehicle details are automatically captured without manual entry.

#### Acceptance Criteria
1. OCR scanner activates camera for document capture
2. System extracts VIN from scanned RC document
3. Extracted VIN is validated using same rules as manual entry
4. Manual entry option available if scan fails
5. Scanning progress indicator shown during processing
6. Extracted data populates same fields as manual VIN entry

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_REGISTRATION_NO | VARCHAR2(20) | Auto | RTO registration number from GM_VIN | - |

#### Business Rules
- OCR extraction must produce valid 17-25 character VIN
- Same validation triggers apply as manual VIN entry

---

### CUS-003: Check Vehicle Warranty Eligibility

**Epic:** Vehicle Identification & Eligibility  
**Actor:** System  
**Frontend Component:** `eligibility-check.tsx`  
**Backend Services:** PKG_EXTE_WAR.SP_EW_VIN_VALIDATE, GM_VAR table, VM_EW_PARAM table

#### User Story
> As a system, I want to automatically check vehicle eligibility based on age, mileage, and service history so that only qualified vehicles proceed to warranty selection.

#### Acceptance Criteria
1. Vehicle age must be less than 3 years from manufacture date (BRD: EXTE_RETLSALE_DT comparison)
2. Mileage must be under 40,000 km for OLD vehicles (BRD: NB_EWR_PUR_MILEAGE default)
3. Mileage must be under 100,000 km for NEW vehicles (BRD: svar_warr_kms_new from GM_VAR)
4. Service history must be up to date with authorized service centers
5. Eligibility check shows progress indicator during validation
6. Clear pass/fail status displayed for each eligibility criterion
7. Ineligible vehicles show specific reasons for rejection
8. Warranty type (OLD/NEW) determined by: retail_date vs P_EWR_CHANGE_DATE

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| NB_EWR_PUR_MILEAGE | NUMBER(6) | Auto | 40,000 km (OLD) / 100,000 km (NEW) | From GM_VAR.svar_warr_kms |
| EXTE_VALID_MILEAGE | NUMBER(6) | Yes | Maximum warranty coverage mileage | 40K (OLD) / 100K (NEW) |
| NB_EWR_TYPE | VARCHAR2(3) | Auto | O=OLD, N=NEW | Based on retail date |
| EXTE_RETLSALE_DT | DATE | Auto | Determines OLD vs NEW warranty type | - |

#### Business Rules
- Warranty type determination: IF retail_date < P_EWR_CHANGE_DATE THEN OLD ELSE NEW
- Mileage query from GM_VAR: NVL(gm.svar_warr_kms, 40000) for OLD, NVL(gm.svar_warr_kms_new, 100000) for NEW
- Eligibility validated via PKG_EXTE_WAR.SP_EW_VIN_VALIDATE
- NEXA vehicle validation required for specific warranty types
- Commercial vehicle validation required for specific warranty types

---

### CUS-004: View and Compare Warranty Plans

**Epic:** Plan Selection & Customization  
**Actor:** Dealer/Customer  
**Frontend Component:** `plan-selection.tsx`  
**Backend Services:** VM_EW_PARAM table, AM_LIST (Warranty Type), PKG_EXTE_WAR.SP_EW_DETAILS

#### User Story
> As a dealer or customer, I want to view and compare available warranty plans so that I can choose the most suitable coverage option.

#### Acceptance Criteria
1. Three warranty plans displayed: Platinum, Royal Platinum, Solitaire
2. Each plan shows coverage details, price per year, and maximum tenure
3. Recommended plan (Royal Platinum) is highlighted
4. Plan comparison shows coverage differences clearly
5. Platinum: Engine, Transmission, Electrical, Fuel, Cooling systems (max 4 years)
6. Royal Platinum: All Platinum + AC, Suspension, Steering, Brakes (max 5 years)
7. Solitaire: All Royal Platinum + Infotainment, Power systems, Airbags (max 6 years)
8. Plans filtered by VM_EW_PARAM based on current date and vehicle type

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_WARR_TYPE | VARCHAR2(3) | Yes | Must exist in VM_EW_PARAM | - |
| NB_EXTE_WARR_TYPE_OLD | VARCHAR2(3) | Conditional | For OLD warranty (retail < change date) | - |
| NB_EXTE_WARR_TYPE_NEW | VARCHAR2(3) | Conditional | For NEW warranty (retail >= change date) | - |

#### Business Rules
- Warranty type retrieves validity via PKG_EXTE_WAR.SP_EW_DETAILS
- Gets GST state, SAC code from VM_EW_PARAM
- Determines GST type (State/Interstate) based on customer state
- NEXA/Commercial vehicle checks applied during selection

---

### CUS-005: Select Warranty Coverage Tenure

**Epic:** Plan Selection & Customization  
**Actor:** Dealer/Customer  
**Frontend Component:** `plan-selection.tsx`  
**Backend Services:** PKG_EXTE_WAR.SP_EW_DETAILS, Premium calculation service

#### User Story
> As a dealer or customer, I want to select the coverage tenure (1-6 years) so that I can customize the warranty duration based on my needs.

#### Acceptance Criteria
1. Tenure dropdown shows available options based on selected plan
2. Platinum plan allows up to 4 years tenure
3. Royal Platinum plan allows up to 5 years tenure
4. Solitaire plan allows up to 6 years tenure
5. Total premium updates automatically when tenure changes
6. Premium calculation: Base price × Number of years
7. Validity date calculated from contract date + tenure (BRD: EXTE_VALID_DATE)

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_VALID_DATE | DATE | Yes | Must be >= SYSDATE | - |
| EXTE_CONTRACT_DATE | DATE | Auto | Auto-populated with SYSDATE | SYSDATE |
| EXTE_START_DATE | DATE | Auto | Warranty start date (typically contract date) | - |

#### Business Rules
- Validity date calculated from warranty type + contract date
- Retrieved via PKG_EXTE_WAR.SP_EW_DETAILS
- Contract date auto-populated and disabled (cannot edit)

---

### CUS-006: Select Optional CCP Coverage Add-ons

**Epic:** Plan Selection & Customization  
**Actor:** Dealer/Customer  
**Frontend Component:** `addons-selection.tsx`  
**Backend Services:** AM_LIST (ADDON_PACKAGE), PKG_ADDON_SALE.CALC_PREM, PKG_ADDON_SALE.SP_VIN_CCP_ELIGIBLE

#### User Story
> As a dealer or customer, I want to select optional CCP add-on packages so that I can enhance my warranty coverage for specific risks.

#### Acceptance Criteria
1. CCP packages displayed from AM_LIST (ADDON_PACKAGE): E0000 (No Product), E0001 (Standard CCP), E0002 (Premium CCP), E0003 (Hydro Shield), E0004 (Fuel Care)
2. E0000 "No Product" is mutually exclusive with other packages
3. Selecting any other package automatically unchecks E0000
4. At least one package must be selected (including E0000)
5. Package prices: Standard CCP (₹3,999), Premium CCP/Hydro Shield (₹5,999), Fuel Care (₹3,999)
6. GST applied based on main contract GST_TYPE (CGST+SGST or IGST)
7. Premium summary updates in real-time as add-ons are selected/deselected
8. CCP eligibility check: Mileage must be <= p_ccp_mil parameter

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| ADDON_CODE | VARCHAR2(7) | No | Package code from AM_LIST | - |
| ADDON_YN | VARCHAR2(1) | No | Y/N checkbox | N |
| ADDON_BASIC_PRICE | NUMBER | Auto | List price before discount | - |
| ADDON_BASIC_AMT | NUMBER | Auto | ADDON_BASIC_PRICE - ADDON_DISC_AMT | - |
| ADDON_TOT_AMT | NUMBER | Auto | ADDON_BASIC_AMT + GST amounts | - |
| EXTE_ADDON_TOT_AMT | NUMBER | Auto | Sum of all selected addon totals | - |

#### Business Rules
- 13 CCP records displayed, customer selects one or multiple
- E0000 "No Product" unchecks all others when selected
- Other packages uncheck E0000 when selected
- Premium calculated via PKG_ADDON_SALE.CALC_PREM
- CCP eligibility validated via PKG_ADDON_SALE.SP_VIN_CCP_ELIGIBLE
- If contract mileage > p_ccp_mil, CCP is disabled

---

### CUS-007: Verify Customer Using Existing KYC

**Epic:** Customer Verification  
**Actor:** Customer  
**Frontend Component:** `kyc-verification.tsx`  
**Backend Services:** GM_CIN table, pkg_einv.sp_validate_gstn

#### User Story
> As a customer, I want to use my existing KYC records so that I can complete verification quickly without re-submitting documents.

#### Acceptance Criteria
1. System checks for existing KYC records from GM_CIN table automatically
2. Loading indicator shown during KYC lookup
3. If found, displays masked Aadhaar (XXXX XXXX 1234) and PAN details
4. Customer name displayed (BRD: EXTE_CUST_NAME, min 3 chars validated)
5. Customer address displayed (BRD: EXTE_CUST_ADD1/2/3, min 3 chars each)
6. Customer state mandatory for GST determination (BRD: EXTE_CUST_STATE)
7. Green success indicator when KYC is verified
8. Option to proceed with existing KYC or enter new details

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_CUST_CD | VARCHAR2(10) | Auto | Customer ID from GM_CIN | - |
| EXTE_CUST_NAME | VARCHAR2(100) | Auto | Min 3 characters | - |
| EXTE_CUST_ADD1 | VARCHAR2(200) | Auto | Min 3 characters required | - |
| EXTE_CUST_ADD2 | VARCHAR2(200) | Auto | Min 3 characters required | - |
| EXTE_CUST_STATE | VARCHAR2(50) | Yes | MANDATORY - used for GST type determination | - |
| EXTE_CUST_MOBILE | VARCHAR2(50) | Auto | 10 digits, starts with 6-9 | - |
| EXTE_CUST_EMAIL | VARCHAR2(100) | Auto | Valid email format | - |
| CUST_GST_NUM | VARCHAR2(30) | Auto | Format via pkg_einv.sp_validate_gstn | - |

#### Business Rules
- Customer details auto-populated from GM_CIN during VIN validation
- Address validation: EXTE_CUST_ADD1 and EXTE_CUST_ADD2 must have min 3 chars
- State is MANDATORY - error if NULL (used for GST calculation)
- GST number format validated via pkg_einv.sp_validate_gstn
- All customer fields are display-only (disabled) after population

---

### CUS-008: Complete Manual KYC Entry

**Epic:** Customer Verification  
**Actor:** Customer  
**Frontend Component:** `kyc-verification.tsx`  
**Backend Services:** EW_DOCS table, Document upload service

#### User Story
> As a customer, I want to manually enter my KYC details and upload documents so that I can complete verification when existing records are not available.

#### Acceptance Criteria
1. Customer name field accepts minimum 3 characters (BRD: EXTE_CUST_NAME validation)
2. Aadhaar number field accepts 12 digits in XXXX XXXX XXXX format
3. PAN number field accepts 10 alphanumeric characters (ABCDE1234F format)
4. Mobile number accepts 10 digits starting with 6-9 (BRD: EXTE_CUST_MOBILE)
5. Email address validated for proper format (BRD: EXTE_CUST_EMAIL)
6. GST number validated via pkg_einv.sp_validate_gstn (15 alphanumeric chars)
7. Document upload supports Aadhaar Card, PAN Card, and Address Proof
8. Accepted file formats: pdf, jpg, png, doc (BRD: EXT field)
9. Maximum file size: 5MB (5120 KB) per document (BRD: DOC_SIZE validation)
10. Minimum 4 documents required before contract submission (BRD: B_EW_DOCS block)

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| REMARKS | VARCHAR2(500) | Yes | Cannot be blank for each document | - |
| DOC_SIZE | NUMBER | Auto | Max 5MB (5120 KB) | - |
| EXT | VARCHAR2(5) | Auto | pdf, jpg, png, doc | - |
| FILENAME | VARCHAR2(100) | Auto | Auto from upload | - |
| FILEPATH | VARCHAR2(100) | Auto | /extended_warranty/[policy]/[file] | - |

#### Business Rules
- Minimum 4 documents required before contract submission
- Each document requires REMARKS (mandatory)
- Document size validated during upload (max 5MB)
- Documents stored in EW_DOCS table
- DOWNLOAD_YN flag set to Y when document exists and is downloadable

---

### CUS-009: Review Policy Details and Premium Breakdown

**Epic:** Policy & Payment  
**Actor:** Dealer/Customer  
**Frontend Component:** `policy-confirmation.tsx`  
**Backend Services:** VM_EW_PARAM table, PKG_EXTE_WAR premium calculation

#### User Story
> As a dealer or customer, I want to review the complete policy details including premium breakdown so that I can confirm the purchase before payment.

#### Acceptance Criteria
1. Policy preview shows plan name, tenure, and coverage period
2. Premium breakdown displays base premium (BRD: EXTE_PREMIUM_CALCULATED)
3. GST calculated based on GST_TYPE: CGST+SGST (9%+9%) for same state, IGST (18%) for interstate
4. GST amounts displayed: EXTE_PREM_CGST_AMT, EXTE_PREM_SGST_AMT, EXTE_PREM_IGST_AMT
5. CCP add-on total displayed (BRD: EXTE_ADDON_TOT_AMT)
6. Loyalty redemption deducted if applicable (BRD: LOYL_REDEEM_AMT)
7. Total payable: EXTE_PREMIUM + CCP_TOTAL - LOYL_REDEEM_AMT (BRD: TOTAL_PREMIUM)
8. Policy number auto-generated (BRD: EXTE_POLICY_NO)
9. Issue date (EXTE_CONTRACT_DATE) and expiry date (EXTE_VALID_DATE) shown
10. Option to download or email policy preview

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_POLICY_NO | VARCHAR2(12) | Yes | Auto-generated, Primary key | - |
| EXTE_PREMIUM_CALCULATED | NUMBER | Auto | Base premium excluding GST | - |
| EXTE_PREMIUM | NUMBER | Auto | Total premium including GST | - |
| GST_TYPE | VARCHAR2(3) | Yes | S=State (CGST+SGST), I=Interstate (IGST) | - |
| EXTE_PREM_CGST_AMT | NUMBER | Auto | EXTE_PREMIUM_CALCULATED * CGST_RATE / 100 | - |
| EXTE_PREM_SGST_AMT | NUMBER | Auto | EXTE_PREMIUM_CALCULATED * SGST_RATE / 100 | - |
| EXTE_PREM_IGST_AMT | NUMBER | Auto | EXTE_PREMIUM_CALCULATED * IGST_RATE / 100 | - |
| TOTAL_PREMIUM | NUMBER | Auto | EXTE_PREMIUM + ADDON_TOT - LOYL_REDEEM | - |

#### Business Rules
- GST determination: IF warranty_state = customer_state THEN S (CGST+SGST) ELSE I (IGST)
- CGST/SGST rates typically 9% each, IGST typically 18%
- Premium formula: Base Premium + CGST + SGST + IGST + CCP_TOTAL - LOYL_REDEEM_AMT
- GST rates retrieved from VM_EW_PARAM based on warranty type
- SAC_CODE and GST_STATE_CD from VM_EW_PARAM

---

### CUS-010: Select Payment Method

**Epic:** Policy & Payment  
**Actor:** Customer  
**Frontend Component:** `payment-options.tsx`  
**Backend Services:** Payment gateway integration

#### User Story
> As a customer, I want to choose from multiple payment options so that I can pay using my preferred method.

#### Acceptance Criteria
1. Payment mode mandatory (BRD: PAY_MODE cannot be NULL)
2. Default payment mode: Cash (BRD: PAY_MODE default = C)
3. Payment methods: Cash (C), Online (O), Cheque, DD, UPI, Card
4. Error message if not selected: "Please select payment mode..."
5. Online mode (O) disables loyalty redemption
6. Other modes enable loyalty redemption
7. Payment method selection updates form dynamically
8. Total amount displayed in payment summary

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| PAY_MODE | VARCHAR2(50) | Yes | Cannot be NULL | C (Cash) |
| EXTE_PREMIUM_RCVD | NUMBER | No | Actual amount received | - |

#### Business Rules
- PAY_MODE controls OTP button enable/disable
- Loyalty redemption enabled for all modes except Online (O)
- Payment mode triggers WHEN-VALIDATE-ITEM (ID: 583)

---

### CUS-011: Pay Using Cheque or Demand Draft

**Epic:** Policy & Payment  
**Actor:** Customer  
**Frontend Component:** `payment-options.tsx`  
**Backend Services:** Payment validation service

#### User Story
> As a customer, I want to pay using cheque or demand draft so that I can complete payment through traditional banking methods.

#### Acceptance Criteria
1. Bank name field required for cheque/DD payment (BRD: EXTE_BANK_NAME)
2. Cheque/DD number field required (BRD: EXTE_CHEQUE_NO, 12 chars)
3. Cheque date field required (BRD: EXTE_CHEQUE_DATE, format DD-MM-RRRR)
4. Payee name field available (BRD: EXTE_INFAVOUR_OF)
5. All fields converted to uppercase automatically
6. Payment details validated before submission

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_BANK_NAME | VARCHAR2(40) | Conditional | Required if PAY_MODE = cheque/DD, uppercase | - |
| EXTE_CHEQUE_NO | VARCHAR2(12) | Conditional | Required if PAY_MODE = cheque/DD, uppercase | - |
| EXTE_CHEQUE_DATE | DATE | Conditional | Required if PAY_MODE = cheque/DD | - |
| EXTE_INFAVOUR_OF | VARCHAR2(60) | No | Uppercase, payee name | - |

#### Business Rules
- Bank details mandatory only for cheque/DD payment modes
- All text fields converted to uppercase
- Cheque date must be valid date format

---

### CUS-012: Redeem Loyalty Points for Payment

**Epic:** Policy & Payment  
**Actor:** Customer  
**Frontend Component:** `payment-options.tsx`  
**Backend Services:** PKG_LOYALTY.SP_GET_VIN_LOYALTY_DTL, PKG_LOYALTY.SP_VALIDATE_OTP, GD_LOYALTY_ENROL table

#### User Story
> As a customer, I want to redeem my loyalty points so that I can reduce the payment amount.

#### Acceptance Criteria
1. Loyalty card number displayed (BRD: NB_LOY_CARD_NUM from GD_LOYALTY_ENROL)
2. Registered mobile displayed (BRD: NB_LOY_REG_NUM)
3. Available points balance displayed (BRD: NB_LOY_BAL_POINT)
4. Rupee value of points displayed (BRD: NB_LOY_BAL_RS)
5. Points to redeem must be >= 0 and <= available balance
6. Error if points exceed balance: "Points exceed available balance"
7. OTP validation required when redeeming points (BRD: OTP_CNF field)
8. OTP validated via PKG_LOYALTY.SP_VALIDATE_OTP
9. Points converted to rupees via PKG_LOYALTY.FN_CONVERT_POINTS_TO_RUPEES
10. Loyalty redemption disabled for Online payment mode (O)

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| NB_LOY_CARD_NUM | VARCHAR2(20) | Auto | From GD_LOYALTY_ENROL | - |
| NB_LOY_BAL_POINT | NUMBER | Auto | Current balance points | - |
| NB_LOY_BAL_RS | NUMBER | Auto | Rupee value of points | - |
| LOYL_REDEEM_PTS | NUMBER | No | >= 0 and <= NB_LOY_BAL_POINT | 0 |
| LOYL_REDEEM_AMT | NUMBER | Auto | Rupee value of redeemed points | - |
| OTP_CNF | VARCHAR2(10) | Conditional | Required when LOYL_REDEEM_PTS > 0 | - |
| NB_LOY_OTP_VALIDATE | VARCHAR2(20) | Auto | Y=validated, N=not validated | N |

#### Business Rules
- Loyalty details retrieved via PKG_LOYALTY.SP_GET_VIN_LOYALTY_DTL during VIN validation
- Changing LOYL_REDEEM_PTS resets NB_LOY_OTP_VALIDATE to N
- OTP button enabled when LOYL_REDEEM_PTS > 0
- OTP validated via PKG_LOYALTY.SP_VALIDATE_OTP
- Points to rupees conversion via PKG_LOYALTY.FN_CONVERT_POINTS_TO_RUPEES
- LOYL_AWARD_PTS shows new points awarded for this purchase

---

### CUS-013: Enter Contract Mileage

**Epic:** Policy & Payment  
**Actor:** Dealer  
**Frontend Component:** `policy-confirmation.tsx`  
**Backend Services:** Mileage validation service, PKG_EXTE_WAR.SP_EW_PROJ_MILEAGE

#### User Story
> As a dealer, I want to enter the current vehicle mileage so that the warranty coverage is accurately recorded.

#### Acceptance Criteria
1. Contract mileage is mandatory (BRD: EXTE_CONTRACT_MILEAGE)
2. Mileage must be >= last service mileage (BRD: DUMMY_MILEAGE)
3. Mileage must be <= purchase limit: 40,000 km for OLD, 100,000 km for NEW (BRD: NB_EWR_PUR_MILEAGE)
4. Error if mileage below last service: "Mileage below last service reading"
5. Error if mileage exceeds limit: "Mileage exceeds warranty limit"
6. CCP eligibility disabled if mileage > p_ccp_mil parameter
7. Mileage stored in DUMMY_MILEAGE after validation

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_CONTRACT_MILEAGE | NUMBER(6) | Yes | >= DUMMY_MILEAGE and <= NB_EWR_PUR_MILEAGE | - |
| DUMMY_MILEAGE | NUMBER(9) | Auto | Last service mileage reference | - |
| NB_LAST_MILEAGE | NUMBER(6) | Auto | Last service visit mileage | - |
| NB_PRJ_MILEAGE | NUMBER(6) | Auto | Projected mileage at warranty expiration | - |

#### Business Rules
- Mileage validation via stored procedure
- DUMMY_MILEAGE set to EXTE_CONTRACT_MILEAGE value during VIN validation
- Projected mileage calculated via PKG_EXTE_WAR.SP_EW_PROJ_MILEAGE
- CCP eligibility check: if mileage > p_ccp_mil, CCP packages disabled

---

### CUS-014: Assign Service Advisor / DSE

**Epic:** Policy & Payment  
**Actor:** Dealer  
**Frontend Component:** `policy-confirmation.tsx`  
**Backend Services:** GM_EMP table, Employee validation service

#### User Story
> As a dealer, I want to assign a service advisor or DSE to the warranty contract so that the responsible employee is recorded.

#### Acceptance Criteria
1. Employee code is mandatory (BRD: EXTE_EMP_CD)
2. Error if blank: "Service Advisor / DSE Cannot Be Blank"
3. Employee must exist in GM_EMP table
4. Employee must be at current dealer/location
5. Employee name auto-populated after validation (BRD: NB_EMP_NAME)
6. LOV available for employee selection (LV_EMP)

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_EMP_CD | VARCHAR2(8) | Yes | Must exist in GM_EMP at current dealer | - |
| NB_EMP_NAME | VARCHAR2(200) | Auto | Auto from GM_EMP | - |

#### Business Rules
- Employee validated via WHEN-VALIDATE-ITEM trigger (ID: 597)
- Must be at current dealer/location (GLOBAL.principal)
- Name populated from GM_EMP after successful validation

---

### CUS-015: Generate Invoice After Payment

**Epic:** Invoice & Delivery  
**Actor:** System  
**Frontend Component:** `invoice-generation.tsx`  
**Backend Services:** Invoice generation service, MWAR_EXTE table, PDF generator

#### User Story
> As a system, I want to generate a detailed invoice after successful payment so that the customer has a record of the transaction.

#### Acceptance Criteria
1. Payment success banner displayed with confirmation
2. Invoice number generated automatically
3. Invoice shows dealer details with GSTIN
4. Customer billing details from GM_CIN displayed
5. Vehicle details included (Model, Registration, VIN)
6. Itemized breakdown: Plan premium, Add-ons (CCP), GST (CGST/SGST or IGST)
7. GST details: SAC_CODE, GST_STATE_CD, PLACE_OF_SUPPLY
8. Payment method and transaction ID recorded
9. Download, Print, and Email options available
10. Terms and conditions included
11. Audit fields populated: EXTE_CREATED_BY, EXTE_CREATED_DATE

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| SAC_CODE | VARCHAR2(30) | Auto | Service Accounting Code from VM_EW_PARAM | - |
| GST_STATE_CD | VARCHAR2(30) | Auto | State code from VM_EW_PARAM | - |
| PLACE_OF_SUPPLY | VARCHAR2(30) | Auto | Auto from GST_STATE_CD | - |
| EXTE_CREATED_BY | VARCHAR2(20) | Auto | Auto from GLOBAL.user_id | - |
| EXTE_CREATED_DATE | DATE | Auto | Auto SYSDATE | - |

#### Business Rules
- Invoice generated after successful payment
- All GST details from VM_EW_PARAM
- Audit trail maintained with user ID and timestamp
- Contract stored in MWAR_EXTE table

---

### CUS-016: Send Policy Documents via Email

**Epic:** Invoice & Delivery  
**Actor:** Dealer  
**Frontend Component:** `delivery-completion.tsx`  
**Backend Services:** Email service, EW_DOCS table

#### User Story
> As a dealer, I want to send policy documents to the customer via email so that they have digital copies of their warranty.

#### Acceptance Criteria
1. Customer email pre-populated from KYC data (BRD: EXTE_CUST_EMAIL)
2. Email subject includes policy number (EXTE_POLICY_NO)
3. Email body contains policy summary and portal access link
4. Three attachments: Warranty Policy Certificate, Invoice, Terms & Conditions
5. Email preview shown before sending
6. Send confirmation displayed after successful delivery

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_CUST_EMAIL | VARCHAR2(100) | Auto | Valid email format from GM_CIN | - |

#### Business Rules
- Email sent to customer email from GM_CIN
- Policy documents attached from EW_DOCS table
- Email service integration required

---

### CUS-017: Send Confirmation SMS

**Epic:** Invoice & Delivery  
**Actor:** Dealer  
**Frontend Component:** `delivery-completion.tsx`  
**Backend Services:** SMS gateway service

#### User Story
> As a dealer, I want to send a confirmation SMS to the customer so that they receive immediate notification of warranty activation.

#### Acceptance Criteria
1. Customer mobile number pre-populated from KYC data (BRD: EXTE_CUST_MOBILE)
2. Mobile number validated: 10 digits starting with 6-9
3. SMS contains policy number, vehicle registration, premium amount
4. Support contact number included in SMS
5. Character count displayed (160 character limit)
6. SMS sent from official sender ID
7. Send confirmation displayed after successful delivery

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| EXTE_CUST_MOBILE | VARCHAR2(50) | Auto | 10 digits, starts with 6-9 | - |
| EXTE_CUST_PHONE | VARCHAR2(50) | Auto | Work phone from GM_CIN | - |
| EXTE_CUST_PHONE2 | VARCHAR2(50) | Auto | Alternate phone from GM_CIN | - |

#### Business Rules
- SMS sent to primary mobile from GM_CIN
- Alternate phones available as backup
- SMS gateway integration required

---

### CUS-018: Complete Warranty Delivery Process

**Epic:** Invoice & Delivery  
**Actor:** Dealer  
**Frontend Component:** `delivery-completion.tsx`  
**Backend Services:** MWAR_EXTE table, Workflow state management

#### User Story
> As a dealer, I want to complete the warranty delivery process so that I can process another warranty application.

#### Acceptance Criteria
1. Success banner confirms warranty activation
2. Policy number (EXTE_POLICY_NO), status (Active), and customer name displayed
3. Process summary shows all completed steps
4. Quick actions available: Download Policy, Download Invoice
5. Complete & Process Another button resets workflow
6. All workflow data cleared for fresh start
7. Contract status updated in MWAR_EXTE table

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| STATUS | VARCHAR2(20) | Auto | Active/Cancelled based on EXTE_CANCEL_FLAG | - |
| EXTE_CANCEL_FLAG | VARCHAR2(1) | Auto | Y=Cancelled, N=Active | - |

#### Business Rules
- Contract saved to MWAR_EXTE table
- Status displayed with red foreground if cancelled
- Workflow reset clears all form data

---

### CUS-019: Query Existing Warranty Contract

**Epic:** Contract Query & Management  
**Actor:** Dealer  
**Frontend Component:** `warranty-workflow.tsx`  
**Backend Services:** MWAR_EXTE table, Contract query service

#### User Story
> As a dealer, I want to query an existing warranty contract so that I can view contract details and status.

#### Acceptance Criteria
1. Contract number field accepts 12 characters (BRD: NB_EWARR_NUM)
2. Contract number converted to uppercase
3. Contract must exist in MWAR_EXTE table
4. Error if not found: "Contract Number Not Found"
5. System fetches entire contract (60+ fields) from database
6. All editing fields disabled for existing contracts (read-only mode)
7. Vehicle registration validated in GM_VIN
8. Loyalty and CCP details retrieved
9. Existing documents can be viewed/downloaded

#### Field Rules (from BRD)
| Field | Data Type | Mandatory | Validation | Default |
|-------|-----------|-----------|------------|---------|
| NB_EWARR_NUM | VARCHAR2(12) | Yes | Must exist in MWAR_EXTE, uppercase | - |

#### Business Rules
- Contract query trigger (ID: 585) has 398 lines of code
- Populates all 60+ fields from MWAR_EXTE
- Disables all editing for existing contracts
- Determines warranty type (OLD/NEW) from stored data
- Can cancel contract if permitted

---

### CUS-020: Navigate Through Warranty Workflow Steps

**Epic:** Workflow Navigation  
**Actor:** Dealer  
**Frontend Component:** `warranty-workflow.tsx, workflow-stepper.tsx`  
**Backend Services:** Workflow state management

#### User Story
> As a dealer, I want to navigate through the 9-step warranty workflow so that I can complete the warranty process in a guided manner.

#### Acceptance Criteria
1. Workflow stepper shows all 9 steps with labels and descriptions
2. Current step is highlighted
3. Completed steps show checkmark indicator
4. Back button allows returning to previous step
5. Continue/Next button proceeds to next step
6. Step validation prevents proceeding with incomplete data
7. Mandatory field validation at each step
8. Smooth scroll to top when navigating between steps

#### Business Rules
- New Contract Flow: VIN → Warranty Type → Mileage → Employee → Documents → CCP → Save
- Existing Contract Flow: Contract Number → Read-only view
- Validation sequence enforced at each step

---

## 🗄️ Database Tables Reference

| Table Name | Purpose | Key Fields | Used In |
|------------|---------|------------|---------|
| **MWAR_EXTE** | Extended warranty contracts | All contract fields | Contract storage/query |
| **GM_VIN** | Vehicle master | VIN, Model, Variant, Engine | VIN validation |
| **GM_CIN** | Customer master | Customer details, Address, GST | Customer lookup |
| **GM_VAR** | Vehicle variant master | svar_warr_kms, svar_warr_kms_new | Mileage defaults |
| **GM_EMP** | Employee master | Employee code, name | Employee validation |
| **VM_EW_PARAM** | Warranty parameters | GST rates, SAC code, validity | Plan configuration |
| **AM_LIST** | List of values | Warranty types, CCP packages | LOV dropdowns |
| **AM_LIST_RANGE** | List ranges | Free EW eligibility, parameters | Parameter values |
| **GD_LOYALTY_ENROL** | Loyalty enrollment | Card number, points balance | Loyalty redemption |
| **VT_ADDON** | CCP addon contracts | Addon policy details | CCP tracking |
| **EW_DOCS** | Document storage | File path, remarks, size | Document management |

---

## 🔧 Stored Procedures Reference

| Procedure | Package | Purpose | Returns |
|-----------|---------|---------|---------|
| SP_EW_VIN_VALIDATE | PKG_EXTE_WAR | VIN eligibility validation | Validation result |
| SP_EW_DETAILS | PKG_EXTE_WAR | Warranty validity details | EXTE_VALID_DATE, EXTE_VALID_MILEAGE |
| SP_EW_PROJ_MILEAGE | PKG_EXTE_WAR | Projected mileage calculation | NB_PRJ_MILEAGE |
| SP_GET_VEH_DETAILS_EW | - | Vehicle and customer details | 20+ fields |
| SP_GET_VIN_LOYALTY_DTL | PKG_LOYALTY | Loyalty card details | Loyalty fields |
| SP_VALIDATE_OTP | PKG_LOYALTY | OTP validation | Validation result |
| FN_CONVERT_POINTS_TO_RUPEES | PKG_LOYALTY | Points conversion | LOYL_REDEEM_AMT |
| SP_VIN_VALIDATE | PKG_ADDON_SALE | CCP eligibility | Validation result |
| SP_VIN_CCP_ELIGIBLE | PKG_ADDON_SALE | Dynamic CCP eligibility | Eligibility flag |
| CALC_PREM | PKG_ADDON_SALE | CCP premium calculation | ADDON_BASIC_AMT |
| sp_validate_oemvin | - | OEM VIN format validation | Validation result |
| sp_validate_gstn | pkg_einv | GST number validation | Validation result |

---

## 📋 Validation Triggers Summary

| Trigger ID | Field | Block | Lines | Complexity | Key Validations |
|------------|-------|-------|-------|------------|-----------------|
| **586** | VIN | B_VT_EWARR_SALE | **546** | **HIGHEST** | OEM VIN, 40+ field population |
| **585** | NB_EWARR_NUM | CB_VT_EWARR_SALE | 398 | HIGH | Contract fetch, 60+ fields |
| **588** | NB_EXTE_WARR_TYPE_OLD | B_VT_EWARR_SALE | 50 | MEDIUM | NEXA/Commercial validation |
| **590** | NB_EXTE_WARR_TYPE_NEW | B_VT_EWARR_SALE | 50 | MEDIUM | NEXA/Commercial validation |
| **594** | EXTE_WARR_TYPE | B_VT_EWARR_SALE | 50 | MEDIUM | GST lookup |
| **598** | EXTE_CONTRACT_MILEAGE | B_VT_EWARR_SALE | 30 | MEDIUM | Range validation |
| **597** | EXTE_EMP_CD | B_VT_EWARR_SALE | 20 | LOW | Employee existence |
| **592** | LOYL_REDEEM_PTS | B_VT_EWARR_SALE | 20 | LOW | Points range |
| **603** | REMARKS | B_EW_DOCS | 5 | LOW | Mandatory check |

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with PostCSS
- **UI Components:** shadcn/ui (MIT License)
- **Icons:** Lucide React

### Backend
- **Framework:** .NET 9.0
- **API:** RESTful Web API
- **Database:** Oracle Database
- **Forms:** Oracle Forms 12c with PL/SQL

### Key Dependencies
| Package | Purpose |
|---------|---------|
| @radix-ui/* | UI primitives |
| lucide-react | Icons |
| tailwindcss | Styling |
| vite | Build tool |

---

## 📚 Document Information

| Property | Value |
|----------|-------|
| Generated | 1/16/2026, 1:22:42 PM |
| Source | Figma Design Code Files + ExtendedWarranty Field Rules Document |
| Repository | astharungta/Figma-Design |
| Total User Stories | 20 |
| Total Fields Documented | 197 |
| Database Tables | 12+ |
| Stored Procedures | 15+ |

---

**End of Comprehensive User Story Catalogue**

*This document was automatically generated from Figma code files and ExtendedWarranty_Complete_Field_Rules_and_Defaults document, combining functional user stories with detailed field-level business rules and validations.*
