using Microsoft.EntityFrameworkCore;
using HabitRPG.Api.Models;

namespace HabitRPG.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Habit> Habits { get; set; }
        public DbSet<CompletionLog> CompletionLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User config
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.Username).IsUnique();
            });

            // Habit config
            modelBuilder.Entity<Habit>(entity =>
            {
                entity.HasOne(h => h.User)
                    .WithMany(u => u.Habits)
                    .HasForeignKey(h => h.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // CompletionLog config
            modelBuilder.Entity<CompletionLog>(entity =>
            {
                entity.HasOne(cl => cl.Habit)
                    .WithMany(h => h.CompletionLogs)
                    .HasForeignKey(cl => cl.HabitId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(cl => new { cl.HabitId, cl.CompletedAt })
                    .HasDatabaseName("IX_HabitId_CompletedDate");
            });
        }
    }
}