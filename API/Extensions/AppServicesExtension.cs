using API.Mapping;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using System.Reflection;

namespace API.Extensions;

public static class AppServicesExtension
{

    public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration configuration)
    {

        #region DP

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IAuthService, AuthService>();
        //services.AddScoped<IUserRpository, UserRpository>();
        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

        #endregion


        services.AddScoped<LogUserActivity>();


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
