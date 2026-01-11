// Auto-generated validation utilities from BRD
// Generated: 2026-01-11T09:06:31.810Z
// Source: ExtendedWarranty_Complete_Field_Rules_and_Defaults 1.md
// Total User Stories: 0
// Total Field Validations: 115

export const brdValidations = [
  {
    "field": "NB_EWARR_NUM",
    "dataType": "VARCHAR2",
    "length": "12",
    "mandatory": "Yes",
    "defaultValue": "None",
    "rules": "Required | Type: VARCHAR2 | Length: 12 | Upper case only Must exist in MWAR_EXTE table Error: \"Contract Number Not Found\" if invalid | Logic: Fetches entire contract from database (60+ fields) Validates vehicle registration in GM_VIN Retrieves loyalty and CCP details Disables all editing for existing contracts Determines warranty type (OLD/",
    "section": "Control Block Fields (CB_VT_EWARR_SALE)"
  },
  {
    "field": "PAY_MODE",
    "dataType": "VARCHAR2",
    "length": "50",
    "mandatory": "Yes",
    "defaultValue": "'C' (Cash)",
    "rules": "Required | Type: VARCHAR2 | Length: 50 | Cannot be NULL Error: \"Please select payment mode...\" | Logic: Controls OTP button enable/disable Enables loyalty redemption (except 'O' online mode)",
    "section": "Control Block Fields (CB_VT_EWARR_SALE)"
  },
  {
    "field": "TOTAL_PREMIUM",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Display only (calculated) Format: 99999999999.99 | Logic: **Formula**: EXTE_PREMIUM_CALCULATED + EXTE_PREM_CGST_AMT + EXTE_PREM_SGST_AMT + EXTE_PREM_IGST_AMT + EXTE_ADDON_TOT_AMT - LOYL_REDEEM_AMT",
    "section": "Control Block Fields (CB_VT_EWARR_SALE)"
  },
  {
    "field": "STATUS",
    "dataType": "VARCHAR2",
    "length": "20",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 20 | Display only Red foreground color | Logic: Shows contract status: Active/Cancelled Based on EXTE_CANCEL_FLAG value",
    "section": "Control Block Fields (CB_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_POLICY_NO",
    "dataType": "VARCHAR2",
    "length": "12",
    "mandatory": "Yes",
    "defaultValue": "Auto-generated",
    "rules": "Required | Type: VARCHAR2 | Length: 12 | Primary key Unique identifier | Logic: Policy number for extended warranty contract",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CONTRACT_DATE",
    "dataType": "DATE",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "SYSDATE",
    "rules": "Type: DATE | Auto-populated Disabled (cannot edit) Format: DD-MM-RRRR HH24:MI | Logic: System date at contract creation",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_WARR_TYPE",
    "dataType": "VARCHAR2",
    "length": "3",
    "mandatory": "Yes",
    "defaultValue": "None",
    "rules": "Required | Type: VARCHAR2 | Length: 3 | Mandatory Must exist in VM_EW_PARAM NEXA vehicle validation Commercial vehicle validation | Logic: Retrieves warranty validity via PKG_EXTE_WAR.SP_EW_DETAILS Gets GST state, SAC code from VM_EW_PARAM Determines GST type (State/Interstate)",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_EXTE_WARR_TYPE_OLD",
    "dataType": "VARCHAR2",
    "length": "3",
    "mandatory": "Conditional",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 3 | Mandatory for OLD warranty Visible if retail date < EWR_CHANGE_DATE NEXA/Commercial checks | Logic: Validates warranty type for pre-change vehicles Retrieves parameters via SP_EW_DETAILS",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_EXTE_WARR_TYPE_NEW",
    "dataType": "VARCHAR2",
    "length": "3",
    "mandatory": "Conditional",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 3 | Mandatory for NEW warranty Visible if retail date >= EWR_CHANGE_DATE NEXA/Commercial checks | Logic: Validates warranty type for post-change vehicles Retrieves parameters via SP_EW_DETAILS",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_VALID_DATE",
    "dataType": "DATE",
    "length": "-",
    "mandatory": "Yes",
    "defaultValue": "Calculated",
    "rules": "Required | Type: DATE | Mandatory Must be >= SYSDATE Format: DD-MM-RRRR | Logic: Calculated from warranty type + contract date Retrieved via PKG_EXTE_WAR.SP_EW_DETAILS",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_VALID_MILEAGE",
    "dataType": "NUMBER",
    "length": "6",
    "mandatory": "Yes",
    "defaultValue": "**40,000 km (OLD)<br>100,000 km (NEW)**",
    "rules": "Required | Type: NUMBER | Length: 6 | Mandatory Maximum warranty coverage mileage | Logic: **DEFAULT SOURCE**: Database-driven from GM_VAR table **Query Logic**: ```sql CASE WHEN NB_EWR_TYPE='O' THEN NVL(gm.svar_warr_kms, 40000) WHEN NB_EWR_TYPE='N' THEN NVL(gm.svar_warr_kms_new, 100000) EL",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_START_DATE",
    "dataType": "DATE",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: DATE | Display only Format: DD-MM-RRRR | Logic: Warranty start date (typically contract date)",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_BOOKLET_NO",
    "dataType": "VARCHAR2",
    "length": "12",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 12 | Optional text field | Logic: Physical warranty booklet identification",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_FREE_FLAG",
    "dataType": "VARCHAR2",
    "length": "1",
    "mandatory": "No",
    "defaultValue": "'N'",
    "rules": "Type: VARCHAR2 | Length: 1 | Display only Y/N values | Logic: **Logic**: Y if (invoice_date <= free_booking_date AND variant in EW_DISC_PRICE range) Determined during VIN validation",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "VIN",
    "dataType": "VARCHAR2",
    "length": "25",
    "mandatory": "Yes",
    "defaultValue": "None",
    "rules": "Required | Type: VARCHAR2 | Length: 25 | Mandatory Upper case 17-25 characters OEM VIN format validation | Logic: **MOST COMPLEX TRIGGER** (546 lines): Validates via sp_validate_oemvin Warranty eligibility via PKG_EXTE_WAR.SP_EW_VIN_VALIDATE Populates 40+ fields (vehicle, customer, GST, loyalty, CCP) Address vali",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_VIN_NO",
    "dataType": "VARCHAR2",
    "length": "17",
    "mandatory": "Yes",
    "defaultValue": "Auto from VIN",
    "rules": "Required | Type: VARCHAR2 | Length: 17 | Display only First 17 chars of OEM VIN | Logic: Populated from VIN field",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "OEM_VIN_NUMBER",
    "dataType": "VARCHAR2",
    "length": "25",
    "mandatory": "No",
    "defaultValue": "Auto from VIN",
    "rules": "Type: VARCHAR2 | Length: 25 | Display only | Logic: Complete OEM VIN from manufacturer",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CHASSIS_NO",
    "dataType": "VARCHAR2",
    "length": "7",
    "mandatory": "No",
    "defaultValue": "Auto from VIN",
    "rules": "Type: VARCHAR2 | Length: 7 | Display only | Logic: Last 7 characters of VIN",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_ENGINE_NO",
    "dataType": "VARCHAR2",
    "length": "7",
    "mandatory": "No",
    "defaultValue": "Auto from GM_VIN",
    "rules": "Type: VARCHAR2 | Length: 7 | Display only | Logic: Retrieved from GM_VIN table",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_REGISTRATION_NO",
    "dataType": "VARCHAR2",
    "length": "20",
    "mandatory": "No",
    "defaultValue": "Auto from GM_VIN",
    "rules": "Type: VARCHAR2 | Length: 20 | Display only | Logic: RTO registration number",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_MODL_CODE",
    "dataType": "VARCHAR2",
    "length": "5",
    "mandatory": "No",
    "defaultValue": "Auto from GM_VIN",
    "rules": "Type: VARCHAR2 | Length: 5 | Display only | Logic: Vehicle model code (e.g., WB, ST, DH)",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_VARIANT_CD",
    "dataType": "VARCHAR2",
    "length": "8",
    "mandatory": "No",
    "defaultValue": "Auto from GM_VIN",
    "rules": "Type: VARCHAR2 | Length: 8 | Display only | Logic: Variant with transmission details",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_SERV_MODL",
    "dataType": "VARCHAR2",
    "length": "50",
    "mandatory": "No",
    "defaultValue": "Auto from GM_VIN",
    "rules": "Type: VARCHAR2 | Length: 50 | Display only | Logic: Service model description",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_RETLSALE_DT",
    "dataType": "DATE",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Auto from GM_VIN",
    "rules": "Type: DATE | Display only Format: DD-MM-RRRR | Logic: **CRITICAL**: Determines OLD vs NEW warranty type Compared to P_EWR_CHANGE_DATE parameter",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CONTRACT_MILEAGE",
    "dataType": "NUMBER",
    "length": "6",
    "mandatory": "Yes",
    "defaultValue": "None",
    "rules": "Required | Type: NUMBER | Length: 6 | Mandatory Must be >= DUMMY_MILEAGE (last service) Must be <= NB_EWR_PUR_MILEAGE (purchase limit) Cannot exceed warranty mileage limit | Logic: Validated via stored procedure Used in document upload threshold logic CCP eligibility check (> p_ccp_mil disables CCP) Sets DUMMY_MILEAGE after validation",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "DUMMY_MILEAGE",
    "dataType": "NUMBER",
    "length": "9",
    "mandatory": "No",
    "defaultValue": "From EXTE_CONTRACT_MILEAGE",
    "rules": "Type: NUMBER | Length: 9 | System field Reference storage | Logic: Stores last service mileage Set to EXTE_CONTRACT_MILEAGE value during VIN validation Used as lower bound for contract mileage",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_EWR_PUR_MILEAGE",
    "dataType": "NUMBER",
    "length": "6",
    "mandatory": "No",
    "defaultValue": "**40,000 km (OLD)<br>100,000 km (NEW)**",
    "rules": "Type: NUMBER | Length: 6 | Display only Right justified | Logic: **DEFAULT SOURCE**: Retrieved from GM_VAR during VIN validation **Query** (line 49 in XML): ```sql SELECT CASE WHEN NB_EWR_TYPE='O' THEN NVL(gm.svar_warr_kms, 40000) WHEN NB_EWR_TYPE='N' THEN NVL(gm.s",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_LAST_MILEAGE",
    "dataType": "NUMBER",
    "length": "6",
    "mandatory": "No",
    "defaultValue": "From service history",
    "rules": "Type: NUMBER | Length: 6 | Display only | Logic: Last service visit mileage from history",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_PRJ_MILEAGE",
    "dataType": "NUMBER",
    "length": "6",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: NUMBER | Length: 6 | Display only | Logic: Projected mileage at warranty expiration Via PKG_EXTE_WAR.SP_EW_PROJ_MILEAGE",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_CD",
    "dataType": "VARCHAR2",
    "length": "10",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 10 | Auto-populated from VIN | Logic: Customer ID from GM_CIN table",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_NAME",
    "dataType": "VARCHAR2",
    "length": "100",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 100 | Display, disabled Min 3 characters validated | Logic: Customer full name",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_ADD1",
    "dataType": "VARCHAR2",
    "length": "200",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 200 | Display, disabled **Min 3 chars required** Validated during VIN entry | Logic: Primary address line",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_ADD2",
    "dataType": "VARCHAR2",
    "length": "200",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 200 | Display, disabled **Min 3 chars required** Validated during VIN entry | Logic: Secondary address line",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_ADD3",
    "dataType": "VARCHAR2",
    "length": "200",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 200 | Display, disabled | Logic: Tertiary address line",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_CITY",
    "dataType": "VARCHAR2",
    "length": "30",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 30 | Display, disabled | Logic: Customer city",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_STATE",
    "dataType": "VARCHAR2",
    "length": "50",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 50 | Display, disabled **MANDATORY** (error if NULL) Used for GST type determination | Logic: Customer state for GST calculation",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_PIN",
    "dataType": "VARCHAR2",
    "length": "6",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 6 | Display, disabled | Logic: Postal code",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_EMAIL",
    "dataType": "VARCHAR2",
    "length": "100",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 100 | Display, disabled | Logic: Email address",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_PHONE",
    "dataType": "VARCHAR2",
    "length": "50",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 50 | Display, disabled | Logic: Work phone",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_PHONE2",
    "dataType": "VARCHAR2",
    "length": "50",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 50 | Display, disabled | Logic: Alternate phone",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CUST_MOBILE",
    "dataType": "VARCHAR2",
    "length": "50",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 50 | Display, disabled | Logic: Mobile number",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "CUST_GST_NUM",
    "dataType": "VARCHAR2",
    "length": "30",
    "mandatory": "No",
    "defaultValue": "Auto from GM_CIN",
    "rules": "Type: VARCHAR2 | Length: 30 | Display, disabled Format validated via pkg_einv.sp_validate_gstn | Logic: GST registration number",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREMIUM_CALCULATED",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated Format: 99999999999.99 | Logic: Base premium via PKG_EXTE_WAR (excludes GST) Based on warranty type, model, mileage",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREMIUM",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated Format: 99999999999.99 | Logic: Total premium including GST EXTE_PREMIUM_CALCULATED + GST amounts",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREMIUM_RCVD",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: NUMBER | Editable Format: 99999999999.99 | Logic: Actual amount received (can differ for partial payment)",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_BANK_NAME",
    "dataType": "VARCHAR2",
    "length": "40",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 40 | Upper case Required if PAY_MODE = cheque/DD | Logic: Bank name for cheque/DD payment",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CHEQUE_NO",
    "dataType": "VARCHAR2",
    "length": "12",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 12 | Upper case Required if PAY_MODE = cheque/DD | Logic: Cheque or DD number",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CHEQUE_DATE",
    "dataType": "DATE",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: DATE | Format: DD-MM-RRRR Required if PAY_MODE = cheque/DD | Logic: Date on cheque/DD",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_INFAVOUR_OF",
    "dataType": "VARCHAR2",
    "length": "60",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 60 | Upper case | Logic: Name in favor of whom cheque is drawn",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "GST_TYPE",
    "dataType": "VARCHAR2",
    "length": "3",
    "mandatory": "Yes",
    "defaultValue": "Auto-determined",
    "rules": "Required | Type: VARCHAR2 | Length: 3 | Mandatory Display only S/I values | Logic: **Logic**: 'S' if warranty_state = customer_state (CGST+SGST) 'I' if warranty_state ≠ customer_state (IGST) Auto-set during VIN/warranty type validation",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "GST_STATE_CD",
    "dataType": "VARCHAR2",
    "length": "30",
    "mandatory": "No",
    "defaultValue": "From VM_EW_PARAM",
    "rules": "Type: VARCHAR2 | Length: 30 | Display only | Logic: State code for GST From VM_EW_PARAM based on warranty type",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "SAC_CODE",
    "dataType": "VARCHAR2",
    "length": "30",
    "mandatory": "No",
    "defaultValue": "From VM_EW_PARAM",
    "rules": "Type: VARCHAR2 | Length: 30 | Display only | Logic: Service Accounting Code for GST",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "PLACE_OF_SUPPLY",
    "dataType": "VARCHAR2",
    "length": "30",
    "mandatory": "No",
    "defaultValue": "Auto from GST_STATE_CD",
    "rules": "Type: VARCHAR2 | Length: 30 | Display only | Logic: Location for GST calculation",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_CGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "**9%** (typical)",
    "rules": "Type: NUMBER | Disabled Format: 99999999999.99 | Logic: CGST rate percentage (applied when GST_TYPE='S')",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_SGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "**9%** (typical)",
    "rules": "Type: NUMBER | Disabled Format: 99999999999.99 | Logic: SGST rate percentage (applied when GST_TYPE='S')",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_IGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "**18%** (typical)",
    "rules": "Type: NUMBER | Disabled Format: 99999999999.99 | Logic: IGST rate percentage (applied when GST_TYPE='I')",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_CGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated Format: 99999999999.99 | Logic: **Formula**: EXTE_PREMIUM_CALCULATED * EXTE_PREM_CGST_RATE / 100",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_SGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated Format: 99999999999.99 | Logic: **Formula**: EXTE_PREMIUM_CALCULATED * EXTE_PREM_SGST_RATE / 100",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_IGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated Format: 99999999999.99 | Logic: **Formula**: EXTE_PREMIUM_CALCULATED * EXTE_PREM_IGST_RATE / 100",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_TOT_PREM_SRV_TAX",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled (legacy) Not used in GST regime | Logic: Legacy service tax field",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_TOT_PREM_SBC_TAX",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled (legacy) Not used in GST regime | Logic: Legacy Swachh Bharat Cess",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_TOT_PREM_KKC_TAX",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled (legacy) Not used in GST regime | Logic: Legacy Krishi Kalyan Cess",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_DLR_COMM",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated Format: 99999999999.99 | Logic: Dealer commission on warranty sale Based on commission % parameter",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "COMM_CGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "From parameters",
    "rules": "Type: NUMBER | Disabled | Logic: CGST rate on dealer commission (GST_TYPE='S')",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "COMM_SGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "From parameters",
    "rules": "Type: NUMBER | Disabled | Logic: SGST rate on dealer commission (GST_TYPE='S')",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "COMM_IGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "From parameters",
    "rules": "Type: NUMBER | Disabled | Logic: IGST rate on dealer commission (GST_TYPE='I')",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_COMM_CGST",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated | Logic: CGST on dealer commission",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_COMM_SGST",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated | Logic: SGST on dealer commission",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_PREM_COMM_IGST",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Disabled, calculated | Logic: IGST on dealer commission",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_LOY_CARD_NUM",
    "dataType": "VARCHAR2",
    "length": "20",
    "mandatory": "No",
    "defaultValue": "Auto from loyalty",
    "rules": "Type: VARCHAR2 | Length: 20 | Display, disabled | Logic: Loyalty card number via PKG_LOYALTY.SP_GET_VIN_LOYALTY_DTL",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_LOY_REG_NUM",
    "dataType": "VARCHAR2",
    "length": "20",
    "mandatory": "No",
    "defaultValue": "Auto from loyalty",
    "rules": "Type: VARCHAR2 | Length: 20 | Display, disabled | Logic: Registered mobile with loyalty program",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_LOY_BAL_POINT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Auto from loyalty",
    "rules": "Type: NUMBER | Display, disabled | Logic: Current balance loyalty points",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_LOY_BAL_RS",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Auto from loyalty",
    "rules": "Type: NUMBER | Display, disabled | Logic: Rupee value of available points",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "LOYL_REDEEM_PTS",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Must be >= 0 Must be <= NB_LOY_BAL_POINT Error if exceeds balance Enables OTP if > 0 | Logic: Points to redeem Resets NB_LOY_OTP_VALIDATE to 'N'",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "LOYL_REDEEM_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Display, calculated | Logic: Rupee value of redeemed points Via PKG_LOYALTY conversion",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "LOYL_AWARD_PTS",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Display, disabled | Logic: New points awarded for this purchase",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "OTP_CNF",
    "dataType": "VARCHAR2",
    "length": "10",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 10 | Enabled when LOYL_REDEEM_PTS > 0 | Logic: OTP code for loyalty redemption Validated via PKG_LOYALTY.SP_VALIDATE_OTP",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_LOY_OTP_VALIDATE",
    "dataType": "VARCHAR2",
    "length": "20",
    "mandatory": "No",
    "defaultValue": "**'N'**",
    "rules": "Type: VARCHAR2 | Length: 20 | Hidden field Y/N values | Logic: OTP validation flag: 'Y'=validated, 'N'=not validated Set to 'Y' after successful OTP",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_EMP_CD",
    "dataType": "VARCHAR2",
    "length": "8",
    "mandatory": "Yes",
    "defaultValue": "None",
    "rules": "Required | Type: VARCHAR2 | Length: 8 | Mandatory Error: \"Service Advisor / DSE Cannot Be Blank\" Must exist in GM_EMP Must be at current dealer/location | Logic: Validates employee code and populates name",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "NB_EMP_NAME",
    "dataType": "VARCHAR2",
    "length": "200",
    "mandatory": "No",
    "defaultValue": "Auto from GM_EMP",
    "rules": "Type: VARCHAR2 | Length: 200 | Display, disabled | Logic: Service advisor/sales executive name",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_ADDON_POLICY_NO",
    "dataType": "VARCHAR2",
    "length": "12",
    "mandatory": "No",
    "defaultValue": "From VT_ADDON",
    "rules": "Type: VARCHAR2 | Length: 12 | Display, disabled | Logic: CCP package policy number if purchased",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_ADDON_BASIC_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Display, disabled Format: 99999999999.99 | Logic: CCP base price (excluding GST)",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_ADDON_CGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Display, disabled Format: 99999999999.99 | Logic: CGST on CCP package",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_ADDON_SGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Display, disabled Format: 99999999999.99 | Logic: SGST on CCP package",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_ADDON_IGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Display, disabled Format: 99999999999.99 | Logic: IGST on CCP package",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_ADDON_TOT_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "0",
    "rules": "Type: NUMBER | Display, disabled Format: 99999999999.99 | Logic: Total CCP amount with GST Contributes to TOTAL_PREMIUM",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CREATED_BY",
    "dataType": "VARCHAR2",
    "length": "20",
    "mandatory": "No",
    "defaultValue": ":GLOBAL.user_id",
    "rules": "Type: VARCHAR2 | Length: 20 | Auto-populated System field | Logic: User ID who created contract",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "EXTE_CREATED_DATE",
    "dataType": "DATE",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "SYSDATE",
    "rules": "Type: DATE | Auto-populated Format: DD-MM-RRRR HH24:MI | Logic: Timestamp when contract created",
    "section": "Main Transaction Block Fields (B_VT_EWARR_SALE)"
  },
  {
    "field": "SRL_NUM",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "Yes",
    "defaultValue": "Auto-sequence",
    "rules": "Required | Type: NUMBER | Display, primary key Auto-generated | Logic: Sequence number for documents",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "CLIENT_PATH",
    "dataType": "VARCHAR2",
    "length": "1000",
    "mandatory": "No",
    "defaultValue": "None",
    "rules": "Type: VARCHAR2 | Length: 1000 | Display | Logic: Local file path after selection",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "DOC_SIZE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: NUMBER | Display, calculated in KB **Max 5MB (5120 KB)** | Logic: File size validation during upload",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "REMARKS",
    "dataType": "VARCHAR2",
    "length": "500",
    "mandatory": "Yes",
    "defaultValue": "None",
    "rules": "Required | Type: VARCHAR2 | Length: 500 | Mandatory Multiline Error: \"Remarks cannot be blank\" | Logic: Document type/purpose description",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "FILENAME",
    "dataType": "VARCHAR2",
    "length": "100",
    "mandatory": "No",
    "defaultValue": "Auto from upload",
    "rules": "Type: VARCHAR2 | Length: 100 | Auto-populated | Logic: File name with extension",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "FILEPATH",
    "dataType": "VARCHAR2",
    "length": "100",
    "mandatory": "No",
    "defaultValue": "Auto-generated",
    "rules": "Type: VARCHAR2 | Length: 100 | Auto-populated Format: /extended_warranty/[policy]/[file] | Logic: Server storage path",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "EXT",
    "dataType": "VARCHAR2",
    "length": "5",
    "mandatory": "No",
    "defaultValue": "Auto from filename",
    "rules": "Type: VARCHAR2 | Length: 5 | Auto-populated | Logic: File extension (pdf, jpg, png, doc)",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "CREATED_DATE",
    "dataType": "DATE",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "SYSDATE",
    "rules": "Type: DATE | Auto-populated Format: DD-MM-RRRR HH24:MI | Logic: Document upload timestamp",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "CREATED_BY",
    "dataType": "VARCHAR2",
    "length": "20",
    "mandatory": "No",
    "defaultValue": ":GLOBAL.user_id",
    "rules": "Type: VARCHAR2 | Length: 20 | Auto-populated | Logic: User who uploaded document",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "DOWNLOAD_YN",
    "dataType": "VARCHAR2",
    "length": "1",
    "mandatory": "No",
    "defaultValue": "**'N'**",
    "rules": "Type: VARCHAR2 | Length: 1 | System field Y/N values | Logic: 'Y'=document exists and downloadable 'N'=not available",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "DEALER_MAP_CD",
    "dataType": "VARCHAR2",
    "length": "10",
    "mandatory": "No",
    "defaultValue": "Auto from main block",
    "rules": "Type: VARCHAR2 | Length: 10 | Auto-populated | Logic: Dealer code for organization",
    "section": "Document Block Fields (B_EW_DOCS)"
  },
  {
    "field": "ADDON_CODE",
    "dataType": "VARCHAR2",
    "length": "7",
    "mandatory": "No",
    "defaultValue": "From AM_LIST",
    "rules": "Type: VARCHAR2 | Length: 7 | Display only | Logic: Package code (E0000, E0001, etc.)",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_DESC",
    "dataType": "VARCHAR2",
    "length": "100",
    "mandatory": "No",
    "defaultValue": "From AM_LIST",
    "rules": "Type: VARCHAR2 | Length: 100 | Display only | Logic: Package description (No Product, Standard CCP, Premium CCP, Hydro Shield, Fuel Care)",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_BASIC_PRICE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "From AM_LIST",
    "rules": "Type: NUMBER | Display Format: 99999999999.99 | Logic: List price before discount",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_DISC_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: NUMBER | Display Format: 99999999999.99 | Logic: Discount applied on package",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_BASIC_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: NUMBER | Display, calculated Format: 99999999999.99 | Logic: **Formula**: ADDON_BASIC_PRICE - ADDON_DISC_AMT Via PKG_ADDON_SALE.CALC_PREM",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_CGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: NUMBER | Display, calculated Format: 99999999999.99 | Logic: CGST on package (when main GST_TYPE='S')",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_SGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: NUMBER | Display, calculated Format: 99999999999.99 | Logic: SGST on package (when main GST_TYPE='S')",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_IGST_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: NUMBER | Display, calculated Format: 99999999999.99 | Logic: IGST on package (when main GST_TYPE='I')",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_TOT_AMT",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "Calculated",
    "rules": "Type: NUMBER | Display, calculated Format: 99999999999.99 | Logic: **Formula**: ADDON_BASIC_AMT + GST amounts",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_YN",
    "dataType": "VARCHAR2",
    "length": "1",
    "mandatory": "No",
    "defaultValue": "**'N'**",
    "rules": "Type: VARCHAR2 | Length: 1 | Checkbox Y/N values **Mutual exclusivity**: E0000 vs others | Logic: Y=selected, N=not selected E0000 \"No Product\" unchecks all others Other packages uncheck E0000 Updates EXTE_ADDON_TOT_AMT",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_GST_TYPE",
    "dataType": "VARCHAR2",
    "length": "3",
    "mandatory": "No",
    "defaultValue": "From main block",
    "rules": "Type: VARCHAR2 | Length: 3 | Display Inherited from main GST_TYPE | Logic: Determines CGST/SGST vs IGST",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_CGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "From parameters",
    "rules": "Type: NUMBER | Display | Logic: CGST rate % for addon",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_SGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "From parameters",
    "rules": "Type: NUMBER | Display | Logic: SGST rate % for addon",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "ADDON_IGST_RATE",
    "dataType": "NUMBER",
    "length": "-",
    "mandatory": "No",
    "defaultValue": "From parameters",
    "rules": "Type: NUMBER | Display | Logic: IGST rate % for addon",
    "section": "CCP Add-on Block Fields (B_ADDON)"
  },
  {
    "field": "EXTE_VALID_MILEAGE",
    "dataType": "",
    "length": "",
    "mandatory": "",
    "defaultValue": "**40,000 km (OLD type)**<br>**100,000 km (NEW type)**",
    "rules": "",
    "section": "Default Values Summary"
  },
  {
    "field": "NB_EWR_PUR_MILEAGE",
    "dataType": "",
    "length": "",
    "mandatory": "",
    "defaultValue": "**40,000 km (OLD type)**<br>**100,000 km (NEW type)**",
    "rules": "",
    "section": "Default Values Summary"
  }
];

export const userStories = [];

// VIN Validation
export const validateVIN = (vin) => {
    if (!vin || vin.trim() === '') {
        return { isValid: false, message: 'VIN is required' };
    }
    
    // Check for common VIN lengths (17 for most, 20 for some Indian vehicles)
    if (vin.length !== 17 && vin.length !== 20) {
        return { isValid: false, message: 'VIN must be 17 or 20 characters' };
    }
    
    // Allow alphanumeric characters
    if (!/^[A-Z0-9]+$/i.test(vin)) {
        return { isValid: false, message: 'VIN must contain only letters and numbers' };
    }
    
    return { isValid: true, message: 'Valid VIN' };
};

// Email Validation
export const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        return { isValid: false, message: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Invalid email format' };
    }
    
    return { isValid: true, message: 'Valid email' };
};

// Phone Validation
export const validatePhone = (phone) => {
    if (!phone || phone.trim() === '') {
        return { isValid: false, message: 'Phone number is required' };
    }
    
    const cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.length !== 10) {
        return { isValid: false, message: 'Phone must be 10 digits' };
    }
    
    if (!/^[6-9]/.test(cleaned)) {
        return { isValid: false, message: 'Phone must start with 6, 7, 8, or 9' };
    }
    
    return { isValid: true, message: 'Valid phone number' };
};

// Name Validation
export const validateName = (name) => {
    if (!name || name.trim() === '') {
        return { isValid: false, message: 'Name is required' };
    }
    
    if (name.length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters' };
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return { isValid: false, message: 'Name can only contain letters and spaces' };
    }
    
    return { isValid: true, message: 'Valid name' };
};

// GST Number Validation
export const validateGST = (gst) => {
    if (!gst || gst.trim() === '') {
        return { isValid: false, message: 'GST number is required' };
    }
    
    if (gst.length !== 15) {
        return { isValid: false, message: 'GST number must be 15 characters' };
    }
    
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(gst)) {
        return { isValid: false, message: 'Invalid GST number format' };
    }
    
    return { isValid: true, message: 'Valid GST number' };
};

// Date Validation
export const validateDate = (date) => {
    if (!date) {
        return { isValid: false, message: 'Date is required' };
    }
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        return { isValid: false, message: 'Invalid date format' };
    }
    
    return { isValid: true, message: 'Valid date' };
};

// Amount Validation
export const validateAmount = (amount) => {
    if (!amount && amount !== 0) {
        return { isValid: false, message: 'Amount is required' };
    }
    
    if (isNaN(amount) || amount < 0) {
        return { isValid: false, message: 'Amount must be a positive number' };
    }
    
    return { isValid: true, message: 'Valid amount' };
};

// Document Count Validation
export const validateDocuments = (documents) => {
    if (!documents || documents.length < 4) {
        return { isValid: false, message: 'Please upload minimum 4 documents' };
    }
    
    return { isValid: true, message: 'Documents validated' };
};

// Generic Required Field Validation
export const validateRequired = (value, fieldName) => {
    if (!value || value.toString().trim() === '') {
        return { isValid: false, message: `${fieldName} is required` };
    }
    
    return { isValid: true, message: 'Valid' };
};

// Apply BRD validations to form data
export const validateFormData = (formData) => {
    const errors = {};
    
    Object.keys(formData).forEach(field => {
        const value = formData[field];
        const fieldLower = field.toLowerCase();
        
        // Find matching BRD validation
        const brdValidation = brdValidations.find(v => 
            v.field.toLowerCase().includes(fieldLower) || 
            fieldLower.includes(v.field.toLowerCase())
        );
        
        if (brdValidation) {
            const rules = brdValidation.rules.toLowerCase();
            
            // Apply validations based on BRD rules
            if (rules.includes('required') && (!value || value.toString().trim() === '')) {
                errors[field] = `${field} is required`;
            }
            
            if (rules.includes('email') && value) {
                const result = validateEmail(value);
                if (!result.isValid) errors[field] = result.message;
            }
            
            if (rules.includes('phone') && value) {
                const result = validatePhone(value);
                if (!result.isValid) errors[field] = result.message;
            }
            
            if (rules.includes('vin') && value) {
                const result = validateVIN(value);
                if (!result.isValid) errors[field] = result.message;
            }
            
            if (rules.includes('gst') && value) {
                const result = validateGST(value);
                if (!result.isValid) errors[field] = result.message;
            }
        }
    });
    
    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
};

// Get validation rules for a specific field
export const getFieldValidation = (fieldName) => {
    return brdValidations.find(v => 
        v.field.toLowerCase() === fieldName.toLowerCase() ||
        v.field.toLowerCase().includes(fieldName.toLowerCase())
    );
};

// Get all validations for a user story
export const getStoryValidations = (storyId) => {
    return brdValidations.filter(v => v.userStory === storyId);
};

// Export all validators
export default {
    validateVIN,
    validateEmail,
    validatePhone,
    validateName,
    validateGST,
    validateDate,
    validateAmount,
    validateDocuments,
    validateRequired,
    validateFormData,
    getFieldValidation,
    getStoryValidations,
    brdValidations,
    userStories
};
