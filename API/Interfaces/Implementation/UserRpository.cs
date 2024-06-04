using API.Const;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Shared;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Interfaces.Implementation;

public class UserRpository(ApplicationDbContext context, IMapper mapper) : IUserRpository
{


    private readonly ApplicationDbContext _context = context;
    private readonly IMapper _mapper = mapper;

    public async Task<PageList<UserDto>> GetUsersAsync(PaginationParameters paginationParameters)
    {


        var query = _context.Users.AsQueryable();


        //Filter By UserName and Gender
        query = query.Where(u => u.UserName != paginationParameters.CurrentUserName);
        query = query.Where(u => u.Gender == paginationParameters.Gender);



        var currentDate = DateTime.Today;


        //Max BirthDate => representing the maximum birth date Example => 1980
        //Min BirthDate => representing the minimum birth date Example => 2004

        var maxBirthdate = currentDate.AddYears(-paginationParameters.MinAge); //20 [04]
        var minBirthdate = currentDate.AddYears(-paginationParameters.MaxAge); //19 [79]
        

        //Filter By BirthDate
        //                                    1997         1979                              2004
        query = query.Where(u => u.DateOfBirth >= minBirthdate && u.DateOfBirth <= maxBirthdate);



        query = paginationParameters.OrderBy switch
        {
            "created" => query.OrderByDescending(u => u.Created),
            _ => query.OrderByDescending(u => u.LastActive)
        };

        return await PageList<UserDto>.CreateAsync(query
            .Include(p => p.Photos)
             .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            .AsNoTracking(),
            paginationParameters.PageNumber, paginationParameters.PageSize);


    }


    public IQueryable<ApplicationUser> GetQueryable()
    {

        return _context.Users;

    }

    public async Task<Result<ApplicationUser>> GetUserByIdAsync(string id)
    {
        var user = await _context.Users.FindAsync(id);   
             


        if (user is null)
            return Result<ApplicationUser>.Failure(Errors.UserNotFound);

        

        return Result<ApplicationUser>.Success(user);

    }

    public async Task<Result<ApplicationUser>> GetUserByNameAsync(string userName)
    {

        var user = await _context.Users
              .Include(p => p.Photos)
              .SingleOrDefaultAsync(x => x.UserName == userName);

        if (user is null)
            return Result<ApplicationUser>.Failure(Errors.UserNotFound);

        return Result<ApplicationUser>.Success(user);
        //return await _context.Users
        //      .Include(p => p.Photos)
        //      .SingleOrDefaultAsync(x => x.UserName == userName);
    }



    public void Update(UserDto user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }
    
   
}
