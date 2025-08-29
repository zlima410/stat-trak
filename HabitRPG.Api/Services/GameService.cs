using Microsoft.EntityFrameworkCore;
using HabitRPG.Api.Data;
using HabitRPG.Api.Models;

namespace HabitRPG.Api.Services
{
    public class GameService : IGameService
    {
        private readonly ApplicationDbContext _db;
        private const int XP_PER_LEVEL = 100;

        public GameService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<GameReward> CompleteHabitAsync(int userId, int habitId)
        {
            var habit = await _db.Habits
                .Include(h => h.User)
                .FirstOrDefaultAsync(h => h.Id == habitId && h.UserId == userId);

            if (habit == null)
                return new GameReward
                {
                    Success = false,
                    Message = "Habit not found"
                };

            if (!await CanCompleteHabitTodayAsync(habitId))
                return new GameReward
                {
                    Success = false,
                    Message = "Habit already completed tpday"
                };

            var xpGained = CalculateXpForHabit(habit.Difficulty);
            var oldLevel = habit.User.Level;
            var oldTotalXp = habit.User.TotalXP;

            habit.User.XP += xpGained;
            habit.User.TotalXP += xpGained;

            var newLevel = CalculateLevelFromTotalXp(habit.User.TotalXP);
            var leveledUp = newLevel > oldLevel;
            habit.User.Level = newLevel;

            var today = DateTime.UtcNow.Date;
            var yesterday = today.AddDays(-1);

            if (habit.LastCompletedAt?.Date == yesterday)
                habit.CurrentStreak++;
            else if (habit.LastCompletedAt?.Date != today)
                habit.CurrentStreak = 1;

            if (habit.CurrentStreak > habit.BestStreak)
                habit.BestStreak = habit.CurrentStreak;

            habit.LastCompletedAt = DateTime.UtcNow;

            var completionLog = new CompletionLog
            {
                HabitId = habitId,
                CompletedAt = DateTime.UtcNow
            };

            _db.CompletionLogs.Add(completionLog);
            await _db.SaveChangesAsync();

            return new GameReward
            {
                Success = true,
                Message = leveledUp ? $"Great job! You gained {xpGained} XP and leveled up!" : $"Well done! You gained {xpGained} XP!",
                XpGained = xpGained,
                LeveledUp = leveledUp,
                NewLevel = habit.User.Level,
                NewXp = habit.User.XP,
                NewTotalXp = habit.User.TotalXP,
                NewStreak = habit.CurrentStreak,
                UpdatedHabit = new HabitDto
                {
                    Id = habit.Id,
                    Title = habit.Title,
                    Description = habit.Description,
                    Frequency = habit.Frequency,
                    Difficulty = habit.Difficulty,
                    CurrentStreak = habit.CurrentStreak,
                    BestStreak = habit.BestStreak,
                    LastCompletedAt = habit.LastCompletedAt,
                    IsActive = habit.IsActive,
                    CanCompleteToday = false,
                    CreatedAt = habit.CreatedAt
                }
            };
        }

        public int CalculateXpForHabit(HabitDifficulty difficulty)
        {
            return difficulty switch
            {
                HabitDifficulty.Easy => 5,
                HabitDifficulty.Medium => 10,
                HabitDifficulty.Hard => 20,
                _ => 10
            };
        }

        public int CalculateLevelFromTotalXp(int totalXp)
        {
            return (totalXp / XP_PER_LEVEL) + 1;
        }

        public int GetXpRequiredForLevel(int level)
        {
            return level * XP_PER_LEVEL;
        }

        public async Task<bool> CanCompleteHabitTodayAsync(int habitId)
        {
            var today = DateTime.UtcNow.Date;
            var todayStart = today;
            var todayEnd = today.AddDays(1).AddTicks(-1);

            var completedToday = await _db.CompletionLogs
                .AnyAsync(cl => cl.HabitId == habitId &&
                                cl.CompletedAt >= todayStart &&
                                cl.CompletedAt <= todayEnd);

            return !completedToday;
        }
    }
}