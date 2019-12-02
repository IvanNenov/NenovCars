using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiAuth.Data;
using WebApiAuth.Data.Models;
using WebApiAuth.Data.Models.User;
using WebApiAuth.Services.Contracts;
using WebApiAuth.ViewModels.Car;

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
    }
}
