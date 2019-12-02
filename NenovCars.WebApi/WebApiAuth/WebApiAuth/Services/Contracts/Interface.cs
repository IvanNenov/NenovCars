using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiAuth.ViewModels.Car;

namespace WebApiAuth.Services.Contracts
{
    public interface ICarService
    {
        void CreateCar(AddCarViewModel model);
    }
}
