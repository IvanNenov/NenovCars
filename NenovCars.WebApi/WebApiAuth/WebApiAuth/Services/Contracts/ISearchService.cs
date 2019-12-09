using System.Collections.Generic;
using WebApiAuth.ViewModels.Car;

namespace WebApiAuth.Services.Contracts
{
    public interface ISearchService
    {
        List<CarViewModel> Search(string firstParam, string secondParam);
    }
}