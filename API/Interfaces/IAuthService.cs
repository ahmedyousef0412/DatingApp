using API.DTOs;
using API.Models;

namespace API.Interfaces;

public interface IAuthService
{

    Task<AuthModel> RgisterAsync(RegisterDto model);

    Task<AuthModel> LoginAsync(LoginDto model);
}
