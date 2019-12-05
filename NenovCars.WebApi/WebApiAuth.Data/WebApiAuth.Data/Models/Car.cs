namespace WebApiAuth.Data.Models
{
    using System;
    using System.Collections.Generic;
    using WebApiAuth.Data.Models.Enums;
    using WebApiAuth.Data.Models.User;

    public class Car
    {
        public Car()
        {
            this.UserFavoriteCars = new HashSet<UserFavoriteCar>();
        }

        public string Id { get; set; }

        public string AdTitle { get; set; }

        public string YearOfProduction { get; set; }

        public string Color { get; set; }

        public Transmission Transmission { get; set; }

        public VehicleType VehicleType { get; set; }

        public double Price { get; set; }

        public int Kilometre { get; set; }

        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }
        public string Brand { get; set; }
        public string ImageUrl { get; set; }
        public string Model { get; set; }
        public string Hp { get; set; }
        public Fuel Fuel { get; set; }

        public string ApplicationUserId { get; set; }
        public ApplicationUser CarOwner { get; set; }

        public ICollection<UserFavoriteCar> UserFavoriteCars { get; set; }
    }
}