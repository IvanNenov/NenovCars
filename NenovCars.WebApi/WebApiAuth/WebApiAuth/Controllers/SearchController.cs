namespace WebApiAuth.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using WebApiAuth.Data.Models.User;
    using WebApiAuth.Services.Contracts;
    using WebApiAuth.ViewModels.Car;

    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ISearchService searchService;

        public SearchController(ISearchService searchService, UserManager<ApplicationUser> userManager)
        {
            this.searchService = searchService ?? throw new ArgumentNullException(nameof(searchService));
            this.userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        [AllowAnonymous]
        [HttpGet("[action]/{firstParam}/{secondParam}")]
        public ActionResult Search(string firstParam, string secondParam)
        {
            var searchResult = this.searchService.Search(firstParam, secondParam);

            if (searchResult == null)
            {
                return this.BadRequest();
            }

            var viewModel = new ListOfAllCarsViewModel
            {
                AllCars = searchResult,
                CurrentPage = "",
                PageSize = "",
                TotalPagesCount = ""
            };

            return Ok(viewModel);
        }
    }
}