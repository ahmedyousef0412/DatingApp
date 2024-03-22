using API.DTOs;
using API.Entities;
using API.Shared;

namespace API.Interfaces;

public interface IUserRpository
{

    Task<IEnumerable<UserDto>> GetUsersAsync();

    IQueryable<ApplicationUser>  GetQueryable();
    Task<Result<UserDto>> GetUserByIdAsync(string id);
    Task<Result<UserDto>> GetUserByNameAsync(string userName);

    Task<bool> SaveAllAsync();

    void Update(UserDto user);



}
