using FarmEggTracker.API.Models;

namespace FarmEggTracker.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            // context.Database.EnsureCreated(); // Removed to use Migrations instead

            // Look for any animals.
            if (context.AnimalTypes.Any())
            {
                return;   // DB has been seeded
            }

            var animals = new AnimalType[]
            {
                new AnimalType { Name = "Chicken", TotalCount = 10 },
                new AnimalType { Name = "Duck", TotalCount = 5 }
            };

            context.AnimalTypes.AddRange(animals);
            context.SaveChanges();

            // Seed 3 years of egg records
            // 3 years back from today
            var today = DateOnly.FromDateTime(DateTime.Now);
            var startDate = today.AddYears(-3);
            
            var records = new List<EggRecord>();
            var random = new Random();

            // Loop through each day from startDate to today
            for (var date = startDate; date <= today; date = date.AddDays(1))
            {
                // Logic for Chicken (10 chickens)
                // Assume 60-90% laying rate per day -> 6 to 9 eggs
                records.Add(new EggRecord
                {
                    Date = date,
                    AnimalTypeId = animals[0].Id, // Chicken
                    Count = random.Next(6, 10) // Random 6 to 9
                });

                // Logic for Duck (5 ducks)
                // Assume 50-80% laying rate per day -> 2 to 4 eggs
                records.Add(new EggRecord
                {
                    Date = date,
                    AnimalTypeId = animals[1].Id, // Duck
                    Count = random.Next(2, 5) // Random 2 to 4
                });
            }

            context.EggRecords.AddRange(records);
            context.SaveChanges();
        }
    }
}
