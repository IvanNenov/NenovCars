using System.Collections.Generic;

namespace WebApiAuth.ViewModels.Car
{
    public class ListOfAllCarsViewModel
    {
        public ICollection<CarViewModel> AllCars { get; set; }

        public string TotalPagesCount { get; set; }

        public string CurrentPage { get; set; }

        public string PageSize { get; set; }
    }
}