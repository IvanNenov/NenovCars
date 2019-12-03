using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApiAuth.Data.Models;
using WebApiAuth.Services.Contracts;
using WebApiAuth.ViewModels.Car;
using WebApiAuth.ViewModels.User;

namespace WebApiAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        public CarController(ICarService carService)
        {
            this._carService = carService;
        }

        [HttpPost("[action]")]
        public ActionResult AddCar([FromBody] AddCarViewModel carAd)
        {
            this._carService.CreateCar(carAd);
            return this.Ok();
        }

        public ActionResult AddToFavorite(string id)
        {
            this._carService.TryAddToFavorite(id);
            return this.Ok();
        }

        public ActionResult FavoriteJobs(int? currentPage)
        {
            var allCars = new List<GetFavoriteCarsViewModel>();

            var page = currentPage ?? 1;
            var pageSize = 5;
            var skip = (page - 1) * pageSize;

            double totalPageCount;

            allCars = this._carService
                .GetFavoriteCars()
                .Skip(skip)
                .Take(pageSize)
                .ToList();

            totalPageCount = Math.Ceiling((double)this._carService.GetFavoriteCars().Count() / pageSize);

            var viewModel = new ListOfFavoriteCars()
            {
                FavoriteJobsAds = allCars,
                CurrentPage = page,
                PageSize = pageSize,
                TotalPagesCount = totalPageCount,
                IsAny = true
            };

            if (allCars.Count > 0)
            {
                return this.Ok(viewModel);
            }

            viewModel.IsAny = false;
            return this.BadRequest();
        }
    }
}