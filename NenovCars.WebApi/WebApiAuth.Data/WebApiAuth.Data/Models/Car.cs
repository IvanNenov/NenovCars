namespace WebApiAuth.Data.Models
{
    using System.Collections.Generic;
    using WebApiAuth.Data.Models.User;

    public class Car
    {
        public Car()
        {
            this.UserFavoriteCars = new HashSet<UserFavoriteCar>();
        }

        public string Id { get; set; }
        public string Brand { get; set; }
        public string ImageUrl { get; set; }
        public string Model { get; set; }
        public string Hp { get; set; }
        public string Fuel { get; set; }

        public string ApplicationUserId { get; set; }
        public ApplicationUser CarOwner { get; set; }

        public ICollection<UserFavoriteCar> UserFavoriteCars { get; set; }
    }
}