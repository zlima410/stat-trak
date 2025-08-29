using HabitRPG.Api.Models;

namespace HabitRPG.Api.Services
{
    public interface IGameService
    {
        Task<GameReward> CompleteHabitAsync(int userId, int habitId);
        int CalculateXpForHabit(HabitDifficulty difficulty);
        int CalculateLevelFromTotalXp(int totalXp);
        int GetXpRequiredForLevel(int level);
        Task<bool> CanCompleteHabitTodayAsync(int habitId);
    }

    public class GameReward
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public int XpGained { get; set; }
        public bool LeveledUp { get; set; }
        public int NewLevel { get; set; }
        public int NewXp { get; set; }
        public int NewTotalXp { get; set; }
        public int NewStreak { get; set; }
        public HabitDto? UpdatedHabit { get; set; }
    }

    public class HabitDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public HabitFrequency Frequency { get; set; }
        public HabitDifficulty Difficulty { get; set; }
        public int CurrentStreak { get; set; }
        public int BestStreak { get; set; }
        public DateTime? LastCompletedAt { get; set; }
        public bool IsActive { get; set; }
        public bool CanCompleteToday { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}