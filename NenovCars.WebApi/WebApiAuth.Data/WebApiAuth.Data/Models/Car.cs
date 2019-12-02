using System;
using System.Collections.Generic;
using System.Text;
using WebApiAuth.Data.Models.User;

namespace WebApiAuth.Data.Models
{
    public class Car
    {
        public Car()
        {
            this.UserFavoriteCars = new HashSet<UserFavoriteCar>();
        }
        public string Id { get; set; }
        public string Brand { get; set; }

        public string Model { get; set; }

        public string Hp { get; set; }

        public string Fuel { get; set; }

        public string ApplicationUserId { get; set; }
        public ApplicationUser CarOwner { get; set; }

        public ICollection<UserFavoriteCar> UserFavoriteCars { get; set; }
    }
}
