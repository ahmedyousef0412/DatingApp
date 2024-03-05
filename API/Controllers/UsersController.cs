using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController : BaseApiController
{
    private readonly ApplicationDbContext _context;
    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("GetAllUsers")]
    public async Task <IActionResult> GetUsers()
    {
        var users =await _context.Users.AsNoTracking().ToListAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user is null)
            return NotFound();

        return Ok(user);
            
    }
}
