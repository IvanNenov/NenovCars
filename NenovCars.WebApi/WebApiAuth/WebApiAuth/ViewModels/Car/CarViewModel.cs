﻿using WebApiAuth.Data.Models.Enums;

namespace WebApiAuth.ViewModels.Car
{
    public class CarViewModel
    {
        public string Id { get; set; }
        public string Brand { get; set; }

        public string ImageUrl { get; set; }

        public string Model { get; set; }

        public string Hp { get; set; }

        public Fuel Fuel { get; set; }
    }
}