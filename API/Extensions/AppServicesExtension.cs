using API.Data;
using API.Entities;
using API.Interfaces.Implementation;
using API.Interfaces;
using API.Mapping;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using Microsoft.EntityFrameworkCore;
using API.Helper;

namespace API.Extensions;

public static class AppServicesExtension
{

    public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration configuration)
    {

        #region DP

        services.AddScoped<IAuthService, AuthService>();

        //services.AddScoped<IUserRpository, UserRpository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        #endregion

        #region Connection String

        services.AddDbContext<ApplicationDbContext>(options =>
        {

            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        });
        services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();


        #endregion

        #region JWT Map


        services.Configure<JWT>(configuration.GetSection("JWT"));
        #endregion

        #region JWT Config

        services.AddAuthentication(options =>
        {

            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            o.RequireHttpsMetadata = false;
            o.SaveToken = false;
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = configuration["JWT:Issuer"],
                ValidAudience = configuration["JWT:Audience"],
                //ClockSkew =TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]))
            };
        });
        #endregion

        #region AutoMapper

        services.AddAutoMapper(Assembly.GetAssembly(typeof(MappingProfile)));
        #endregion

        #region Cors Policy


        services.AddCors(options =>
        {

            options.AddPolicy("corsPolicy", builder =>
            {
                builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();

            });
        });

        #endregion

        
        #region Cloudinary

        services.Configure<CloudinarySettings>(configuration.GetSection(nameof(CloudinarySettings)));

        services.AddScoped<IImageService, ImageService>();

        #endregion
       
        
        return services;
    }
}
