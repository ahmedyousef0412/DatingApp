

namespace API.Controllers;

[Authorize(Roles = AppRoles.Member)]
public class UsersController(IMapper mapper, IUnitOfWork unitOfWork ) : BaseApiController
{


    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    //private readonly IUserRpository _userRpository = userRpository;


   
    [HttpGet("")]
    public async Task<IActionResult> GetUsers([FromQuery] PaginationParameters parameters)
    {

        var user = await _unitOfWork.UserRpository.GetUserByNameAsync(User.GetUserName());

        parameters.CurrentUserName = user.Data.UserName;
        //parameters.CurrentUserName = user.UserName;

        if (string.IsNullOrEmpty(parameters.Gender))
            //parameters.Gender = user.Gender == "male" ? "female" : "male";
            parameters.Gender = user.Data.Gender == "male" ? "female" : "male";

        var users = await _unitOfWork.UserRpository.GetUsersAsync(parameters);

        Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

        return Ok(users);

    }


    
    [HttpGet("{userName}")]
    public async Task<IActionResult> GetUser(string userName)
    {

        //var user = await _userRpository.GetUserByNameAsync(userName);
        var user = await _unitOfWork.UserRpository.GetUserByNameAsync(userName);

        if (user is null)
            return NotFound();
        var userDto = _mapper.Map<UserDto>(user.Data);
        return Ok(userDto);



    }


    [HttpPut]
    public async Task<IActionResult> UpdateUser(MemberDto memberDto)
    {
        var userName = User.GetUserName();

        var user = await _unitOfWork.Users
            .GetByUserNameAsync(u => u.UserName == userName, [Includes.Photo]);

        _mapper.Map(memberDto, user);

        _unitOfWork.Users.Update(user!);

        if (await _unitOfWork.Complete()) 
            return NoContent();


        return BadRequest(Errors.UserNotUpdated);


    }


  
}
