namespace WebApiAuth.Services
{
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

    public class CarService : ICarService
    {
        private readonly WebApiAuthDbContext context;

        public CarService(WebApiAuthDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> CreateCar(AddCarViewModel model, ApplicationUser user)
        {
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

            await this.context.Cars.AddAsync(car);
            var isSuccessful = await this.context.SaveChangesAsync();

            return isSuccessful > 0 ? true : false;
        }

        public int GetAdsCount()
        {
            return this.context.Cars.Count();
        }

        public async Task<ICollection<CarViewModel>> GetAll(int toSkip, int pageSize)
        {
            var listOfAllCars = await this.context.Cars
                .OrderByDescending(x => x.CreatedOn)
                .Skip(toSkip)
                .Take(pageSize)
                .Select(x => new CarViewModel
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
                })
                .ToListAsync();

            return listOfAllCars;
        }

        public int GetFavroiteAdsCount(ApplicationUser user)
        {
            return this.context.UserFavoriteCars
                .Where(x => x.ApplicationUserId == user.Id)
                .Count();
        }

        public async Task<ICollection<CarViewModel>> GetFavoriteCars(int toSkip, int pageSize, ApplicationUser user)
        {
            if (toSkip < 0)
            {
                return null;
            }

            if (pageSize <= 0)
            {
                return null;
            }

            if (user == null)
            {
                return null;
            }

            var favCarsForCurrentUser = await this.context.UserFavoriteCars
                .Where(x => x.ApplicationUserId == user.Id)
                .Skip(toSkip)
                .Take(pageSize)
                .ToListAsync();

            if (favCarsForCurrentUser == null)
            {
                return null;
            }

            var cars = new List<CarViewModel>();
            foreach (var car in favCarsForCurrentUser)
            {
                var favAd = await this.context.Cars
                    .FirstOrDefaultAsync(x => x.Id == car.CarId);

                cars.Add(new CarViewModel
                {
                    Id = favAd.Id,
                    ImageUrl = favAd.ImageUrl,
                    Brand = favAd.Brand,
                    Fuel = favAd.Fuel.ToString(),
                    Hp = favAd.Hp,
                    Model = favAd.Model,
                    AdTitle = favAd.AdTitle,
                    Color = favAd.Color,
                    Description = favAd.Description,
                    Kilometre = favAd.Kilometre,
                    Price = favAd.Price,
                    Transmission = favAd.Transmission.ToString(),
                    VehicleType = favAd.VehicleType.ToString(),
                    YearOfProduction = favAd.YearOfProduction
                });
            }

            if (cars == null)
            {
                return null;
            }

            return cars;
        }

        public async Task<bool> RemoveFromFavorite(string id, ApplicationUser user)
        {
            if (String.IsNullOrWhiteSpace(id))
            {
                return false;
            }

            if (user == null)
            {
                return false;
            }
            var userFavoriteAd = await this.context.UserFavoriteCars
                .Include(x => x.Car)
                .FirstOrDefaultAsync(x => x.CarId == id);

            if (userFavoriteAd == null)
            {
                return false;
            }

            this.context.Remove(userFavoriteAd);
            var isSuccessful = await this.context.SaveChangesAsync();

            if (isSuccessful > 0)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> AddToFavorite(string id, ApplicationUser user)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return false;
            }

            if (user == null)
            {
                return false;
            }

            // Gets the ad that have to add to favorites.
            var currentCar = this.context.Cars
                .FirstOrDefault(x => x.Id == id);

            if (currentCar == null)
            {
                return false;
            }

            // Gets the current user including its favorite cars collection.
            var currentUserObject = this.context.ApplicationUsers
                .Include(x => x.FavoriteCars)
                .FirstOrDefault(x => x.Id == user.Id);

            if (currentUserObject == null)
            {
                return false;
            }

            // Checks if the car already exist in user's favorites.
            var isFavoriteYet = currentUserObject.FavoriteCars
                .FirstOrDefault(x => x.CarId == currentCar.Id);

            if (isFavoriteYet != null)
            {
                return false;
            }

            // Create ad model.
            var userFavoriteAd = new UserFavoriteCar()
            {
                Car = currentCar,
                CarId = currentCar.Id,
                ApplicationUser = currentUserObject,
                ApplicationUserId = currentUserObject.Id
            };

            // Adds the ad in the user's favorites collection.
            currentUserObject.FavoriteCars.Add(userFavoriteAd);

            // Adds the ad and user ids in the mapping table
            currentCar.UserFavoriteCars.Add(userFavoriteAd);

            var isSuccessful = await this.context.SaveChangesAsync();

            if (isSuccessful > 0)
            {
                return true;
            }

            return false;
        }

        public async Task<ICollection<CarViewModel>> GetMyAds(int toSkip, int pageSize, ApplicationUser user)
        {
            if (toSkip < 0)
            {
                return null;
            }

            if (pageSize <= 0)
            {
                return null;
            }

            if (user == null)
            {
                return null;
            }

            var adsForCurrentUser = await this.context.Cars
                .Where(x => x.ApplicationUserId == user.Id)
                .Skip(toSkip)
                .Take(pageSize)
                .ToListAsync();

            if (adsForCurrentUser == null)
            {
                return null;
            }

            var cars = new List<CarViewModel>();
            foreach (var ad in adsForCurrentUser)
            {
                cars.Add(new CarViewModel
                {
                    Id = ad.Id,
                    ImageUrl = ad.ImageUrl,
                    Brand = ad.Brand,
                    Fuel = ad.Fuel.ToString(),
                    Hp = ad.Hp,
                    Model = ad.Model,
                    AdTitle = ad.AdTitle,
                    Color = ad.Color,
                    Description = ad.Description,
                    Kilometre = ad.Kilometre,
                    Price = ad.Price,
                    Transmission = ad.Transmission.ToString(),
                    VehicleType = ad.VehicleType.ToString(),
                    YearOfProduction = ad.YearOfProduction
                });
            }

            if (cars == null)
            {
                return null;
            }

            return cars;
        }

        public int GetMyAdsCount(ApplicationUser user)
        {
            return this.context.Cars
                .Where(x => x.ApplicationUserId == user.Id)
                .Count();
        }

        public async Task<bool> RemoveAd(string adId)
        {
            if (string.IsNullOrWhiteSpace(adId))
            {
                return false;
            }

            var ad = await this.context.Cars.FirstOrDefaultAsync(x => x.Id == adId);
            if (ad == null)
            {
                return false;
            }

            var adsFromFavorite = await this.context.UserFavoriteCars
                .Where(x => x.CarId == adId)
                .ToListAsync();

            this.context.UserFavoriteCars.RemoveRange(adsFromFavorite);

            this.context.Cars.Remove(ad);

            var isSuccessfully = await this.context.SaveChangesAsync();

            if (isSuccessfully >= 1)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> UpdateAd(EditCarViewModel ad, string id)
        {
            if (ad == null)
            {
                return false;
            }

            var oldAd = await this.context.Cars.FirstOrDefaultAsync(x => x.Id == id);

            if (ad == null)
            {
                return false;
            }

            oldAd.AdTitle = ad.AdTitle;
            oldAd.Brand = ad.Brand;
            oldAd.ImageUrl = ad.ImageUrl;
            oldAd.Model = ad.Model;
            oldAd.Hp = ad.Hp;
            oldAd.Fuel = Enum.Parse<Fuel>(ad.Fuel);
            oldAd.YearOfProduction = ad.YearOfProduction;
            oldAd.Color = ad.Color;
            oldAd.Transmission = Enum.Parse<Transmission>(ad.Transmission);
            oldAd.VehicleType = Enum.Parse<VehicleType>(ad.VehicleType);
            oldAd.Price = ad.Price;
            oldAd.Kilometre = ad.Kilometre;
            oldAd.Description = ad.Description;

            this.context.Cars.Update(oldAd);

            var isSuccesfully = await this.context.SaveChangesAsync();

            if (isSuccesfully >= 1)
            {
                return true;
            }

            return false;
        }
    }
}