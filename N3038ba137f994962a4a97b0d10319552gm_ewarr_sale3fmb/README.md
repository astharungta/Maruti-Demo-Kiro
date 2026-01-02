# N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb

## Overview
This is a modernized .NET + Blazor WebAssembly application converted from Oracle Forms.

## Architecture
- **Backend**: ASP.NET Core 8.0 Web API
- **Frontend**: Blazor WebAssembly
- **Database**: SQL Server
- **ORM**: Entity Framework Core

## Project Structure
```
N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb/
├── N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb.API/          # Backend Web API
│   ├── Controllers/                      # API Controllers
│   ├── Models/                           # Data Models
│   ├── Services/                         # Business Logic
│   └── Data/                             # Database Context & Repositories
├── N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb.Client/       # Blazor WebAssembly Frontend
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
   Edit `N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb.API/appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmbDB;Trusted_Connection=True;TrustServerCertificate=True;"
   }
   ```

2. **Run Database Migrations**
   ```bash
   cd N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb.API
   dotnet ef database update
   ```

3. **Run Backend API**
   ```bash
   cd N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb.API
   dotnet run
   ```
   API will be available at: https://localhost:7001

4. **Run Blazor Client**
   ```bash
   cd N3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb.Client
   dotnet run
   ```
   Client will be available at: https://localhost:7002

### Running with Docker

```bash
docker-compose up
```

## Features
- Index: Main

## API Endpoints

### DataController
- `GET /api/data/` - GetAll


## Database Schema
- General (3 columns)
- RtTestDrive (3 columns)
- Parameter (3 columns)

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
docker build -t n3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb:latest .
docker push your-registry/n3038ba137f994962a4a97b0d10319552gm_ewarr_sale3fmb:latest
```

## License
Proprietary

## Support
For issues and questions, please contact the development team.
