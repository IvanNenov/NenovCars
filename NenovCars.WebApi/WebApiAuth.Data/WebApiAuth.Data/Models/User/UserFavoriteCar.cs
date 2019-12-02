using System;
using System.Collections.Generic;
using System.Text;

namespace WebApiAuth.Data.Models.User
{
    public class UserFavoriteCar
    {
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public string CarId { get; set; }
        public Car Car { get; set; }
    }
}
