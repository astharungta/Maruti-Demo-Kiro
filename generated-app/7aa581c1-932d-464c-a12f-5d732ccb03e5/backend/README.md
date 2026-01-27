# Extended Warranty Management API

## Overview
This is the .NET 8 backend API for the Extended Warranty Management System.

## Running the API

```bash
cd backend
dotnet restore
dotnet run
```

The API will be available at: http://localhost:5050

## API Endpoints

### Warranties
- GET /api/warranty - Get all warranties
- GET /api/warranty/{id} - Get warranty by ID
- GET /api/warranty/stats - Get warranty statistics
- POST /api/warranty - Create new warranty
- PUT /api/warranty/{id} - Update warranty
- DELETE /api/warranty/{id} - Delete warranty

### Vehicles
- GET /api/vehicle - Get all vehicles
- GET /api/vehicle/{id} - Get vehicle by ID
- POST /api/vehicle - Create new vehicle
- PUT /api/vehicle/{id} - Update vehicle
- DELETE /api/vehicle/{id} - Delete vehicle

### Customers
- GET /api/customer - Get all customers
- GET /api/customer/{id} - Get customer by ID
- POST /api/customer - Create new customer
- PUT /api/customer/{id} - Update customer
- DELETE /api/customer/{id} - Delete customer

### Claims
- GET /api/claim - Get all claims
- GET /api/claim/{id} - Get claim by ID
- GET /api/claim/stats - Get claim statistics
- POST /api/claim - Create new claim
- PUT /api/claim/{id} - Update claim
- DELETE /api/claim/{id} - Delete claim

### Dealers
- GET /api/dealer - Get all dealers
- GET /api/dealer/{id} - Get dealer by ID
- POST /api/dealer - Create new dealer

## Swagger UI
Access Swagger documentation at: http://localhost:5050/swagger
