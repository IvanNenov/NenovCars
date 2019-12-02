using Microsoft.AspNetCore.Identity;

namespace WebApiAuth.Middlewares
{
    public class RolesSeedMiddleware
    {
        public void SeedRoles
(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync
        ("User").Result)
            {
                IdentityRole role = new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "user"
                };
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync
        ("Admin").Result)
            {
                IdentityRole role = new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "admin"
                };
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
    }
}