using API.Const;
using Microsoft.AspNetCore.Identity;

namespace API.Seed;

public class DefaultRoles
{
    public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
    {

        if (!roleManager.Roles.Any())
        {
            await roleManager.CreateAsync(new IdentityRole(AppRoles.Admin));
            await roleManager.CreateAsync(new IdentityRole(AppRoles.Member));
            await roleManager.CreateAsync(new IdentityRole(AppRoles.Moderator));
        }
    }
}
