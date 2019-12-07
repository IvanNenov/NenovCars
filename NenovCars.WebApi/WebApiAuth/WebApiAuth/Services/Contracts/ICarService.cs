namespace WebApiAuth.Services.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using WebApiAuth.Data.Models.User;
    using WebApiAuth.ViewModels.Car;

    public interface ICarService
    {
        Task<bool> CreateCar(AddCarViewModel model, ApplicationUser user);

        Task<bool> AddToFavorite(string id, ApplicationUser user);

        Task<bool> RemoveFromFavorite(string id, ApplicationUser user);

        int GetFavroiteAdsCount(ApplicationUser user);

        Task<ICollection<CarViewModel>> GetFavoriteCars(int toSkip, int pageSize, ApplicationUser user);

        int GetAdsCount();

        Task<ICollection<CarViewModel>> GetAll(int toSkip, int pageSize);
    }
}