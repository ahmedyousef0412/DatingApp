using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtension
{

    public static string GetUserName(this ClaimsPrincipal claims)
    {
        return claims.FindFirst(ClaimTypes.NameIdentifier)!.Value;
    }
}
