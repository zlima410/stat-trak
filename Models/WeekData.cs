namespace StatTrak.Models;

public class WeekData
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<DayData> Days { get; set; } = new List<DayData>();
    public int CompletedDays => Days.Count(d => d.IsCompleted);
    public string WeekLabel => $"{StartDate:MMM d} - {EndDate:MMM d}";
}

public class DayData
{
    public DateTime Date { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsCurrentMonth { get; set; }
    public string DayLabel => Date.Day.ToString();
    public string IntensityLevel => IsCompleted ? "high" : "none";
}