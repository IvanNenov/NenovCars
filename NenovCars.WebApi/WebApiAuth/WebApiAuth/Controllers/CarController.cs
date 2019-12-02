using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using WebApiAuth.Data.Models;
using WebApiAuth.Services.Contracts;
using WebApiAuth.ViewModels.Car;

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
    }
}