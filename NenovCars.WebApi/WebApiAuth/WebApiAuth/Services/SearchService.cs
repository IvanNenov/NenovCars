using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using WebApiAuth.Data;
using WebApiAuth.Data.Models;
using WebApiAuth.Services.Contracts;
using WebApiAuth.ViewModels.Car;

namespace WebApiAuth.Services
{
    public class SearchService : ISearchService
    {
        private readonly WebApiAuthDbContext context;

        public SearchService(WebApiAuthDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public List<CarViewModel> Search(string firstParam, string secondParam)
        {
            var searchResultViewModel = new List<CarViewModel>();
            var searchResult = new List<Car>();
            if (firstParam != null && secondParam != null)
            {
                int year;
                if (int.TryParse(firstParam, out year))
                {
                    searchResult = this.context.Cars.Where(x => int.Parse(x.YearOfProduction) <= year && x.Brand.ToUpper().Contains(secondParam.ToUpper()))
                        .ToList();
                }
                else if (int.TryParse(secondParam, out year))
                {
                    searchResult = this.context.Cars.Where(x => int.Parse(x.YearOfProduction) <= year && x.Brand.ToUpper().Contains(firstParam.ToUpper()))
                        .ToList();
                }
            }
            else
            {
                int year;
                if (int.TryParse(firstParam, out year))
                {
                    searchResult = this.context.Cars.Where(x => int.Parse(x.YearOfProduction) <= year)
                        .ToList();
                }
                else
                {
                    searchResult = this.context.Cars.Where(x => x.Brand.ToUpper().Contains(firstParam.ToUpper()))
                        .ToList();
                }
            }

            if (searchResult == null)
            {
                return null;
            }

            foreach (var result in searchResult)
            {
                searchResultViewModel.Add(new CarViewModel
                {
                    Id = result.Id,
                    ImageUrl = result.ImageUrl,
                    Brand = result.Brand,
                    Fuel = result.Fuel.ToString(),
                    Hp = result.Hp,
                    Model = result.Model,
                    AdTitle = result.AdTitle,
                    Color = result.Color,
                    Description = result.Description,
                    Kilometre = result.Kilometre,
                    Price = result.Price,
                    Transmission = result.Transmission.ToString(),
                    VehicleType = result.VehicleType.ToString(),
                    YearOfProduction = result.YearOfProduction
                });
            }

            return searchResultViewModel;
        }

        private static Func<Car, bool> GetDynamicSearchExpressionTree(string propertyName, string value)
        {
            var param = Expression.Parameter(typeof(Car), "x");

            var memeber = Expression.Property(param, propertyName);

            var valueExpression = GetValueExpression(propertyName, value, param);

            var body = Expression.Equal(memeber, valueExpression);

            var finalQuery = Expression.Lambda<Func<Car, bool>>(body: body, parameters: param);

            return finalQuery.Compile();
        }

        private static UnaryExpression GetValueExpression(string propertyName, string val, ParameterExpression param)
        {
            var member = Expression.Property(param, propertyName);
            var propertyType = ((PropertyInfo)member.Member).PropertyType;
            var converter = TypeDescriptor.GetConverter(propertyType);

            if (!converter.CanConvertFrom(typeof(string)))
                throw new NotSupportedException();

            var propertyValue = converter.ConvertFromInvariantString(val);
            var constant = Expression.Constant(propertyValue);

            return Expression.Convert(constant, propertyType);
        }
    }
}