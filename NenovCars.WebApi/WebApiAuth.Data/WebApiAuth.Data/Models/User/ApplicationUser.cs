using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace WebApiAuth.Data.Models.User
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.Cars = new HashSet<Car>();
            this.FavoriteCars = new HashSet<UserFavoriteCar>();
        }
        public string FullName { get; set; }

        public ICollection<Car> Cars { get; set; }

        public ICollection<UserFavoriteCar> FavoriteCars { get; set; }
    }
}