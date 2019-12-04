using System.Collections.Generic;

namespace WebApiAuth.ViewModels.User
{
    public class ListOfFavoriteCars
    {
        public IEnumerable<GetFavoriteCarsViewModel> FavoriteCarAds { get; set; }

        public double TotalPagesCount { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public bool IsAny { get; set; }
    }
}