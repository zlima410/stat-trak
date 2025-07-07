using System.ComponentModel.DataAnnotations;

namespace StatTrak.Models;

public class Habit
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Color { get; set; } = "4CAF50";
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    public List<HabitEntry> Entries { get; set; } = new List<HabitEntry>();

    public int GetStreakCount()
    {
        var sortedEntries = Entries.OrderByDescending(e => e.Date).ToList();
        int streak = 0;
        var currentDate = DateTime.Today;

        foreach (var entry in sortedEntries)
        {
            if (entry.Date.Date == currentDate.Date && entry.IsCompleted)
            {
                streak++;
                currentDate = currentDate.AddDays(-1);
            }
            else if (entry.Date.Date < currentDate.Date)
            {
                break;
            }
        }

        return streak;
    }
}