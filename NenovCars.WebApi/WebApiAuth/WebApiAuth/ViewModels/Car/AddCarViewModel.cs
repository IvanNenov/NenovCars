﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiAuth.Data.Models.Enums;

namespace WebApiAuth.ViewModels.Car
{
    public class AddCarViewModel
    {
        public string CarBrand { get; set; }
        public string ImageUrl { get; set; }
        public string CarModel { get; set; }
        public string Hp { get; set; }
        public Fuel Fuel { get; set; }
    }
}
