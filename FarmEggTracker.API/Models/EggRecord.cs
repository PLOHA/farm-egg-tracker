using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FarmEggTracker.API.Models
{
    public class EggRecord
    {
        public int Id { get; set; }

        public DateOnly Date { get; set; }

        public int AnimalTypeId { get; set; }

        [ForeignKey("AnimalTypeId")]
        public AnimalType? AnimalType { get; set; }

        public int Count { get; set; }
    }
}
