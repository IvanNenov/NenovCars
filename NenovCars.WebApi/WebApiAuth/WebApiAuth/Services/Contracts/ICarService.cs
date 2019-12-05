namespace WebApiAuth.Services.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using WebApiAuth.ViewModels.Car;
    using WebApiAuth.ViewModels.User;

    public interface ICarService
    {
        void CreateCar(AddCarViewModel model, string userId);

        bool TryAddToFavorite(string id);

        IEnumerable<GetFavoriteCarsViewModel> GetFavoriteCars();

        Task<ICollection<CarViewModel>> GetAll(int toSkip, int pageSize);

        int GetAdsCount();
    }
}