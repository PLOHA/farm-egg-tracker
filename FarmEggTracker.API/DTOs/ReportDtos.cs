namespace FarmEggTracker.API.DTOs
{
    public class DailyReportDto
    {
        public DateOnly Date { get; set; }
        public int TotalEggs { get; set; }
        public List<AnimalEggCountDto> Breakdown { get; set; } = new();
    }

    public class AnimalEggCountDto
    {
        public string AnimalType { get; set; } = string.Empty;
        public int Count { get; set; }
    }

    public class MonthlyReportDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int TotalEggs { get; set; }
        public List<DailySummaryDto> DailyBreakdown { get; set; } = new();
    }

    public class DailySummaryDto
    {
        public DateOnly Date { get; set; }
        public int Total { get; set; }
        // Can add specific animal counts here if needed for chart
        public int ChickenCount { get; set; }
        public int DuckCount { get; set; }
    }

    public class YearlyReportDto
    {
        public int Year { get; set; }
        public int TotalEggs { get; set; }
        public List<MonthlySummaryDto> MonthlyBreakdown { get; set; } = new();
    }

    public class MonthlySummaryDto
    {
        public int Month { get; set; }
        public string MonthName { get; set; } = string.Empty;
        public int Total { get; set; }
        public int ChickenCount { get; set; }
        public int DuckCount { get; set; }
    }
}
