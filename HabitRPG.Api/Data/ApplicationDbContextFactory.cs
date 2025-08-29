using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using DotNetEnv;

namespace HabitRPG.Api.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            Env.Load();
            
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
            
            Console.WriteLine($"Design-time environment: {environment}");
            
            string connectionString;
            if (environment == "Production")
            {
                connectionString = Environment.GetEnvironmentVariable("PROD_DATABASE_CONNECTION");
                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("PROD_DATABASE_CONNECTION environment variable is required for production migrations");
                }
                
                Console.WriteLine("Using PostgreSQL (Neon Prod) for migrations");
            }
            else
            {
                connectionString = Environment.GetEnvironmentVariable("DEV_DATABASE_CONNECTION");
                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("DEV_DATABASE_CONNECTION environment variable is required for development migrations");
                }
                
                Console.WriteLine("Using PostgreSQL (Neon Dev) for migrations");
            }
            
            optionsBuilder.UseNpgsql(connectionString, npgsqlOptions =>
            {
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 3,
                    maxRetryDelay: TimeSpan.FromSeconds(5),
                    errorCodesToAdd: null);
                npgsqlOptions.CommandTimeout(30);
            });
            
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}