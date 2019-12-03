using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiAuth.Data;
using WebApiAuth.Data.Models;
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
        public void CreateCar(AddCarViewModel model)
        {
            //var currentUserName = this.accessor.HttpContext.User.Identity.Name;
            //var currentUserObject = this.context.Users.FirstOrDefault(x => x.UserName == currentUserName);
            var currentUserName = "IvanNenov";
            var currentUserObject = "f44eccc9-12c7-4426-b06c-c14a1f16fa8a";
            var user = this.context.Users.FirstOrDefault(x => x.Id == currentUserObject);
            var car = new Car()
            {
                Brand = model.CarBrand,
                Model = model.CarModel,
                Fuel = model.Fuel,
                Hp = model.Hp,
                ApplicationUserId = currentUserObject,
                CarOwner = (ApplicationUser)user
            };

            this.context.Cars.Add(car);
            this.context.SaveChanges();
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
