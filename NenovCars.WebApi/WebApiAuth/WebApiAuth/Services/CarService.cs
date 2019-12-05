using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiAuth.Data;
using WebApiAuth.Data.Models;
using WebApiAuth.Data.Models.Enums;
using WebApiAuth.Data.Models.User;
using WebApiAuth.Services.Contracts;
using WebApiAuth.ViewModels.Car;
using WebApiAuth.ViewModels.User;

namespace WebApiAuth.Services
{
    public class CarService : ICarService
    {
        private readonly WebApiAuthDbContext context;
        private readonly IHttpContextAccessor accessor;

        public CarService(WebApiAuthDbContext context, IHttpContextAccessor accessor)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (accessor == null)
            {
                throw new ArgumentNullException(nameof(accessor));
            }

            this.context = context;
            this.accessor = accessor;
        }

        public void CreateCar(AddCarViewModel model, string userId)
        {
            var user = this.context.ApplicationUsers.FirstOrDefault(x => x.Id == userId);

            Enum.TryParse(model.Fuel, out Fuel fuel);
            Enum.TryParse(model.Fuel, out Transmission transmission);
            Enum.TryParse(model.Fuel, out VehicleType vehicleType);

            var car = new Car()
            {
                Brand = model.CarBrand,
                Model = model.CarModel,
                ImageUrl = model.ImageUrl,
                Kilometre = model.Kilometre,
                Transmission = transmission,
                Color = model.Color,
                VehicleType = vehicleType,
                AdTitle = model.AdTitle,
                CreatedOn = DateTime.UtcNow,
                Description = model.Description,
                Price = model.Price,
                YearOfProduction = model.YearOfProduction,
                Fuel = fuel,
                Hp = model.Hp,
                ApplicationUserId = user.Id,
                CarOwner = user
            };

            this.context.Cars.Add(car);
            this.context.SaveChanges();
        }

        public int GetAdsCount()
        {
            return this.context.Cars.Count();
        }

        public async Task<ICollection<CarViewModel>> GetAll(int toSkip, int pageSize)
        {
            var listOfAllCars = await this.context.Cars.Select(x => new CarViewModel
            {
                Id = x.Id,
                ImageUrl = x.ImageUrl,
                Brand = x.Brand,
                Fuel = x.Fuel.ToString(),
                Hp = x.Hp,
                Model = x.Model,
                AdTitle = x.AdTitle,
                Color = x.Color,
                Description = x.Description,
                Kilometre = x.Kilometre,
                Price = x.Price,
                Transmission = x.Transmission.ToString(),
                VehicleType = x.VehicleType.ToString(),
                YearOfProduction = x.YearOfProduction
            }).Skip(toSkip)
                .Take(pageSize)
                .ToListAsync();

            return listOfAllCars;
        }

        public IEnumerable<GetFavoriteCarsViewModel> GetFavoriteCars()
        {
            var currentUser = this.accessor.HttpContext.User.Identity.Name;
            var currentUserObject = this.context.Users.FirstOrDefault(x => x.UserName == currentUser);

            var favCarsForCurrentUser = this.context.Cars
                .Include(x => x.UserFavoriteCars)
                .ThenInclude(x => x.Car)
                .Where(x => x.UserFavoriteCars.Any(y => y.ApplicationUserId == currentUserObject.Id))
                .ToList();

            var favoriteCarsList = new List<GetFavoriteCarsViewModel>();

            foreach (var car in favCarsForCurrentUser)
            {
                var favoriteCars = new GetFavoriteCarsViewModel();

                favoriteCars.Id = car.Id;
                favoriteCars.ImageUrl = car.ImageUrl;
                favoriteCars.Brand = car.Brand;
                favoriteCars.Fuel = car.Fuel;
                favoriteCars.Hp = car.Hp;
                favoriteCars.Model = car.Model;

                favoriteCarsList.Add(favoriteCars);
            }

            return favoriteCarsList;
        }

        public bool TryAddToFavorite(string id)
        {
            var currentCar = this.context.Cars.Find(id);
            var currentUser = this.accessor.HttpContext.User.Identity.Name;
            var currentUserObject = this.context.ApplicationUsers.Include(x => x.FavoriteCars).FirstOrDefault(x => x.UserName == currentUser);

            var isAppliedYet = currentUserObject.FavoriteCars.FirstOrDefault(x => x.CarId == currentCar.Id);

            if (isAppliedYet != null)
            {
                return false;
            }

            var usersJobAdd = new UserFavoriteCar()
            {
                Car = currentCar,
                CarId = currentCar.Id,
                ApplicationUser = currentUserObject,
                ApplicationUserId = currentUserObject.Id
            };

            currentUserObject.FavoriteCars.Add(usersJobAdd);
            currentCar.UserFavoriteCars.Add(usersJobAdd);

            this.context.SaveChanges();
            return true;
        }
    }
}