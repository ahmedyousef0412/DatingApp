using API.Const;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Middlewares;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize(Roles = AppRoles.Member)]
public class UsersController(ILogger<UsersController> logger, IMapper mapper, IUnitOfWork unitOfWork) : BaseApiController
{


    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("")]
    public async Task<IActionResult> GetUsers()
    {
        var query = await _unitOfWork.Users
                                 .GetQueryable()
                                 .Include(u => u.Photos)
                                 .AsNoTracking()
                                 .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                                 .ToListAsync();
                               

       
        var usersDto = _mapper.Map<IEnumerable<UserDto>>(query);

        return Ok(usersDto);
    }



    [HttpGet("{userName}")]
    public async Task<IActionResult> GetUser(string userName)
    {
        var user = await _unitOfWork.Users
            .GetQueryable()
            .Where(u => u.UserName == userName)
            .Include(u => u.Photos)
            .AsNoTracking()
            .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (user is null)
            return NotFound();

        return Ok(user);

    }
}
