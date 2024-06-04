using API.DTOs;
using API.Entities;
using API.Shared;

namespace API.Interfaces;

public interface IUserRpository
{

    Task<PageList<UserDto>> GetUsersAsync(PaginationParameters paginationParameters);

    IQueryable<ApplicationUser>  GetQueryable();
    Task<Result<ApplicationUser>> GetUserByIdAsync(string id);
    Task<Result<ApplicationUser>> GetUserByNameAsync(string userName);

    
   
    void Update(UserDto user);



}
