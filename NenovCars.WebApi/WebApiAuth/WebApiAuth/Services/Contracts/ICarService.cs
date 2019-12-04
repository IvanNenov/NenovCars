using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiAuth.ViewModels.Car;
using WebApiAuth.ViewModels.User;

namespace WebApiAuth.Services.Contracts
{
    public interface ICarService
    {
        void CreateCar(AddCarViewModel model);

        bool TryAddToFavorite(string id);

        IEnumerable<GetFavoriteCarsViewModel> GetFavoriteCars();

        IEnumerable<CarViewModel> GetAll();
    }
}
