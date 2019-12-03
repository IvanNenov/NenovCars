using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiAuth.ViewModels.User
{
    public class ListOfFavoriteCars
    {
        public IEnumerable<GetFavoriteCarsViewModel> FavoriteJobsAds { get; set; }

        public double TotalPagesCount { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public bool IsAny { get; set; }
    }
}
