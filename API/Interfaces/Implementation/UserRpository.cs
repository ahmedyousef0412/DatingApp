using API.Const;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Shared;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Interfaces.Implementation;

public class UserRpository : IUserRpository
{


    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public UserRpository(ApplicationDbContext context, IMapper mapper )
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<IEnumerable<UserDto>> GetUsersAsync()
    {
        var users = await _context.Users
            .AsNoTracking()
            .Include(p => p.Photos)
            .ToListAsync();

        var userDto = _mapper.Map<IEnumerable<UserDto>>(users);

        return userDto;


    }


    public IQueryable<ApplicationUser> GetQueryable()
    {

        return _context.Users;
        
    }

    public async Task<Result<UserDto>> GetUserByIdAsync(string id)
    {
        var user = await _context.Users
             .Include(u => u.Photos)
             .SingleOrDefaultAsync(u => u.Id == id);


        if (user is null)
            return Result<UserDto>.Failure(Errors.UserNotFound);

        var userDto = _mapper.Map<UserDto>(user);

        return Result<UserDto>.Success(userDto);
     
    }

    public async Task<Result<UserDto>> GetUserByNameAsync(string userName)
    {
        var user = await _context.Users
            .Include(u => u.Photos)
            .SingleOrDefaultAsync(u => u.UserName == userName);

        if(user is null)
            return Result<UserDto>.Failure(Errors.UserNotFound);


        var userDto = _mapper.Map<UserDto>(user);

        return Result<UserDto>.Success(userDto);
    }

    

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Update(UserDto user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }

   
}
