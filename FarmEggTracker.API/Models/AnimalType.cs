using System.ComponentModel.DataAnnotations;

namespace FarmEggTracker.API.Models
{
    public class AnimalType
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public int TotalCount { get; set; }
    }
}
