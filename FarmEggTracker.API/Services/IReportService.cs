using FarmEggTracker.API.DTOs;

namespace FarmEggTracker.API.Services
{
    public interface IReportService
    {
        Task<DailyReportDto> GetDailyReportAsync(DateOnly date);
        Task<MonthlyReportDto> GetMonthlyReportAsync(int year, int month);
        Task<YearlyReportDto> GetYearlyReportAsync(int year);
    }
}
