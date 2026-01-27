public static class DbInitializer
{
    public static void Initialize(AppDbContext context)
    {
        // Seed Customers
        if (!context.Customers.Any())
        {
            context.Customers.AddRange(
                new Customer { Id = 1, Name = "John Smith", Email = "john.smith@email.com", Phone = "555-0101", Address = "123 Main St" },
                new Customer { Id = 2, Name = "Jane Doe", Email = "jane.doe@email.com", Phone = "555-0102", Address = "456 Oak Ave" },
                new Customer { Id = 3, Name = "Robert Johnson", Email = "robert.j@email.com", Phone = "555-0103", Address = "789 Pine Rd" }
            );
        }

        // Seed Dealers
        if (!context.Dealers.Any())
        {
            context.Dealers.AddRange(
                new Dealer { Id = 1, Name = "AutoMax Dealership", Code = "DLR001", Location = "New York", ContactEmail = "sales@automax.com" },
                new Dealer { Id = 2, Name = "Premier Motors", Code = "DLR002", Location = "Los Angeles", ContactEmail = "info@premiermotors.com" }
            );
        }

        // Seed Vehicles
        if (!context.Vehicles.Any())
        {
            context.Vehicles.AddRange(
                new Vehicle { Id = 1, Vin = "1HGBH41JXMN109186", Model = "Accord", Make = "Honda", Year = 2024, Color = "Silver", CustomerId = 1 },
                new Vehicle { Id = 2, Vin = "2T1BURHE5JC123456", Model = "Camry", Make = "Toyota", Year = 2023, Color = "Blue", CustomerId = 2 },
                new Vehicle { Id = 3, Vin = "5YJSA1E26MF123789", Model = "Model 3", Make = "Tesla", Year = 2024, Color = "White", CustomerId = 3 }
            );
        }

        // Seed Warranties
        if (!context.Warranties.Any())
        {
            context.Warranties.AddRange(
                new Warranty { Id = 1, PolicyNumber = "WRN-2024-001", VehicleVin = "1HGBH41JXMN109186", StartDate = DateTime.Now.AddMonths(-6), EndDate = DateTime.Now.AddYears(2), Status = "Active", Premium = 1500.00m, CustomerId = 1, DealerId = 1, CoverageType = "Comprehensive" },
                new Warranty { Id = 2, PolicyNumber = "WRN-2024-002", VehicleVin = "2T1BURHE5JC123456", StartDate = DateTime.Now.AddMonths(-3), EndDate = DateTime.Now.AddYears(3), Status = "Active", Premium = 2000.00m, CustomerId = 2, DealerId = 1, CoverageType = "Extended" },
                new Warranty { Id = 3, PolicyNumber = "WRN-2024-003", VehicleVin = "5YJSA1E26MF123789", StartDate = DateTime.Now.AddYears(-1), EndDate = DateTime.Now.AddMonths(6), Status = "Expiring Soon", Premium = 1800.00m, CustomerId = 3, DealerId = 2, CoverageType = "Basic" }
            );
        }

        // Seed Claims
        if (!context.Claims.Any())
        {
            context.Claims.AddRange(
                new Claim { Id = 1, ClaimNumber = "CLM-2024-001", WarrantyId = 1, Description = "Engine repair", Amount = 500.00m, Status = "Approved", FiledDate = DateTime.Now.AddDays(-30), ResolvedDate = DateTime.Now.AddDays(-15) },
                new Claim { Id = 2, ClaimNumber = "CLM-2024-002", WarrantyId = 2, Description = "Transmission issue", Amount = 1200.00m, Status = "Pending", FiledDate = DateTime.Now.AddDays(-5), ResolvedDate = null }
            );
        }

        context.SaveChanges();
    }
}
