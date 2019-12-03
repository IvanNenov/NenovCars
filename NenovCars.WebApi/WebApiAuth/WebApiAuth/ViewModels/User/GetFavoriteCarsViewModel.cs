using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiAuth.ViewModels.User
{
    public class GetFavoriteCarsViewModel
    {
        public string Id { get; set; }
        public string Brand { get; set; }

        public string Model { get; set; }

        public string Hp { get; set; }

        public string Fuel { get; set; }
    }
}
