using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiAuth.Data.Models.Enums;

namespace WebApiAuth.ViewModels.Car
{
    public class AddCarViewModel
    {
        public string CarBrand { get; set; }
        public string ImageUrl { get; set; }
        public string CarModel { get; set; }
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
