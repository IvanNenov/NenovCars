namespace WebApiAuth.Controllers
{
    using System;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using WebApiAuth.Data.Models.User;
    using WebApiAuth.Services.Contracts;
    using WebApiAuth.ViewModels.Car;

    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        private readonly UserManager<ApplicationUser> userManager;

        public CarController(ICarService carService, UserManager<ApplicationUser> userManager)
        {
            this._carService = carService;
            this.userManager = userManager;
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult> AddCar([FromBody] AddCarViewModel carAd)
        {
            if(carAd == null)
            {
                return this.BadRequest("The input model cannot be null");
            }

            var userId = this.Request.Headers["UserId"];
            if (string.IsNullOrWhiteSpace(userId))
            {
                return this.BadRequest("The user id cannot be empty");
            }

            var user = await this.userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return this.Unauthorized();
            }

            var isSuccessful = await this._carService.CreateCar(carAd, user);

            if(!isSuccessful)
            {
                return this.BadRequest();
            }

            return this.Ok(isSuccessful);
        }

        [Authorize]
        [HttpGet("[action]/{id}/{userId}")]
        public async Task<ActionResult> RemoveFromFavorite(string id, string userId)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return this.BadRequest("Invalid ad id");
            }

            if (string.IsNullOrWhiteSpace(userId))
            {
                return this.BadRequest("Invalid user id");
            }

            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return this.Unauthorized();
            }

            var isOperationSucceeded = await this._carService.RemoveFromFavorite(id, user);

            if (!isOperationSucceeded)
            {
                return this.BadRequest("This ad is no longer in the favorite list.");
            }

            return this.Ok(isOperationSucceeded);
        }

        [Authorize]
        [HttpGet("[action]/{id}/{userId}")]
        public async Task<ActionResult> AddToFavorite(string id, string userId)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return this.BadRequest("Invalid ad id");
            }

            if (string.IsNullOrWhiteSpace(userId))
            {
                return this.BadRequest("Invalid user id");
            }

            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return this.Unauthorized();
            }

            var isOperationSucceeded = await this._carService.AddToFavorite(id, user);

            if (!isOperationSucceeded)
            {
                return this.BadRequest("This ad is already in the favorite list.");
            }

            return this.Ok(isOperationSucceeded);
        }

        [AllowAnonymous]
        [HttpGet("[action]/{currentPage}")]
        public async Task<ActionResult> GetAllCars(string currentPage)
        {
            var isValidPage = int.TryParse(currentPage, out int page);
            if (!isValidPage)
            {
                page = 1;
            }

            var pageSize = 5;
            var skip = (page - 1) * pageSize;

            double totalPageCount;

            var allCars = await this._carService.GetAll(skip, pageSize);

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

        [Authorize]
        [HttpGet("[action]/{userId}/{currentPage}")]
        public async Task<ActionResult> GetFavoriteCars(string userId, string currentPage)
        {
            var isValidPage = int.TryParse(currentPage, out int page);
            if (!isValidPage)
            {
                page = 1;
            }

            if (string.IsNullOrWhiteSpace(userId))
            {
                return this.BadRequest("Invalid user id");
            }

            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return this.Unauthorized();
            }

            var pageSize = 5;
            var skip = (page - 1) * pageSize;

            double totalPageCount;

            var allCars = await this._carService
                .GetFavoriteCars(skip, pageSize, user)
                .ConfigureAwait(false);

            totalPageCount = Math.Ceiling((double)this._carService.GetFavroiteAdsCount(user) / pageSize);

            var viewModel = new ListOfAllCarsViewModel()
            {
                AllCars = allCars,
                CurrentPage = page.ToString(),
                PageSize = pageSize.ToString(),
                TotalPagesCount = totalPageCount.ToString()
            };

            if (allCars == null || viewModel == null)
            {
                return this.BadRequest();
            }

            return this.Ok(viewModel);
        }
    }
}