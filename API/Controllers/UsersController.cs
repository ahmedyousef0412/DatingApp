

namespace API.Controllers;

[Authorize(Roles = AppRoles.Member)]
public class UsersController(IMapper mapper, IUnitOfWork unitOfWork) : BaseApiController
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


    [HttpPut]
    public async Task<IActionResult> UpdateUser(MemberDto memberDto)
    {
        var userName = User.GetUserName();

        var user = await _unitOfWork.Users
            .GetByUserNameAsync(u => u.UserName == userName, [Includes.Photo]);

        _mapper.Map(memberDto, user);

        _unitOfWork.Users.Update(user!);

        if (await _unitOfWork.SaveChangesAsync()) 
            return NoContent();


        return BadRequest(Errors.UserNotUpdated);


    }


  
}
