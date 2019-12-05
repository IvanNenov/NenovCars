using WebApiAuth.Data.Models.Enums;

namespace WebApiAuth.ViewModels.Car
{
    public class CarViewModel
    {
        public string Id { get; set; }
        public string Brand { get; set; }

        public string ImageUrl { get; set; }

        public string Model { get; set; }

        public string Hp { get; set; }

        public string Fuel { get; set; }

        public string AdTitle { get; set; }

        public string YearOfProduction { get; set; }

        public string Color { get; set; }

        public string Transmission { get; set; }

        public string VehicleType { get; set; }

        public double Price { get; set; }

        public int Kilometre { get; set; }

        public string Description { get; set; }
    }
}