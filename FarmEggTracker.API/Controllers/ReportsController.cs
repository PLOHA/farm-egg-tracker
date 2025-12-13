using FarmEggTracker.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FarmEggTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("daily")]
        public async Task<IActionResult> GetDailyReport([FromQuery] string date)
        {
            if (!DateOnly.TryParse(date, out var parsedDate))
            {
                // If no date provided, default to today
                parsedDate = DateOnly.FromDateTime(DateTime.Now);
            }
            
            var result = await _reportService.GetDailyReportAsync(parsedDate);
            return Ok(result);
        }

        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthlyReport([FromQuery] int year, [FromQuery] int month)
        {
            if (year == 0) year = DateTime.Now.Year;
            if (month == 0) month = DateTime.Now.Month;

            var result = await _reportService.GetMonthlyReportAsync(year, month);
            return Ok(result);
        }

        [HttpGet("yearly")]
        public async Task<IActionResult> GetYearlyReport([FromQuery] int year)
        {
            if (year == 0) year = DateTime.Now.Year;

            var result = await _reportService.GetYearlyReportAsync(year);
            return Ok(result);
        }
    }
}
