using API.Const;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helper;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace API.Interfaces.Implementation;

public class AuthService : IAuthService
{
 
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    private readonly JWT _jwt;
    public AuthService( IOptions<JWT> jwt,
        UserManager<ApplicationUser> userManager, IMapper mapper)
    {
       
        _jwt = jwt.Value;
        _userManager = userManager;
        _mapper = mapper;
    }


    public async Task<AuthModel> RgisterAsync(RegisterDto model)
    {
        if (await _userManager.FindByEmailAsync(model.Email) is not null)
            return new AuthModel { Message = "Email is already exist!" };

        if(await _userManager.FindByNameAsync(model.UserName) is not null)
            return new AuthModel { Message = "UserName is already exist!" };

        var user = _mapper.Map<ApplicationUser>(model);

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            string errors = string.Empty;
            foreach (var error in result.Errors)
            {
                errors += $"{error.Description},";

            }
            return new AuthModel { Message = errors };
        }


        await _userManager.AddToRoleAsync(user, AppRoles.Member);

        var jwtToken = await CreateJwtToken(user);

        return new AuthModel
        {
            Email = user.Email,
            ExpiresOn = jwtToken.ValidTo,
            IsAuthenticated = true,
            Roles = new List<string> { AppRoles.Member },
            Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
            UserName = user.UserName
        };
    }

    public async Task<AuthModel> LoginAsync(LoginDto model)
    {
        var authModel = new AuthModel();


        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
        {
            authModel.Message = "Email or Password is Incorrect";
            return authModel;
        }

        var jwtSecurityToken = await CreateJwtToken(user);


        var roles = await _userManager.GetRolesAsync(user);


        authModel.IsAuthenticated = true;
        authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        authModel.Email = user.Email!;
        authModel.UserName = user.UserName!;
        authModel.ExpiresOn = jwtSecurityToken.ValidTo;

        authModel.Roles = roles.ToList();



        return authModel;
    }

   

    private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
    {

        //Get User Claims
        var userClaims = await _userManager.GetClaimsAsync(user);

        //Get User Roles

        var userRoles = await _userManager.GetRolesAsync(user);

        var claimRoles = new List<Claim>();

        foreach (var role in userRoles)
            claimRoles.Add(new Claim("roles", role));

        var claims = new[]
        {
                new Claim (JwtRegisteredClaimNames.Sub ,user.UserName!),
                new Claim (JwtRegisteredClaimNames.Email ,user.Email!),
                new Claim ("uid" ,user.Id!),
        }
        .Union(userClaims).Union(claimRoles);

        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));

        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

        var jwtSecurityToken = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.Now.AddDays(_jwt.DurationInDays),
            //expires: DateTime.Now.AddSeconds(30),
            signingCredentials: signingCredentials);

        return jwtSecurityToken;
    }
}
