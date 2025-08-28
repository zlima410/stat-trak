namespace HabitRPG.Api.Models
{
    public class CompletionLog
    {
        public int Id { get; set; }
        public int HabitId { get; set; }
        public DateTime CompletedAt { get; set; } = DateTime.UtcNow;

        public Habit Habit { get; set; }
    }
}