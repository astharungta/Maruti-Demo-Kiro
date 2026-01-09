# ExtendedWarrantySale

## Overview
This is a modernized .NET + Blazor WebAssembly application converted from Oracle Forms.

## Architecture
- **Backend**: ASP.NET Core 8.0 Web API
- **Frontend**: Blazor WebAssembly
- **Database**: SQL Server
- **ORM**: Entity Framework Core

## Project Structure
```
ExtendedWarrantySale/
├── ExtendedWarrantySale.API/          # Backend Web API
│   ├── Controllers/                      # API Controllers
│   ├── Models/                           # Data Models
│   ├── Services/                         # Business Logic
│   └── Data/                             # Database Context & Repositories
├── ExtendedWarrantySale.Client/       # Blazor WebAssembly Frontend
│   ├── Pages/                            # Blazor Pages
│   ├── Shared/                           # Shared Components
│   └── wwwroot/                          # Static Files
└── docker-compose.yml                    # Docker Compose Configuration
```

## Getting Started

### Prerequisites
- .NET 8.0 SDK
- SQL Server (or Docker)
- Visual Studio 2022 or VS Code

### Running Locally

1. **Update Connection String**
   Edit `ExtendedWarrantySale.API/appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=ExtendedWarrantySaleDB;Trusted_Connection=True;TrustServerCertificate=True;"
   }
   ```

2. **Run Database Migrations**
   ```bash
   cd ExtendedWarrantySale.API
   dotnet ef database update
   ```

3. **Run Backend API**
   ```bash
   cd ExtendedWarrantySale.API
   dotnet run
   ```
   API will be available at: https://localhost:7001

4. **Run Blazor Client**
   ```bash
   cd ExtendedWarrantySale.Client
   dotnet run
   ```
   Client will be available at: https://localhost:7002

### Running with Docker

```bash
docker-compose up
```

## Features
- ExtendedWarrantyEntryForm: Create New Extended Warranty
- DocumentUpload: Create New Extended Warranty
- AddOnSelection: Create New Extended Warranty

## API Endpoints

### ExtendedWarrantySalesController
- `GET /api/extended-warranty-sales/` - GetExtendedWarrantySales
- `GET /api/extended-warranty-sales/{id}` - GetExtendedWarrantySale
- `POST /api/extended-warranty-sales/` - CreateExtendedWarrantySale
- `PUT /api/extended-warranty-sales/{id}` - UpdateExtendedWarrantySale
- `DELETE /api/extended-warranty-sales/{id}` - DeleteExtendedWarrantySale


### WarrantyDocumentsController
- `GET /api/warranty-documents/` - GetWarrantyDocuments
- `GET /api/warranty-documents/{id}` - GetWarrantyDocument
- `POST /api/warranty-documents/` - CreateWarrantyDocument
- `PUT /api/warranty-documents/{id}` - UpdateWarrantyDocument
- `DELETE /api/warranty-documents/{id}` - DeleteWarrantyDocument


### WarrantyAddOnsController
- `GET /api/warranty-addons/` - GetWarrantyAddOns
- `GET /api/warranty-addons/{id}` - GetWarrantyAddOn
- `POST /api/warranty-addons/` - CreateWarrantyAddOn
- `PUT /api/warranty-addons/{id}` - UpdateWarrantyAddOn
- `DELETE /api/warranty-addons/{id}` - DeleteWarrantyAddOn


## Database Schema
- CB_VT_EWARR_SALE (2 columns)
- B_VT_EWARR_SALE (5 columns)
- B_EW_DOCS (1 columns)
- B_ADDON (0 columns)

## Development

### Adding New Features
1. Add model in `Models/`
2. Update `ApplicationDbContext`
3. Create migration: `dotnet ef migrations add FeatureName`
4. Update database: `dotnet ef database update`
5. Add service in `Services/`
6. Add controller in `Controllers/`
7. Add Blazor page in `Client/Pages/`

### Testing
```bash
dotnet test
```

## Deployment

### Azure
Use the included GitHub Actions workflow for CI/CD to Azure.

### Docker
```bash
docker build -t extendedwarrantysale:latest .
docker push your-registry/extendedwarrantysale:latest
```

## License
Proprietary

## Support
For issues and questions, please contact the development team.
