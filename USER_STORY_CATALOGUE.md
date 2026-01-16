# 📋 User Story Catalogue
**Generated:** 1/16/2026, 11:41:57 AM
**Source:** ExtendedWarranty_Complete_Field_Rules_and_Defaults 1.md (BRD)
**Application:** Extended Warranty Management System

---

## 📊 Executive Summary

| Metric | Count |
|--------|-------|
| Total User Stories | 18 |
| Total Field Validations | 151 |
| Backend Validation Methods | 10 |
| Frontend Validation Functions | 16 |
| BRD Field Rules | 115 |

---

## 🎯 User Stories Overview

| ID | Title | Fields | Section |
|----|-------|--------|---------|
| US-001 | Contract Entry and Payment Mode Selection | 4 | Control Block Fields (CB_VT_EWARR_SALE)... |
| US-002 | Warranty Transaction Processing | 10 | Main Transaction Block Fields (B_VT_EWAR... |
| US-003 | Warranty Transaction Processing | 10 | Main Transaction Block Fields (B_VT_EWAR... |
| US-004 | Warranty Transaction Processing | 5 | Main Transaction Block Fields (B_VT_EWAR... |
| US-005 | Warranty Transaction Processing | 13 | Main Transaction Block Fields (B_VT_EWAR... |
| US-006 | Warranty Transaction Processing | 7 | Main Transaction Block Fields (B_VT_EWAR... |
| US-007 | Warranty Transaction Processing | 13 | Main Transaction Block Fields (B_VT_EWAR... |
| US-008 | Warranty Transaction Processing | 7 | Main Transaction Block Fields (B_VT_EWAR... |
| US-009 | Warranty Transaction Processing | 9 | Main Transaction Block Fields (B_VT_EWAR... |
| US-010 | Warranty Transaction Processing | 2 | Main Transaction Block Fields (B_VT_EWAR... |
| US-011 | Warranty Transaction Processing | 6 | Main Transaction Block Fields (B_VT_EWAR... |
| US-012 | Warranty Transaction Processing | 2 | Main Transaction Block Fields (B_VT_EWAR... |
| US-013 | Document Upload and Management | 11 | Document Block Fields (B_EW_DOCS)... |
| US-014 | CCP Add-on Package Selection | 14 | CCP Add-on Block Fields (B_ADDON)... |
| US-015 | Default Values Summary | 13 | Default Values Summary... |
| US-016 | Default Values Summary | 11 | Default Values Summary... |
| US-017 | Default Values Summary | 3 | Default Values Summary... |
| US-018 | Validation Triggers Summary | 11 | Validation Triggers Summary... |

---

## 📝 Detailed User Stories

### US-001: Contract Entry and Payment Mode Selection

**User Story:**
> As a dealer user, I want to enter contract details and select payment mode so that I can process warranty sales

**BRD Section:** Control Block Fields (CB_VT_EWARR_SALE)

#### Acceptance Criteria

**Mandatory Fields:**
| Field | Data Type | Validation |
|-------|-----------|------------|
| NB_EWARR_NUM | VARCHAR2 |  Upper case only  Must exist in MWAR_EXTE table  Error: "Contract Number Not Fou... |
| PAY_MODE | VARCHAR2 |  Cannot be NULL  Error: "Please select payment mode..."... |

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| PAY_MODE | 'C' (Cash) |  Controls OTP button enable/disable  Enables loyalty redempt... |
| TOTAL_PREMIUM | 0 | **Formula**: EXTE_PREMIUM_CALCULATED + EXTE_PREM_CGST_AMT + ... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| NB_EWARR_NUM | VARCHAR2 | 12 | Yes |  Upper case only  Must exist in MWAR_EXTE table  E... |
| PAY_MODE | VARCHAR2 | 50 | Yes |  Cannot be NULL  Error: "Please select payment mod... |
| TOTAL_PREMIUM | NUMBER | - | No |  Display only (calculated)  Format: 99999999999.99... |
| STATUS | VARCHAR2 | 20 | No |  Display only  Red foreground color... |

---

### US-002: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Mandatory Fields:**
| Field | Data Type | Validation |
|-------|-----------|------------|
| EXTE_POLICY_NO | VARCHAR2 |  Primary key  Unique identifier... |
| EXTE_WARR_TYPE | VARCHAR2 |  Mandatory  Must exist in VM_EW_PARAM  NEXA vehicle validation  Commercial vehic... |
| NB_EXTE_WARR_TYPE_OLD | VARCHAR2 |  Mandatory for OLD warranty  Visible if retail date < EWR_CHANGE_DATE  NEXA/Comm... |
| NB_EXTE_WARR_TYPE_NEW | VARCHAR2 |  Mandatory for NEW warranty  Visible if retail date >= EWR_CHANGE_DATE  NEXA/Com... |
| EXTE_VALID_DATE | DATE |  Mandatory  Must be >= SYSDATE  Format: DD-MM-RRRR... |
| EXTE_VALID_MILEAGE | NUMBER |  Mandatory  Maximum warranty coverage mileage... |

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_POLICY_NO | Auto-generated | Policy number for extended warranty contract... |
| EXTE_CONTRACT_DATE | SYSDATE | System date at contract creation... |
| EXTE_VALID_DATE | Calculated |  Calculated from warranty type + contract date  Retrieved vi... |
| EXTE_VALID_MILEAGE | **40,000 km (OLD)<br>100,000 k | **DEFAULT SOURCE**: Database-driven from GM_VAR table **Quer... |
| EXTE_START_DATE | Calculated | Warranty start date (typically contract date)... |
| EXTE_FREE_FLAG | 'N' | **Logic**: Y if (invoice_date <= free_booking_date AND varia... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_POLICY_NO | VARCHAR2 | 12 | Yes |  Primary key  Unique identifier... |
| EXTE_CONTRACT_DATE | DATE | - | No |  Auto-populated  Disabled (cannot edit)  Format: D... |
| EXTE_WARR_TYPE | VARCHAR2 | 3 | Yes |  Mandatory  Must exist in VM_EW_PARAM  NEXA vehicl... |
| NB_EXTE_WARR_TYPE_OLD | VARCHAR2 | 3 | Conditional |  Mandatory for OLD warranty  Visible if retail dat... |
| NB_EXTE_WARR_TYPE_NEW | VARCHAR2 | 3 | Conditional |  Mandatory for NEW warranty  Visible if retail dat... |
| EXTE_VALID_DATE | DATE | - | Yes |  Mandatory  Must be >= SYSDATE  Format: DD-MM-RRRR... |
| EXTE_VALID_MILEAGE | NUMBER | 6 | Yes |  Mandatory  Maximum warranty coverage mileage... |
| EXTE_START_DATE | DATE | - | No |  Display only  Format: DD-MM-RRRR... |
| EXTE_BOOKLET_NO | VARCHAR2 | 12 | No |  Optional text field... |
| EXTE_FREE_FLAG | VARCHAR2 | 1 | No |  Display only  Y/N values... |

---

### US-003: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Mandatory Fields:**
| Field | Data Type | Validation |
|-------|-----------|------------|
| VIN | VARCHAR2 |  Mandatory  Upper case  17-25 characters  OEM VIN format validation... |
| EXTE_VIN_NO | VARCHAR2 |  Display only  First 17 chars of OEM VIN... |

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_VIN_NO | Auto from VIN | Populated from VIN field... |
| OEM_VIN_NUMBER | Auto from VIN | Complete OEM VIN from manufacturer... |
| EXTE_CHASSIS_NO | Auto from VIN | Last 7 characters of VIN... |
| EXTE_ENGINE_NO | Auto from GM_VIN | Retrieved from GM_VIN table... |
| EXTE_REGISTRATION_NO | Auto from GM_VIN | RTO registration number... |
| EXTE_MODL_CODE | Auto from GM_VIN | Vehicle model code (e.g., WB, ST, DH)... |
| EXTE_VARIANT_CD | Auto from GM_VIN | Variant with transmission details... |
| EXTE_SERV_MODL | Auto from GM_VIN | Service model description... |
| EXTE_RETLSALE_DT | Auto from GM_VIN | **CRITICAL**: Determines OLD vs NEW warranty type  Compared ... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| VIN | VARCHAR2 | 25 | Yes |  Mandatory  Upper case  17-25 characters  OEM VIN ... |
| EXTE_VIN_NO | VARCHAR2 | 17 | Yes |  Display only  First 17 chars of OEM VIN... |
| OEM_VIN_NUMBER | VARCHAR2 | 25 | No |  Display only... |
| EXTE_CHASSIS_NO | VARCHAR2 | 7 | No |  Display only... |
| EXTE_ENGINE_NO | VARCHAR2 | 7 | No |  Display only... |
| EXTE_REGISTRATION_NO | VARCHAR2 | 20 | No |  Display only... |
| EXTE_MODL_CODE | VARCHAR2 | 5 | No |  Display only... |
| EXTE_VARIANT_CD | VARCHAR2 | 8 | No |  Display only... |
| EXTE_SERV_MODL | VARCHAR2 | 50 | No |  Display only... |
| EXTE_RETLSALE_DT | DATE | - | No |  Display only  Format: DD-MM-RRRR... |

---

### US-004: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Mandatory Fields:**
| Field | Data Type | Validation |
|-------|-----------|------------|
| EXTE_CONTRACT_MILEAGE | NUMBER |  Mandatory  Must be >= DUMMY_MILEAGE (last service)  Must be <= NB_EWR_PUR_MILEA... |

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| DUMMY_MILEAGE | From EXTE_CONTRACT_MILEAGE |  Stores last service mileage  Set to EXTE_CONTRACT_MILEAGE v... |
| NB_EWR_PUR_MILEAGE | **40,000 km (OLD)<br>100,000 k | **DEFAULT SOURCE**: Retrieved from GM_VAR during VIN validat... |
| NB_LAST_MILEAGE | From service history | Last service visit mileage from history... |
| NB_PRJ_MILEAGE | Calculated | Projected mileage at warranty expiration  Via PKG_EXTE_WAR.S... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_CONTRACT_MILEAGE | NUMBER | 6 | Yes |  Mandatory  Must be >= DUMMY_MILEAGE (last service... |
| DUMMY_MILEAGE | NUMBER | 9 | No |  System field  Reference storage... |
| NB_EWR_PUR_MILEAGE | NUMBER | 6 | No |  Display only  Right justified... |
| NB_LAST_MILEAGE | NUMBER | 6 | No |  Display only... |
| NB_PRJ_MILEAGE | NUMBER | 6 | No |  Display only... |

---

### US-005: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_CUST_CD | Auto from GM_CIN | Customer ID from GM_CIN table... |
| EXTE_CUST_NAME | Auto from GM_CIN | Customer full name... |
| EXTE_CUST_ADD1 | Auto from GM_CIN | Primary address line... |
| EXTE_CUST_ADD2 | Auto from GM_CIN | Secondary address line... |
| EXTE_CUST_ADD3 | Auto from GM_CIN | Tertiary address line... |
| EXTE_CUST_CITY | Auto from GM_CIN | Customer city... |
| EXTE_CUST_STATE | Auto from GM_CIN | Customer state for GST calculation... |
| EXTE_CUST_PIN | Auto from GM_CIN | Postal code... |
| EXTE_CUST_EMAIL | Auto from GM_CIN | Email address... |
| EXTE_CUST_PHONE | Auto from GM_CIN | Work phone... |
| EXTE_CUST_PHONE2 | Auto from GM_CIN | Alternate phone... |
| EXTE_CUST_MOBILE | Auto from GM_CIN | Mobile number... |
| CUST_GST_NUM | Auto from GM_CIN | GST registration number... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_CUST_CD | VARCHAR2 | 10 | No |  Auto-populated from VIN... |
| EXTE_CUST_NAME | VARCHAR2 | 100 | No |  Display, disabled  Min 3 characters validated... |
| EXTE_CUST_ADD1 | VARCHAR2 | 200 | No |  Display, disabled  **Min 3 chars required**  Vali... |
| EXTE_CUST_ADD2 | VARCHAR2 | 200 | No |  Display, disabled  **Min 3 chars required**  Vali... |
| EXTE_CUST_ADD3 | VARCHAR2 | 200 | No |  Display, disabled... |
| EXTE_CUST_CITY | VARCHAR2 | 30 | No |  Display, disabled... |
| EXTE_CUST_STATE | VARCHAR2 | 50 | No |  Display, disabled  **MANDATORY** (error if NULL) ... |
| EXTE_CUST_PIN | VARCHAR2 | 6 | No |  Display, disabled... |
| EXTE_CUST_EMAIL | VARCHAR2 | 100 | No |  Display, disabled... |
| EXTE_CUST_PHONE | VARCHAR2 | 50 | No |  Display, disabled... |
| EXTE_CUST_PHONE2 | VARCHAR2 | 50 | No |  Display, disabled... |
| EXTE_CUST_MOBILE | VARCHAR2 | 50 | No |  Display, disabled... |
| CUST_GST_NUM | VARCHAR2 | 30 | No |  Display, disabled  Format validated via pkg_einv.... |

---

### US-006: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_PREMIUM_CALCULATED | 0 | Base premium via PKG_EXTE_WAR (excludes GST)  Based on warra... |
| EXTE_PREMIUM | 0 | Total premium including GST  EXTE_PREMIUM_CALCULATED + GST a... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_PREMIUM_CALCULATED | NUMBER | - | No |  Disabled, calculated  Format: 99999999999.99... |
| EXTE_PREMIUM | NUMBER | - | No |  Disabled, calculated  Format: 99999999999.99... |
| EXTE_PREMIUM_RCVD | NUMBER | - | No |  Editable  Format: 99999999999.99... |
| EXTE_BANK_NAME | VARCHAR2 | 40 | No |  Upper case  Required if PAY_MODE = cheque/DD... |
| EXTE_CHEQUE_NO | VARCHAR2 | 12 | No |  Upper case  Required if PAY_MODE = cheque/DD... |
| EXTE_CHEQUE_DATE | DATE | - | No |  Format: DD-MM-RRRR  Required if PAY_MODE = cheque... |
| EXTE_INFAVOUR_OF | VARCHAR2 | 60 | No |  Upper case... |

---

### US-007: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Mandatory Fields:**
| Field | Data Type | Validation |
|-------|-----------|------------|
| GST_TYPE | VARCHAR2 |  Mandatory  Display only  S/I values... |

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| GST_TYPE | Auto-determined | **Logic**: 'S' if warranty_state = customer_state (CGST+SGST... |
| GST_STATE_CD | From VM_EW_PARAM | State code for GST  From VM_EW_PARAM based on warranty type... |
| SAC_CODE | From VM_EW_PARAM | Service Accounting Code for GST... |
| PLACE_OF_SUPPLY | Auto from GST_STATE_CD | Location for GST calculation... |
| EXTE_PREM_CGST_RATE | **9%** (typical) | CGST rate percentage (applied when GST_TYPE='S')... |
| EXTE_PREM_SGST_RATE | **9%** (typical) | SGST rate percentage (applied when GST_TYPE='S')... |
| EXTE_PREM_IGST_RATE | **18%** (typical) | IGST rate percentage (applied when GST_TYPE='I')... |
| EXTE_PREM_CGST_AMT | 0 | **Formula**: EXTE_PREMIUM_CALCULATED * EXTE_PREM_CGST_RATE /... |
| EXTE_PREM_SGST_AMT | 0 | **Formula**: EXTE_PREMIUM_CALCULATED * EXTE_PREM_SGST_RATE /... |
| EXTE_PREM_IGST_AMT | 0 | **Formula**: EXTE_PREMIUM_CALCULATED * EXTE_PREM_IGST_RATE /... |
| EXTE_TOT_PREM_SRV_TAX | 0 | Legacy service tax field... |
| EXTE_TOT_PREM_SBC_TAX | 0 | Legacy Swachh Bharat Cess... |
| EXTE_TOT_PREM_KKC_TAX | 0 | Legacy Krishi Kalyan Cess... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| GST_TYPE | VARCHAR2 | 3 | Yes |  Mandatory  Display only  S/I values... |
| GST_STATE_CD | VARCHAR2 | 30 | No |  Display only... |
| SAC_CODE | VARCHAR2 | 30 | No |  Display only... |
| PLACE_OF_SUPPLY | VARCHAR2 | 30 | No |  Display only... |
| EXTE_PREM_CGST_RATE | NUMBER | - | No |  Disabled  Format: 99999999999.99... |
| EXTE_PREM_SGST_RATE | NUMBER | - | No |  Disabled  Format: 99999999999.99... |
| EXTE_PREM_IGST_RATE | NUMBER | - | No |  Disabled  Format: 99999999999.99... |
| EXTE_PREM_CGST_AMT | NUMBER | - | No |  Disabled, calculated  Format: 99999999999.99... |
| EXTE_PREM_SGST_AMT | NUMBER | - | No |  Disabled, calculated  Format: 99999999999.99... |
| EXTE_PREM_IGST_AMT | NUMBER | - | No |  Disabled, calculated  Format: 99999999999.99... |
| EXTE_TOT_PREM_SRV_TAX | NUMBER | - | No |  Disabled (legacy)  Not used in GST regime... |
| EXTE_TOT_PREM_SBC_TAX | NUMBER | - | No |  Disabled (legacy)  Not used in GST regime... |
| EXTE_TOT_PREM_KKC_TAX | NUMBER | - | No |  Disabled (legacy)  Not used in GST regime... |

---

### US-008: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_PREM_DLR_COMM | 0 | Dealer commission on warranty sale  Based on commission % pa... |
| COMM_CGST_RATE | From parameters | CGST rate on dealer commission (GST_TYPE='S')... |
| COMM_SGST_RATE | From parameters | SGST rate on dealer commission (GST_TYPE='S')... |
| COMM_IGST_RATE | From parameters | IGST rate on dealer commission (GST_TYPE='I')... |
| EXTE_PREM_COMM_CGST | 0 | CGST on dealer commission... |
| EXTE_PREM_COMM_SGST | 0 | SGST on dealer commission... |
| EXTE_PREM_COMM_IGST | 0 | IGST on dealer commission... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_PREM_DLR_COMM | NUMBER | - | No |  Disabled, calculated  Format: 99999999999.99... |
| COMM_CGST_RATE | NUMBER | - | No |  Disabled... |
| COMM_SGST_RATE | NUMBER | - | No |  Disabled... |
| COMM_IGST_RATE | NUMBER | - | No |  Disabled... |
| EXTE_PREM_COMM_CGST | NUMBER | - | No |  Disabled, calculated... |
| EXTE_PREM_COMM_SGST | NUMBER | - | No |  Disabled, calculated... |
| EXTE_PREM_COMM_IGST | NUMBER | - | No |  Disabled, calculated... |

---

### US-009: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| NB_LOY_CARD_NUM | Auto from loyalty | Loyalty card number via PKG_LOYALTY.SP_GET_VIN_LOYALTY_DTL... |
| NB_LOY_REG_NUM | Auto from loyalty | Registered mobile with loyalty program... |
| NB_LOY_BAL_POINT | Auto from loyalty | Current balance loyalty points... |
| NB_LOY_BAL_RS | Auto from loyalty | Rupee value of available points... |
| LOYL_REDEEM_PTS | 0 | Points to redeem  Resets NB_LOY_OTP_VALIDATE to 'N'... |
| LOYL_REDEEM_AMT | 0 | Rupee value of redeemed points  Via PKG_LOYALTY conversion... |
| LOYL_AWARD_PTS | 0 | New points awarded for this purchase... |
| NB_LOY_OTP_VALIDATE | **'N'** | OTP validation flag: 'Y'=validated, 'N'=not validated  Set t... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| NB_LOY_CARD_NUM | VARCHAR2 | 20 | No |  Display, disabled... |
| NB_LOY_REG_NUM | VARCHAR2 | 20 | No |  Display, disabled... |
| NB_LOY_BAL_POINT | NUMBER | - | No |  Display, disabled... |
| NB_LOY_BAL_RS | NUMBER | - | No |  Display, disabled... |
| LOYL_REDEEM_PTS | NUMBER | - | No |  Must be >= 0  Must be <= NB_LOY_BAL_POINT  Error ... |
| LOYL_REDEEM_AMT | NUMBER | - | No |  Display, calculated... |
| LOYL_AWARD_PTS | NUMBER | - | No |  Display, disabled... |
| OTP_CNF | VARCHAR2 | 10 | No |  Enabled when LOYL_REDEEM_PTS > 0... |
| NB_LOY_OTP_VALIDATE | VARCHAR2 | 20 | No |  Hidden field  Y/N values... |

---

### US-010: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Mandatory Fields:**
| Field | Data Type | Validation |
|-------|-----------|------------|
| EXTE_EMP_CD | VARCHAR2 |  Mandatory  Error: "Service Advisor / DSE Cannot Be Blank"  Must exist in GM_EMP... |

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| NB_EMP_NAME | Auto from GM_EMP | Service advisor/sales executive name... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_EMP_CD | VARCHAR2 | 8 | Yes |  Mandatory  Error: "Service Advisor / DSE Cannot B... |
| NB_EMP_NAME | VARCHAR2 | 200 | No |  Display, disabled... |

---

### US-011: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_ADDON_POLICY_NO | From VT_ADDON | CCP package policy number if purchased... |
| EXTE_ADDON_BASIC_AMT | 0 | CCP base price (excluding GST)... |
| EXTE_ADDON_CGST_AMT | 0 | CGST on CCP package... |
| EXTE_ADDON_SGST_AMT | 0 | SGST on CCP package... |
| EXTE_ADDON_IGST_AMT | 0 | IGST on CCP package... |
| EXTE_ADDON_TOT_AMT | 0 | Total CCP amount with GST  Contributes to TOTAL_PREMIUM... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_ADDON_POLICY_NO | VARCHAR2 | 12 | No |  Display, disabled... |
| EXTE_ADDON_BASIC_AMT | NUMBER | - | No |  Display, disabled  Format: 99999999999.99... |
| EXTE_ADDON_CGST_AMT | NUMBER | - | No |  Display, disabled  Format: 99999999999.99... |
| EXTE_ADDON_SGST_AMT | NUMBER | - | No |  Display, disabled  Format: 99999999999.99... |
| EXTE_ADDON_IGST_AMT | NUMBER | - | No |  Display, disabled  Format: 99999999999.99... |
| EXTE_ADDON_TOT_AMT | NUMBER | - | No |  Display, disabled  Format: 99999999999.99... |

---

### US-012: Warranty Transaction Processing

**User Story:**
> As a dealer user, I want to process warranty transactions with vehicle and customer information

**BRD Section:** Main Transaction Block Fields (B_VT_EWARR_SALE)

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_CREATED_BY | :GLOBAL.user_id | User ID who created contract... |
| EXTE_CREATED_DATE | SYSDATE | Timestamp when contract created... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_CREATED_BY | VARCHAR2 | 20 | No |  Auto-populated  System field... |
| EXTE_CREATED_DATE | DATE | - | No |  Auto-populated  Format: DD-MM-RRRR HH24:MI... |

---

### US-013: Document Upload and Management

**User Story:**
> As a dealer user, I want to upload and manage required documents for warranty

**BRD Section:** Document Block Fields (B_EW_DOCS)

#### Acceptance Criteria

**Mandatory Fields:**
| Field | Data Type | Validation |
|-------|-----------|------------|
| SRL_NUM | NUMBER |  Display, primary key  Auto-generated... |
| REMARKS | VARCHAR2 |  Mandatory  Multiline  Error: "Remarks cannot be blank"... |

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| SRL_NUM | Auto-sequence | Sequence number for documents... |
| DOC_SIZE | Calculated | File size validation during upload... |
| FILENAME | Auto from upload | File name with extension... |
| FILEPATH | Auto-generated | Server storage path... |
| EXT | Auto from filename | File extension (pdf, jpg, png, doc)... |
| CREATED_DATE | SYSDATE | Document upload timestamp... |
| CREATED_BY | :GLOBAL.user_id | User who uploaded document... |
| DOWNLOAD_YN | **'N'** | 'Y'=document exists and downloadable 'N'=not available... |
| DEALER_MAP_CD | Auto from main block | Dealer code for organization... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| SRL_NUM | NUMBER | - | Yes |  Display, primary key  Auto-generated... |
| CLIENT_PATH | VARCHAR2 | 1000 | No |  Display... |
| DOC_SIZE | NUMBER | - | No |  Display, calculated in KB  **Max 5MB (5120 KB)**... |
| REMARKS | VARCHAR2 | 500 | Yes |  Mandatory  Multiline  Error: "Remarks cannot be b... |
| FILENAME | VARCHAR2 | 100 | No |  Auto-populated... |
| FILEPATH | VARCHAR2 | 100 | No |  Auto-populated  Format: /extended_warranty/[polic... |
| EXT | VARCHAR2 | 5 | No |  Auto-populated... |
| CREATED_DATE | DATE | - | No |  Auto-populated  Format: DD-MM-RRRR HH24:MI... |
| CREATED_BY | VARCHAR2 | 20 | No |  Auto-populated... |
| DOWNLOAD_YN | VARCHAR2 | 1 | No |  System field  Y/N values... |
| DEALER_MAP_CD | VARCHAR2 | 10 | No |  Auto-populated... |

---

### US-014: CCP Add-on Package Selection

**User Story:**
> As a dealer user, I want to select CCP add-on packages for the warranty

**BRD Section:** CCP Add-on Block Fields (B_ADDON)

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| ADDON_CODE | From AM_LIST | Package code (E0000, E0001, etc.)... |
| ADDON_DESC | From AM_LIST | Package description (No Product, Standard CCP, Premium CCP, ... |
| ADDON_BASIC_PRICE | From AM_LIST | List price before discount... |
| ADDON_DISC_AMT | Calculated | Discount applied on package... |
| ADDON_BASIC_AMT | Calculated | **Formula**: ADDON_BASIC_PRICE - ADDON_DISC_AMT  Via PKG_ADD... |
| ADDON_CGST_AMT | Calculated | CGST on package (when main GST_TYPE='S')... |
| ADDON_SGST_AMT | Calculated | SGST on package (when main GST_TYPE='S')... |
| ADDON_IGST_AMT | Calculated | IGST on package (when main GST_TYPE='I')... |
| ADDON_TOT_AMT | Calculated | **Formula**: ADDON_BASIC_AMT + GST amounts... |
| ADDON_YN | **'N'** |  Y=selected, N=not selected  E0000 "No Product" unchecks all... |
| ADDON_GST_TYPE | From main block | Determines CGST/SGST vs IGST... |
| ADDON_CGST_RATE | From parameters | CGST rate % for addon... |
| ADDON_SGST_RATE | From parameters | SGST rate % for addon... |
| ADDON_IGST_RATE | From parameters | IGST rate % for addon... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| ADDON_CODE | VARCHAR2 | 7 | No |  Display only... |
| ADDON_DESC | VARCHAR2 | 100 | No |  Display only... |
| ADDON_BASIC_PRICE | NUMBER | - | No |  Display  Format: 99999999999.99... |
| ADDON_DISC_AMT | NUMBER | - | No |  Display  Format: 99999999999.99... |
| ADDON_BASIC_AMT | NUMBER | - | No |  Display, calculated  Format: 99999999999.99... |
| ADDON_CGST_AMT | NUMBER | - | No |  Display, calculated  Format: 99999999999.99... |
| ADDON_SGST_AMT | NUMBER | - | No |  Display, calculated  Format: 99999999999.99... |
| ADDON_IGST_AMT | NUMBER | - | No |  Display, calculated  Format: 99999999999.99... |
| ADDON_TOT_AMT | NUMBER | - | No |  Display, calculated  Format: 99999999999.99... |
| ADDON_YN | VARCHAR2 | 1 | No |  Checkbox  Y/N values  **Mutual exclusivity**: E00... |
| ADDON_GST_TYPE | VARCHAR2 | 3 | No |  Display  Inherited from main GST_TYPE... |
| ADDON_CGST_RATE | NUMBER | - | No |  Display... |
| ADDON_SGST_RATE | NUMBER | - | No |  Display... |
| ADDON_IGST_RATE | NUMBER | - | No |  Display... |

---

### US-015: Default Values Summary

**User Story:**
> As a user, I want to manage default values summary

**BRD Section:** Default Values Summary

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_CONTRACT_DATE | SYSDATE | ... |
| EXTE_CREATED_DATE | SYSDATE | ... |
| CREATED_DATE (docs) | SYSDATE | ... |
| EXTE_CREATED_BY | :GLOBAL.user_id | ... |
| CREATED_BY (docs) | :GLOBAL.user_id | ... |
| PAY_MODE | 'C' (Cash) | ... |
| TOTAL_PREMIUM | 0 | ... |
| EXTE_PREMIUM_CALCULATED | 0 | ... |
| All GST amount fields | 0 | ... |
| ADDON_YN | 'N' | ... |
| DOWNLOAD_YN | 'N' | ... |
| NB_LOY_OTP_VALIDATE | 'N' | ... |
| EXTE_FREE_FLAG | 'N' | ... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_CONTRACT_DATE |  |  |  | ... |
| EXTE_CREATED_DATE |  |  |  | ... |
| CREATED_DATE (docs) |  |  |  | ... |
| EXTE_CREATED_BY |  |  |  | ... |
| CREATED_BY (docs) |  |  |  | ... |
| PAY_MODE |  |  |  | ... |
| TOTAL_PREMIUM |  |  |  | ... |
| EXTE_PREMIUM_CALCULATED |  |  |  | ... |
| All GST amount fields |  |  |  | ... |
| ADDON_YN |  |  |  | ... |
| DOWNLOAD_YN |  |  |  | ... |
| NB_LOY_OTP_VALIDATE |  |  |  | ... |
| EXTE_FREE_FLAG |  |  |  | ... |

---

### US-016: Default Values Summary

**User Story:**
> As a user, I want to manage default values summary

**BRD Section:** Default Values Summary

#### Acceptance Criteria

**Default Values:**
| Field | Default Value | Business Logic |
|-------|---------------|----------------|
| EXTE_VALID_MILEAGE | **40,000 km (OLD type)**<br>** | ... |
| NB_EWR_PUR_MILEAGE | **40,000 km (OLD type)**<br>** | ... |
| EXTE_PREM_CGST_RATE | 9% (typical) | ... |
| EXTE_PREM_SGST_RATE | 9% (typical) | ... |
| EXTE_PREM_IGST_RATE | 18% (typical) | ... |
| GST_STATE_CD | From VM_EW_PARAM | ... |
| SAC_CODE | From VM_EW_PARAM | ... |
| All vehicle fields | From GM_VIN | ... |
| All customer fields | From GM_CIN | ... |
| Loyalty fields | From GD_LOYALTY_ENROL | ... |
| CCP package details | From AM_LIST | ... |

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_VALID_MILEAGE |  |  |  | ... |
| NB_EWR_PUR_MILEAGE |  |  |  | ... |
| EXTE_PREM_CGST_RATE |  |  |  | ... |
| EXTE_PREM_SGST_RATE |  |  |  | ... |
| EXTE_PREM_IGST_RATE |  |  |  | ... |
| GST_STATE_CD |  |  |  | ... |
| SAC_CODE |  |  |  | ... |
| All vehicle fields |  |  |  | ... |
| All customer fields |  |  |  | ... |
| Loyalty fields |  |  |  | ... |
| CCP package details |  |  |  | ... |

---

### US-017: Default Values Summary

**User Story:**
> As a user, I want to manage default values summary

**BRD Section:** Default Values Summary

#### Acceptance Criteria

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| EXTE_VALID_MILEAGE |  |  |  | ... |
| NB_EWR_PUR_MILEAGE |  |  |  | ... |
| NB_EWR_TYPE |  |  |  | ... |

---

### US-018: Validation Triggers Summary

**User Story:**
> As a user, I want to manage validation triggers summary

**BRD Section:** Validation Triggers Summary

#### Acceptance Criteria

#### Field Validations (Frontend & Backend)

| Field | Type | Length | Mandatory | Validation Rules |
|-------|------|--------|-----------|------------------|
| NB_EWARR_NUM |  |  |  | ... |
| PAY_MODE |  |  |  | ... |
| VIN |  |  |  | ... |
| NB_EXTE_WARR_TYPE_OLD |  |  |  | ... |
| NB_EXTE_WARR_TYPE_NEW |  |  |  | ... |
| EXTE_WARR_TYPE |  |  |  | ... |
| EXTE_CONTRACT_MILEAGE |  |  |  | ... |
| EXTE_EMP_CD |  |  |  | ... |
| EXTE_VALID_DATE |  |  |  | ... |
| LOYL_REDEEM_PTS |  |  |  | ... |
| REMARKS |  |  |  | ... |

---

## 🔧 Backend Validation Rules (.NET)

The following validation methods are implemented in `backend/Services/ValidationService.cs`:

| Method | Description | BRD Reference |
|--------|-------------|---------------|
| ValidateVIN | Validate V I N | BRD validated |
| ValidateGST | Validate G S T | BRD validated |
| ValidatePaymentMode | Validate Payment Mode | BRD validated |
| ValidateDocuments | Validate Documents | BRD validated |
| ValidateWarrantyType | Validate Warranty Type | BRD validated |
| ValidateMobile | Validate Mobile | BRD validated |
| ValidateEmail | Validate Email | BRD validated |
| ValidateName | Validate Name | BRD validated |
| ValidateMileage | Validate Mileage | BRD validated |
| ValidateAddress | Validate Address | BRD validated |

### Validation Method Details

#### ValidateVIN
- **Description:** Validate V I N
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "VIN is required (BRD: Mandatory field)"
  - "VIN must be 17-25 characters (BRD: OEM VIN format)"
  - "VIN must contain only letters and numbers (BRD: OEM format)"

#### ValidateGST
- **Description:** Validate G S T
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "GST number is required (BRD: Mandatory)"
  - "GST number must be 15 characters (BRD: Length validation)"
  - "Invalid GST number format (BRD: pkg_einv.sp_validate_gstn)"

#### ValidatePaymentMode
- **Description:** Validate Payment Mode
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "Payment mode is required (BRD: Cannot be NULL)"
  - "Invalid payment mode (BRD: Please select payment mode)"
  - "Bank name is required for cheque payment (BRD: Mandatory for cheque/DD)"
  - "Cheque number is required for cheque payment (BRD: Mandatory for cheque/DD)"

#### ValidateDocuments
- **Description:** Validate Documents
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "Please upload minimum 4 documents (BRD: Minimum requirement)"

#### ValidateWarrantyType
- **Description:** Validate Warranty Type
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "Warranty type is required (BRD: Mandatory)"
  - "Invalid warranty type (BRD: Must exist in VM_EW_PARAM)"

#### ValidateMobile
- **Description:** Validate Mobile
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "Phone number is required (BRD: Mandatory)"
  - "Phone must be 10 digits (BRD: Indian mobile format)"
  - "Phone must start with 6, 7, 8, or 9 (BRD: Indian mobile)"

#### ValidateEmail
- **Description:** Validate Email
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "Email is required (BRD: Mandatory)"
  - "Invalid email format (BRD: Standard email validation)"

#### ValidateName
- **Description:** Validate Name
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "Name is required (BRD: Mandatory)"
  - "Name must be at least 3 characters (BRD: Min length)"
  - "Name can only contain letters and spaces (BRD: Format)"

#### ValidateMileage
- **Description:** Validate Mileage
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "Mileage must be a positive number (BRD: Validation)"

#### ValidateAddress
- **Description:** Validate Address
- **BRD Rule:** See BRD document
- **Error Messages:**
  - "Address is required (BRD: Mandatory)"
  - "Address must be at least 3 characters (BRD: Min length)"

## 🎨 Frontend Validation Rules (React)

The following validation functions are implemented in `src/utils/validations.js`:

### Validation Functions

| Function | Purpose |
|----------|---------|
| validateVIN | Validates V I N |
| validateEmail | Validates Email |
| validatePhone | Validates Phone |
| validateName | Validates Name |
| validateGST | Validates G S T |
| validateMileage | Validates Mileage |
| validateDate | Validates Date |
| validateAmount | Validates Amount |
| validateDocuments | Validates Documents |
| validateRequired | Validates Required |
| validateFieldByBRD | Validates Field By B R D |
| validateFormData | Validates Form Data |
| getFieldValidation | get Field Validation |
| getStoryValidations | get Story Validations |
| getMandatoryFields | get Mandatory Fields |
| getFieldDefault | get Field Default |

### BRD Field Validations (Auto-Generated)

Total: 115 field validations

| Field | Section | Mandatory | Data Type | Rules |
|-------|---------|-----------|-----------|-------|
| NB_EWARR_NUM | Control Block Fields | Yes | VARCHAR2 | Required | Type: VARCHAR2 | Length: 12 |... |
| PAY_MODE | Control Block Fields | Yes | VARCHAR2 | Required | Type: VARCHAR2 | Length: 50 |... |
| TOTAL_PREMIUM | Control Block Fields | No | NUMBER | Type: NUMBER | Display only (calculated)... |
| STATUS | Control Block Fields | No | VARCHAR2 | Type: VARCHAR2 | Length: 20 | Display on... |
| EXTE_POLICY_NO | Main Transaction Blo | Yes | VARCHAR2 | Required | Type: VARCHAR2 | Length: 12 |... |
| EXTE_CONTRACT_DATE | Main Transaction Blo | No | DATE | Type: DATE | Auto-populated Disabled (ca... |
| EXTE_WARR_TYPE | Main Transaction Blo | Yes | VARCHAR2 | Required | Type: VARCHAR2 | Length: 3 | ... |
| NB_EXTE_WARR_TYPE_OLD | Main Transaction Blo | Conditional | VARCHAR2 | Type: VARCHAR2 | Length: 3 | Mandatory f... |
| NB_EXTE_WARR_TYPE_NEW | Main Transaction Blo | Conditional | VARCHAR2 | Type: VARCHAR2 | Length: 3 | Mandatory f... |
| EXTE_VALID_DATE | Main Transaction Blo | Yes | DATE | Required | Type: DATE | Mandatory Must b... |
| EXTE_VALID_MILEAGE | Main Transaction Blo | Yes | NUMBER | Required | Type: NUMBER | Length: 6 | Ma... |
| EXTE_START_DATE | Main Transaction Blo | No | DATE | Type: DATE | Display only Format: DD-MM-... |
| EXTE_BOOKLET_NO | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 12 | Optional t... |
| EXTE_FREE_FLAG | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 1 | Display onl... |
| VIN | Main Transaction Blo | Yes | VARCHAR2 | Required | Type: VARCHAR2 | Length: 25 |... |
| EXTE_VIN_NO | Main Transaction Blo | Yes | VARCHAR2 | Required | Type: VARCHAR2 | Length: 17 |... |
| OEM_VIN_NUMBER | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 25 | Display on... |
| EXTE_CHASSIS_NO | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 7 | Display onl... |
| EXTE_ENGINE_NO | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 7 | Display onl... |
| EXTE_REGISTRATION_NO | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 20 | Display on... |
| EXTE_MODL_CODE | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 5 | Display onl... |
| EXTE_VARIANT_CD | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 8 | Display onl... |
| EXTE_SERV_MODL | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 50 | Display on... |
| EXTE_RETLSALE_DT | Main Transaction Blo | No | DATE | Type: DATE | Display only Format: DD-MM-... |
| EXTE_CONTRACT_MILEAGE | Main Transaction Blo | Yes | NUMBER | Required | Type: NUMBER | Length: 6 | Ma... |
| DUMMY_MILEAGE | Main Transaction Blo | No | NUMBER | Type: NUMBER | Length: 9 | System field ... |
| NB_EWR_PUR_MILEAGE | Main Transaction Blo | No | NUMBER | Type: NUMBER | Length: 6 | Display only ... |
| NB_LAST_MILEAGE | Main Transaction Blo | No | NUMBER | Type: NUMBER | Length: 6 | Display only ... |
| NB_PRJ_MILEAGE | Main Transaction Blo | No | NUMBER | Type: NUMBER | Length: 6 | Display only ... |
| EXTE_CUST_CD | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 10 | Auto-popul... |
| EXTE_CUST_NAME | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 100 | Display, ... |
| EXTE_CUST_ADD1 | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 200 | Display, ... |
| EXTE_CUST_ADD2 | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 200 | Display, ... |
| EXTE_CUST_ADD3 | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 200 | Display, ... |
| EXTE_CUST_CITY | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 30 | Display, d... |
| EXTE_CUST_STATE | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 50 | Display, d... |
| EXTE_CUST_PIN | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 6 | Display, di... |
| EXTE_CUST_EMAIL | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 100 | Display, ... |
| EXTE_CUST_PHONE | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 50 | Display, d... |
| EXTE_CUST_PHONE2 | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 50 | Display, d... |
| EXTE_CUST_MOBILE | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 50 | Display, d... |
| CUST_GST_NUM | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 30 | Display, d... |
| EXTE_PREMIUM_CALCULATED | Main Transaction Blo | No | NUMBER | Type: NUMBER | Disabled, calculated Form... |
| EXTE_PREMIUM | Main Transaction Blo | No | NUMBER | Type: NUMBER | Disabled, calculated Form... |
| EXTE_PREMIUM_RCVD | Main Transaction Blo | No | NUMBER | Type: NUMBER | Editable Format: 99999999... |
| EXTE_BANK_NAME | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 40 | Upper case... |
| EXTE_CHEQUE_NO | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 12 | Upper case... |
| EXTE_CHEQUE_DATE | Main Transaction Blo | No | DATE | Type: DATE | Format: DD-MM-RRRR Required... |
| EXTE_INFAVOUR_OF | Main Transaction Blo | No | VARCHAR2 | Type: VARCHAR2 | Length: 60 | Upper case... |
| GST_TYPE | Main Transaction Blo | Yes | VARCHAR2 | Required | Type: VARCHAR2 | Length: 3 | ... |

*... and 65 more field validations*

## 📋 Business Rules Summary

### Critical Validation Rules

| Rule | Frontend | Backend | BRD Reference |
|------|----------|---------|---------------|
| VIN must be 17-25 characters | ✅ | ✅ | OEM VIN format |
| Mobile must be 10 digits starting with 6-9 | ✅ | ✅ | Indian mobile format |
| Name must be min 3 characters | ✅ | ✅ | Min length validation |
| GST number must be 15 characters | ✅ | ✅ | pkg_einv.sp_validate_gstn |
| Minimum 4 documents required | ✅ | ✅ | Document upload requirement |
| Mileage limit: 40K (OLD) / 100K (NEW) | ✅ | ✅ | NB_EWR_PUR_MILEAGE |
| Payment mode cannot be NULL | ✅ | ✅ | Mandatory field |
| Cheque payment requires bank details | ✅ | ✅ | Conditional validation |

### Default Values

| Field | Default Value | Source |
|-------|---------------|--------|
| PAY_MODE | 'C' (Cash) | System |
| EXTE_CONTRACT_DATE | SYSDATE | System |
| EXTE_VALID_MILEAGE | 40K/100K km | GM_VAR table |
| NB_EWR_PUR_MILEAGE | 40K/100K km | GM_VAR table |
| ADDON_YN | 'N' | System |
| NB_LOY_OTP_VALIDATE | 'N' | System |
| GST Rates | 9%/18% | VM_EW_PARAM |

### GST Calculation Logic

```
IF warranty_state = customer_state THEN
    GST_TYPE = 'S' (State GST)
    Apply CGST (9%) + SGST (9%)
ELSE
    GST_TYPE = 'I' (Interstate GST)
    Apply IGST (18%)
END IF
```

### Premium Calculation Formula

```
Base Premium = PKG_EXTE_WAR calculation
EXTE_PREMIUM = Base Premium + CGST + SGST + IGST
CCP_TOTAL = SUM(ADDON_TOT_AMT) where ADDON_YN = 'Y'
TOTAL_PREMIUM = EXTE_PREMIUM + CCP_TOTAL - LOYL_REDEEM_AMT
```


---

## 📚 Document Information

| Property | Value |
|----------|-------|
| Generated | 1/16/2026, 11:41:57 AM |
| BRD Source | ExtendedWarranty_Complete_Field_Rules_and_Defaults 1.md |
| Frontend | React 18 + TypeScript + Vite |
| Backend | .NET 9.0 Web API |
| Repository | astharungta/Maruti-Demo-Kiro |

---

**End of User Story Catalogue**

*This document is automatically generated from the BRD and codebase to provide a comprehensive overview of user stories, acceptance criteria, and validation rules.*
