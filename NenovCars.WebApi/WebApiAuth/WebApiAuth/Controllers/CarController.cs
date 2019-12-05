namespace WebApiAuth.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using WebApiAuth.Services.Contracts;
    using WebApiAuth.ViewModels.Car;
    using WebApiAuth.ViewModels.User;

    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            this._carService = carService;
        }

        [Authorize]
        [HttpPost("[action]")]
        public ActionResult AddCar([FromBody] AddCarViewModel carAd)
        {
            var username = this.Request.Headers["UserId"];
            if (string.IsNullOrWhiteSpace(username))
            {
                return this.Unauthorized();
            }

            this._carService.CreateCar(carAd, username);
            return this.Ok();
        }

        public ActionResult AddToFavorite(string id)
        {
            this._carService.TryAddToFavorite(id);
            return this.Ok();
        }

        [AllowAnonymous]
        [HttpGet("[action]/{currentPage}")]
        public async Task<ActionResult> GetAllCars(string currentPage)
        {
            ICollection<CarViewModel> allCars = new List<CarViewModel>();

            if (string.IsNullOrWhiteSpace(currentPage))
            {
                return this.BadRequest();
            }

            var isValidPage = int.TryParse(currentPage, out int page);
            if (!isValidPage)
            {
                page = 1;
            }

            var pageSize = 5;
            var skip = (page - 1) * pageSize;

            double totalPageCount;

            allCars = await this._carService.GetAll(skip, pageSize);

            totalPageCount = Math.Ceiling((double)this._carService.GetAdsCount() / pageSize);

            var viewModel = new ListOfAllCarsViewModel
            {
                AllCars = allCars,
                CurrentPage = page.ToString(),
                PageSize = pageSize.ToString(),
                TotalPagesCount = totalPageCount.ToString(),
            };

            return this.Ok(viewModel);
        }

        [HttpGet]
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
                FavoriteCarAds = allCars,
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