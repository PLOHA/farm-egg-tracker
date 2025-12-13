using FarmEggTracker.API.Data;
using FarmEggTracker.API.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace FarmEggTracker.API.Services
{
    public class ReportService : IReportService
    {
        private readonly AppDbContext _context;

        public ReportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DailyReportDto> GetDailyReportAsync(DateOnly date)
        {
            var records = await _context.EggRecords
                .Include(r => r.AnimalType)
                .Where(r => r.Date == date)
                .ToListAsync();

            var dto = new DailyReportDto
            {
                Date = date,
                TotalEggs = records.Sum(r => r.Count),
                Breakdown = records.Select(r => new AnimalEggCountDto
                {
                    AnimalType = r.AnimalType?.Name ?? "Unknown",
                    Count = r.Count
                }).ToList()
            };

            return dto;
        }

        public async Task<MonthlyReportDto> GetMonthlyReportAsync(int year, int month)
        {
            var records = await _context.EggRecords
                .Include(r => r.AnimalType)
                .Where(r => r.Date.Year == year && r.Date.Month == month)
                .OrderBy(r => r.Date)
                .ToListAsync();

            // Group by Date for the chart/table
            var dailyGroups = records.GroupBy(r => r.Date);

            var dailySummaries = dailyGroups.Select(g => new DailySummaryDto
            {
                Date = g.Key,
                Total = g.Sum(r => r.Count),
                ChickenCount = g.Where(r => r.AnimalType?.Name == "Chicken").Sum(r => r.Count),
                DuckCount = g.Where(r => r.AnimalType?.Name == "Duck").Sum(r => r.Count)
            }).ToList();

            return new MonthlyReportDto
            {
                Year = year,
                Month = month,
                TotalEggs = records.Sum(r => r.Count),
                DailyBreakdown = dailySummaries
            };
        }

        public async Task<YearlyReportDto> GetYearlyReportAsync(int year)
        {
            var records = await _context.EggRecords
                .Include(r => r.AnimalType)
                .Where(r => r.Date.Year == year)
                .ToListAsync();

            var monthlyGroups = records.GroupBy(r => r.Date.Month);

            var monthlySummaries = monthlyGroups.Select(g => new MonthlySummaryDto
            {
                Month = g.Key,
                MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                Total = g.Sum(r => r.Count),
                ChickenCount = g.Where(r => r.AnimalType?.Name == "Chicken").Sum(r => r.Count),
                DuckCount = g.Where(r => r.AnimalType?.Name == "Duck").Sum(r => r.Count)
            })
            .OrderBy(m => m.Month)
            .ToList();

            return new YearlyReportDto
            {
                Year = year,
                TotalEggs = records.Sum(r => r.Count),
                MonthlyBreakdown = monthlySummaries
            };
        }
    }
}
