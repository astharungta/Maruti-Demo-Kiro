# 📋 User Story Catalogue
## Extended Warranty Management System

**Generated:** 1/16/2026, 12:57:32 PM  
**Source:** Figma Design Code Files (GitHub: astharungta/Figma-Design/New)  
**Application:** Maruti Suzuki Extended Warranty Portal

---

## 📊 Executive Summary

| Metric | Count |
|--------|-------|
| Total User Stories | 20 |
| Epics | 6 |
| Workflow Steps | 9 |
| Source Files Analyzed | 96 |

### Epics Overview
1. **Vehicle Identification & Eligibility** - 3 user stories
2. **Plan Selection & Customization** - 3 user stories
3. **Customer Verification** - 2 user stories
4. **Policy & Payment** - 6 user stories
5. **Invoice & Delivery** - 4 user stories
6. **Workflow Navigation** - 2 user stories

---

## 🎯 User Journey Overview

The Extended Warranty workflow consists of 9 sequential steps:

| Step | Name | Primary Actor | Description |
|------|------|---------------|-------------|
| 1 | Vehicle Identification | Dealer | Capture and validate vehicle details to initiate warranty process |
| 2 | Eligibility Check | System | Verify vehicle eligibility based on age, mileage, and service history |
| 3 | Plan Selection | Dealer/Customer | Select appropriate warranty plan and coverage tenure |
| 4 | Add-ons Selection | Dealer/Customer | Choose optional coverage add-ons to enhance warranty package |
| 5 | KYC Verification | Customer | Complete identity verification for policy issuance |
| 6 | Policy Confirmation | Dealer/Customer | Review and confirm policy details before payment |
| 7 | Payment Processing | Customer | Complete payment using preferred payment method |
| 8 | Invoice Generation | System | Generate invoice and policy documents after successful payment |
| 9 | Delivery Completion | Dealer | Complete warranty delivery and send confirmation to customer |

---

## 📝 User Stories by Epic

### Vehicle Identification & Eligibility

| ID | Title | Actor |
|----|-------|-------|
| US-001 | Capture Vehicle VIN for Warranty Eligibility | Dealer |
| US-002 | Scan RC Document for Vehicle Details | Dealer |
| US-003 | Check Vehicle Warranty Eligibility | System |

### Plan Selection & Customization

| ID | Title | Actor |
|----|-------|-------|
| US-004 | View and Compare Warranty Plans | Dealer/Customer |
| US-005 | Select Warranty Coverage Tenure | Dealer/Customer |
| US-006 | Select Optional Coverage Add-ons | Dealer/Customer |

### Customer Verification

| ID | Title | Actor |
|----|-------|-------|
| US-007 | Verify Customer Using Existing KYC | Customer |
| US-008 | Complete Manual KYC Entry | Customer |

### Policy & Payment

| ID | Title | Actor |
|----|-------|-------|
| US-009 | Review Policy Details Before Payment | Dealer/Customer |
| US-010 | Select Payment Method | Customer |
| US-011 | Pay Using Credit/Debit Card | Customer |
| US-012 | Pay Using UPI | Customer |
| US-013 | Convert Payment to EMI | Customer |
| US-014 | Redeem Loyalty Points | Customer |

### Invoice & Delivery

| ID | Title | Actor |
|----|-------|-------|
| US-015 | Generate Invoice After Payment | System |
| US-016 | Send Policy Documents via Email | Dealer |
| US-017 | Send Confirmation SMS | Dealer |
| US-018 | Complete Warranty Delivery Process | Dealer |

### Workflow Navigation

| ID | Title | Actor |
|----|-------|-------|
| US-019 | Navigate Through Warranty Workflow Steps | Dealer |
| US-020 | Cancel Warranty Application | Dealer |

---

## 📖 Detailed User Stories

### US-001: Capture Vehicle VIN for Warranty Eligibility

**Epic:** Vehicle Identification & Eligibility  
**Actor:** Dealer  
**Frontend Component:** `vehicle-id-capture.tsx`  
**Backend Services:** VIN validation API, Vehicle lookup service

#### User Story
> As a dealer, I want to capture the vehicle VIN number so that I can check if the vehicle is eligible for extended warranty.

#### Acceptance Criteria
1. VIN input field accepts 17-25 alphanumeric characters
2. VIN is validated in real-time as user types
3. Invalid VIN format shows clear error message
4. System fetches vehicle details (make, model, year, registration) from VIN
5. Multiple vehicles can be added for batch processing

---

### US-002: Scan RC Document for Vehicle Details

**Epic:** Vehicle Identification & Eligibility  
**Actor:** Dealer  
**Frontend Component:** `vehicle-id-capture.tsx`  
**Backend Services:** OCR service, Document processing API

#### User Story
> As a dealer, I want to scan the Registration Certificate (RC) document so that vehicle details are automatically captured without manual entry.

#### Acceptance Criteria
1. OCR scanner activates camera for document capture
2. System extracts VIN from scanned RC document
3. Extracted data is validated before proceeding
4. Manual entry option available if scan fails
5. Scanning progress indicator shown during processing

---

### US-003: Check Vehicle Warranty Eligibility

**Epic:** Vehicle Identification & Eligibility  
**Actor:** System  
**Frontend Component:** `eligibility-check.tsx`  
**Backend Services:** Eligibility validation service, Vehicle history API

#### User Story
> As a system, I want to automatically check vehicle eligibility based on age, mileage, and service history so that only qualified vehicles proceed to warranty selection.

#### Acceptance Criteria
1. Vehicle age must be less than 3 years from manufacture date
2. Mileage must be under 40,000 km for OLD vehicles or 100,000 km for NEW vehicles
3. Service history must be up to date with authorized service centers
4. Eligibility check shows progress indicator during validation
5. Clear pass/fail status displayed for each eligibility criterion
6. Ineligible vehicles show specific reasons for rejection

---

### US-004: View and Compare Warranty Plans

**Epic:** Plan Selection & Customization  
**Actor:** Dealer/Customer  
**Frontend Component:** `plan-selection.tsx`  
**Backend Services:** Plan catalog service, Pricing API

#### User Story
> As a dealer or customer, I want to view and compare available warranty plans so that I can choose the most suitable coverage option.

#### Acceptance Criteria
1. Three warranty plans displayed: Platinum, Royal Platinum, Solitaire
2. Each plan shows coverage details, price per year, and maximum tenure
3. Recommended plan is highlighted for easy identification
4. Plan comparison shows coverage differences clearly
5. Platinum: Engine, Transmission, Electrical, Fuel, Cooling systems
6. Royal Platinum: All Platinum + AC, Suspension, Steering, Brakes
7. Solitaire: All Royal Platinum + Infotainment, Power systems, Airbags

---

### US-005: Select Warranty Coverage Tenure

**Epic:** Plan Selection & Customization  
**Actor:** Dealer/Customer  
**Frontend Component:** `plan-selection.tsx`  
**Backend Services:** Premium calculation service

#### User Story
> As a dealer or customer, I want to select the coverage tenure (1-6 years) so that I can customize the warranty duration based on my needs.

#### Acceptance Criteria
1. Tenure dropdown shows available options based on selected plan
2. Platinum plan allows up to 4 years tenure
3. Royal Platinum plan allows up to 5 years tenure
4. Solitaire plan allows up to 6 years tenure
5. Total premium updates automatically when tenure changes
6. Premium calculation: Base price × Number of years

---

### US-006: Select Optional Coverage Add-ons

**Epic:** Plan Selection & Customization  
**Actor:** Dealer/Customer  
**Frontend Component:** `addons-selection.tsx`  
**Backend Services:** Add-on catalog service, Premium calculation

#### User Story
> As a dealer or customer, I want to select optional add-on packages so that I can enhance my warranty coverage for specific risks.

#### Acceptance Criteria
1. Three CCP add-ons available: CCP Fuel (₹3,999), CCP Hydro (₹5,999), CCP Plus (₹8,999)
2. CCP Fuel covers repairs due to fuel quality issues
3. CCP Hydro covers repairs due to water entering the engine
4. CCP Plus covers both fuel quality and water damage
5. Recommended add-on is highlighted
6. Add-on prices are added to base premium
7. Premium summary updates in real-time as add-ons are selected/deselected

---

### US-007: Verify Customer Using Existing KYC

**Epic:** Customer Verification  
**Actor:** Customer  
**Frontend Component:** `kyc-verification.tsx`  
**Backend Services:** KYC verification service, Customer database

#### User Story
> As a customer, I want to use my existing KYC records so that I can complete verification quickly without re-submitting documents.

#### Acceptance Criteria
1. System checks for existing KYC records automatically
2. Loading indicator shown during KYC lookup
3. If found, displays masked Aadhaar (XXXX XXXX 1234) and PAN details
4. Customer name and verification date displayed
5. Green success indicator when KYC is verified
6. Option to proceed with existing KYC or enter new details

---

### US-008: Complete Manual KYC Entry

**Epic:** Customer Verification  
**Actor:** Customer  
**Frontend Component:** `kyc-verification.tsx`  
**Backend Services:** Document upload service, KYC validation API

#### User Story
> As a customer, I want to manually enter my KYC details and upload documents so that I can complete verification when existing records are not available.

#### Acceptance Criteria
1. Customer name field accepts minimum 3 characters
2. Aadhaar number field accepts 12 digits in XXXX XXXX XXXX format
3. PAN number field accepts 10 alphanumeric characters (ABCDE1234F format)
4. Mobile number accepts 10 digits starting with 6-9
5. Email address validated for proper format
6. Document upload supports Aadhaar Card, PAN Card, and Address Proof
7. Accepted file formats: images and PDF
8. Upload progress indicator shown for each document
9. All three documents required for manual KYC completion

---

### US-009: Review Policy Details Before Payment

**Epic:** Policy & Payment  
**Actor:** Dealer/Customer  
**Frontend Component:** `policy-confirmation.tsx`  
**Backend Services:** Policy generation service, Premium calculation

#### User Story
> As a dealer or customer, I want to review the complete policy details including premium breakdown so that I can confirm the purchase before payment.

#### Acceptance Criteria
1. Policy preview shows plan name, tenure, and coverage period
2. Premium breakdown displays base premium, add-ons, subtotal
3. GST (18%) calculated and displayed separately
4. Total payable amount shown prominently
5. Customer and vehicle details displayed for verification
6. Policy number generated and displayed
7. Issue date and expiry date shown
8. Option to download or email policy preview
9. Re-calculate button available to modify selections

---

### US-010: Select Payment Method

**Epic:** Policy & Payment  
**Actor:** Customer  
**Frontend Component:** `payment-options.tsx`  
**Backend Services:** Payment gateway integration

#### User Story
> As a customer, I want to choose from multiple payment options so that I can pay using my preferred method.

#### Acceptance Criteria
1. Six payment methods available: Credit/Debit Card, UPI, Car Wallet EMI, Other EMI, Loyalty Points, Cash
2. Popular payment methods (Card, UPI) are highlighted
3. Each method shows description and any special features
4. Payment method selection updates the payment form dynamically
5. Total amount displayed in payment summary sidebar
6. Secure payment indicator shown

---

### US-011: Pay Using Credit/Debit Card

**Epic:** Policy & Payment  
**Actor:** Customer  
**Frontend Component:** `payment-options.tsx`  
**Backend Services:** Card payment gateway

#### User Story
> As a customer, I want to pay using my credit or debit card so that I can complete the transaction securely.

#### Acceptance Criteria
1. Card number field accepts 16 digits with auto-formatting
2. Expiry date field accepts MM/YY format
3. CVV field accepts 3 digits and masks input
4. Cardholder name field for verification
5. Card type auto-detected from card number
6. Secure payment processing with encryption

---

### US-012: Pay Using UPI

**Epic:** Policy & Payment  
**Actor:** Customer  
**Frontend Component:** `payment-options.tsx`  
**Backend Services:** UPI payment gateway

#### User Story
> As a customer, I want to pay using UPI so that I can complete payment quickly using my preferred UPI app.

#### Acceptance Criteria
1. UPI ID input field with format validation (yourname@upi)
2. QR code displayed for scanning with any UPI app
3. Supports GPay, PhonePe, Paytm and other UPI apps
4. Payment confirmation received in real-time

---

### US-013: Convert Payment to EMI

**Epic:** Policy & Payment  
**Actor:** Customer  
**Frontend Component:** `payment-options.tsx`  
**Backend Services:** EMI calculation service, Financing partners API

#### User Story
> As a customer, I want to convert my payment to EMI so that I can pay in easy monthly installments.

#### Acceptance Criteria
1. Car Wallet EMI offers 3, 6, 9, 12 month options
2. Other EMI (Bajaj Finserv, HDFC) offers 3, 6, 9, 12, 18, 24 month options
3. Monthly EMI amount calculated and displayed for each tenure
4. EMI details shown: amount per month × number of months
5. Total EMI cost displayed for transparency

---

### US-014: Redeem Loyalty Points

**Epic:** Policy & Payment  
**Actor:** Customer  
**Frontend Component:** `payment-options.tsx`  
**Backend Services:** Loyalty points service

#### User Story
> As a customer, I want to redeem my loyalty points so that I can reduce the payment amount.

#### Acceptance Criteria
1. Available loyalty points balance displayed (e.g., 25,000 points)
2. Conversion rate shown: 1 point = ₹1
3. Maximum redemption limit enforced (₹5,000)
4. Points input field with validation
5. Remaining amount to be paid via other method displayed

---

### US-015: Generate Invoice After Payment

**Epic:** Invoice & Delivery  
**Actor:** System  
**Frontend Component:** `invoice-generation.tsx`  
**Backend Services:** Invoice generation service, PDF generator

#### User Story
> As a system, I want to generate a detailed invoice after successful payment so that the customer has a record of the transaction.

#### Acceptance Criteria
1. Payment success banner displayed with confirmation
2. Invoice number generated automatically
3. Invoice shows dealer details with GSTIN
4. Customer billing details displayed
5. Vehicle details included (Model, Registration, VIN)
6. Itemized breakdown: Plan premium, Add-ons, GST
7. Payment method and transaction ID recorded
8. Download, Print, and Email options available
9. Terms and conditions included

---

### US-016: Send Policy Documents via Email

**Epic:** Invoice & Delivery  
**Actor:** Dealer  
**Frontend Component:** `delivery-completion.tsx`  
**Backend Services:** Email service, Document attachment service

#### User Story
> As a dealer, I want to send policy documents to the customer via email so that they have digital copies of their warranty.

#### Acceptance Criteria
1. Customer email pre-populated from KYC data
2. Email subject includes policy number
3. Email body contains policy summary and portal access link
4. Three attachments: Warranty Policy Certificate, Invoice, Terms & Conditions
5. Email preview shown before sending
6. Send confirmation displayed after successful delivery

---

### US-017: Send Confirmation SMS

**Epic:** Invoice & Delivery  
**Actor:** Dealer  
**Frontend Component:** `delivery-completion.tsx`  
**Backend Services:** SMS gateway service

#### User Story
> As a dealer, I want to send a confirmation SMS to the customer so that they receive immediate notification of warranty activation.

#### Acceptance Criteria
1. Customer mobile number pre-populated from KYC data
2. SMS contains policy number, vehicle registration, premium amount
3. Support contact number included in SMS
4. Character count displayed (160 character limit)
5. SMS sent from official Maruti Suzuki sender ID (SM-MARUTI)
6. Send confirmation displayed after successful delivery

---

### US-018: Complete Warranty Delivery Process

**Epic:** Invoice & Delivery  
**Actor:** Dealer  
**Frontend Component:** `delivery-completion.tsx`  
**Backend Services:** Workflow state management

#### User Story
> As a dealer, I want to complete the warranty delivery process so that I can process another warranty application.

#### Acceptance Criteria
1. Success banner confirms warranty activation
2. Policy number, status (Active), and customer name displayed
3. Process summary shows all completed steps: Policy Created, Certificate Generated, Invoice Generated, Payment Completed
4. Quick actions available: Download Policy, Download Invoice
5. Complete & Process Another button resets workflow for new application
6. All workflow data cleared for fresh start

---

### US-019: Navigate Through Warranty Workflow Steps

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
7. Smooth scroll to top when navigating between steps

---

### US-020: Cancel Warranty Application

**Epic:** Workflow Navigation  
**Actor:** Dealer  
**Frontend Component:** `warranty-workflow.tsx`  
**Backend Services:** Workflow state management

#### User Story
> As a dealer, I want to cancel the warranty application at any step so that I can exit the process if needed.

#### Acceptance Criteria
1. Cancel button available on each workflow step
2. Confirmation prompt before cancellation
3. All entered data cleared on cancellation
4. User returned to initial state or dashboard

---

## 🛠️ Technology Stack

Based on analysis of source files:

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with PostCSS
- **UI Components:** shadcn/ui (MIT License)
- **Icons:** Lucide React

### Backend
- **Framework:** .NET 9.0
- **API:** RESTful Web API
- **Validation:** Custom validation services

### Key Dependencies
| Package | Version | Type |
|---------|---------|------|
| @emotion/react | 11.14.0 | Runtime |
| @emotion/styled | 11.14.1 | Runtime |
| @mui/icons-material | 7.3.5 | Runtime |
| @mui/material | 7.3.5 | Runtime |
| @popperjs/core | 2.11.8 | Runtime |
| @radix-ui/react-accordion | 1.2.3 | Runtime |
| @radix-ui/react-alert-dialog | 1.1.6 | Runtime |
| @radix-ui/react-aspect-ratio | 1.1.2 | Runtime |
| @radix-ui/react-avatar | 1.1.3 | Runtime |
| @radix-ui/react-checkbox | 1.1.4 | Runtime |
| @tailwindcss/vite | 4.1.12 | Dev |
| @vitejs/plugin-react | 4.7.0 | Dev |
| tailwindcss | 4.1.12 | Dev |
| vite | 6.3.5 | Dev |

## 📁 Source Files Analyzed

| File | Type | Path |
|------|------|------|
| ATTRIBUTIONS (1).md | Documentation | ATTRIBUTIONS (1).md |
| ATTRIBUTIONS.md | Documentation | ATTRIBUTIONS.md |
| Guidelines.md | Documentation | Guidelines.md |
| Guidelines1.md | Documentation | Guidelines1.md |
| package (1).json | Configuration | package (1).json |
| package.json | Configuration | package.json |
| postcss.config (1).mjs | ES Module | postcss.config (1).mjs |
| postcss.config.mjs | ES Module | postcss.config.mjs |
| App.tsx | React Component | src\app\App.tsx |
| AdminView.tsx | React Component | src\app\components\AdminView.tsx |
| AgentPerformanceChart.tsx | React Component | src\app\components\AgentPerformanceChart.tsx |
| BusinessView.tsx | React Component | src\app\components\BusinessView.tsx |
| dashboard.tsx | React Component | src\app\components\dashboard.tsx |
| DashboardFilters.tsx | React Component | src\app\components\DashboardFilters.tsx |
| dms-sidebar.tsx | React Component | src\app\components\dms-sidebar.tsx |
| dms-topbar.tsx | React Component | src\app\components\dms-topbar.tsx |
| FailedValidationsDialog.tsx | React Component | src\app\components\FailedValidationsDialog.tsx |
| ImageWithFallback.tsx | React Component | src\app\components\figma\ImageWithFallback.tsx |
| Header.tsx | React Component | src\app\components\Header.tsx |
| kpi-card.tsx | React Component | src\app\components\kpi-card.tsx |
| KpiCard.tsx | React Component | src\app\components\KpiCard.tsx |
| OrderSourceChart.tsx | React Component | src\app\components\OrderSourceChart.tsx |
| OrderVolumeChart.tsx | React Component | src\app\components\OrderVolumeChart.tsx |
| RecentOrdersTable.tsx | React Component | src\app\components\RecentOrdersTable.tsx |
| Sidebar.tsx | React Component | src\app\components\Sidebar.tsx |
| SystemUsageTrendChart.tsx | React Component | src\app\components\SystemUsageTrendChart.tsx |
| TokenDetailsDialog.tsx | React Component | src\app\components\TokenDetailsDialog.tsx |
| TokenUsageChart.tsx | React Component | src\app\components\TokenUsageChart.tsx |
| accordion.tsx | React Component | src\app\components\ui\accordion.tsx |
| alert-dialog.tsx | React Component | src\app\components\ui\alert-dialog.tsx |
| alert.tsx | React Component | src\app\components\ui\alert.tsx |
| aspect-ratio.tsx | React Component | src\app\components\ui\aspect-ratio.tsx |
| avatar.tsx | React Component | src\app\components\ui\avatar.tsx |
| badge.tsx | React Component | src\app\components\ui\badge.tsx |
| breadcrumb.tsx | React Component | src\app\components\ui\breadcrumb.tsx |
| button.tsx | React Component | src\app\components\ui\button.tsx |
| calendar.tsx | React Component | src\app\components\ui\calendar.tsx |
| card.tsx | React Component | src\app\components\ui\card.tsx |
| carousel.tsx | React Component | src\app\components\ui\carousel.tsx |
| chart.tsx | React Component | src\app\components\ui\chart.tsx |
| checkbox.tsx | React Component | src\app\components\ui\checkbox.tsx |
| collapsible.tsx | React Component | src\app\components\ui\collapsible.tsx |
| command.tsx | React Component | src\app\components\ui\command.tsx |
| context-menu.tsx | React Component | src\app\components\ui\context-menu.tsx |
| dialog.tsx | React Component | src\app\components\ui\dialog.tsx |
| drawer.tsx | React Component | src\app\components\ui\drawer.tsx |
| dropdown-menu.tsx | React Component | src\app\components\ui\dropdown-menu.tsx |
| form.tsx | React Component | src\app\components\ui\form.tsx |
| hover-card.tsx | React Component | src\app\components\ui\hover-card.tsx |
| input-otp.tsx | React Component | src\app\components\ui\input-otp.tsx |
| input.tsx | React Component | src\app\components\ui\input.tsx |
| label.tsx | React Component | src\app\components\ui\label.tsx |
| menubar.tsx | React Component | src\app\components\ui\menubar.tsx |
| navigation-menu.tsx | React Component | src\app\components\ui\navigation-menu.tsx |
| pagination.tsx | React Component | src\app\components\ui\pagination.tsx |
| popover.tsx | React Component | src\app\components\ui\popover.tsx |
| progress.tsx | React Component | src\app\components\ui\progress.tsx |
| radio-group.tsx | React Component | src\app\components\ui\radio-group.tsx |
| resizable.tsx | React Component | src\app\components\ui\resizable.tsx |
| scroll-area.tsx | React Component | src\app\components\ui\scroll-area.tsx |
| select.tsx | React Component | src\app\components\ui\select.tsx |
| separator.tsx | React Component | src\app\components\ui\separator.tsx |
| sheet.tsx | React Component | src\app\components\ui\sheet.tsx |
| sidebar.tsx | React Component | src\app\components\ui\sidebar.tsx |
| skeleton.tsx | React Component | src\app\components\ui\skeleton.tsx |
| slider.tsx | React Component | src\app\components\ui\slider.tsx |
| sonner.tsx | React Component | src\app\components\ui\sonner.tsx |
| switch.tsx | React Component | src\app\components\ui\switch.tsx |
| table.tsx | React Component | src\app\components\ui\table.tsx |
| tabs.tsx | React Component | src\app\components\ui\tabs.tsx |
| textarea.tsx | React Component | src\app\components\ui\textarea.tsx |
| toggle-group.tsx | React Component | src\app\components\ui\toggle-group.tsx |
| toggle.tsx | React Component | src\app\components\ui\toggle.tsx |
| tooltip.tsx | React Component | src\app\components\ui\tooltip.tsx |
| use-mobile.ts | TypeScript | src\app\components\ui\use-mobile.ts |
| utils.ts | TypeScript | src\app\components\ui\utils.ts |
| addons-selection.tsx | React Component | src\app\components\warranty\addons-selection.tsx |
| delivery-completion.tsx | React Component | src\app\components\warranty\delivery-completion.tsx |
| eligibility-check.tsx | React Component | src\app\components\warranty\eligibility-check.tsx |
| invoice-generation.tsx | React Component | src\app\components\warranty\invoice-generation.tsx |
| kyc-verification.tsx | React Component | src\app\components\warranty\kyc-verification.tsx |
| payment-options.tsx | React Component | src\app\components\warranty\payment-options.tsx |
| plan-selection.tsx | React Component | src\app\components\warranty\plan-selection.tsx |
| policy-confirmation.tsx | React Component | src\app\components\warranty\policy-confirmation.tsx |
| vehicle-id-capture.tsx | React Component | src\app\components\warranty\vehicle-id-capture.tsx |
| warranty-workflow.tsx | React Component | src\app\components\warranty-workflow.tsx |
| workflow-stepper.tsx | React Component | src\app\components\workflow-stepper.tsx |
| main.tsx | React Component | src\main.tsx |
| api.ts | TypeScript | src\services\api.ts |
| fonts.css | Stylesheet | src\styles\fonts.css |
| index.css | Stylesheet | src\styles\index.css |
| tailwind.css | Stylesheet | src\styles\tailwind.css |
| theme.css | Stylesheet | src\styles\theme.css |
| validations.ts | TypeScript | src\utils\validations.ts |
| vite.config.ts | TypeScript | vite.config.ts |

---

## 📚 Document Information

| Property | Value |
|----------|-------|
| Generated | 1/16/2026, 12:57:32 PM |
| Source | Figma Design Code Files |
| Repository | astharungta/Figma-Design |
| Total User Stories | 20 |
| Files Analyzed | 96 |

---

**End of User Story Catalogue**

*This document was automatically generated from Figma code files based on user journey analysis.*
