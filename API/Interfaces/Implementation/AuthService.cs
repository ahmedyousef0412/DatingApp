


namespace API.Interfaces.Implementation;

public class AuthService(IOptions<JWT> jwt,
    UserManager<ApplicationUser> userManager, IMapper mapper) : IAuthService
{
 
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly IMapper _mapper = mapper;
    private readonly JWT _jwt = jwt.Value;

    public async Task<AuthModel> RgisterAsync(RegisterDto model)
    {
        if (await _userManager.FindByEmailAsync(model.Email) is not null)
            return new AuthModel { Message = Errors.EmailDuplicated };

        if(await _userManager.FindByNameAsync(model.Username) is not null)
            return new AuthModel { Message = Errors.UserExistBefore };

        var user = _mapper.Map<ApplicationUser>(model);



        if (user.Photos.Count == 0) 
        {
            var photo = new Photo
            {
                PublicId = Guid.NewGuid().ToString(),
                Url = CloudinaryDefaultImage.DefaultImage,
                IsMain = true
            };
            user.Photos.Add(photo);
        }

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
            KnowAs = user.KnowAs,
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


        var user = await _userManager.Users.Include(u => u.Photos)
            .FirstOrDefaultAsync(u => u.Email == model.Email);


        if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
        {
            authModel.Message = Errors.EmailOrPasswordIncorrect;
            return authModel;
        }

        var jwtSecurityToken = await CreateJwtToken(user);


        var roles = await _userManager.GetRolesAsync(user);


        authModel.IsAuthenticated = true;
        authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        authModel.Email = user.Email!;
        authModel.UserName = user.UserName!;
        authModel.KnowAs = user.KnowAs!;
        //authModel.PhotoUrl = user.Photos.FirstOrDefault(u => u.IsMain).Url;
        authModel.PhotoUrl = user.Photos.FirstOrDefault(u => u.IsMain).Url;
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
                new Claim("knowAs",user.KnowAs)
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
