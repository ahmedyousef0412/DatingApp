using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly IAuthService _authService;
    public AccountController(IAuthService authService)
    {
        _authService = authService;
    }


    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(dto);

        var result = await _authService.RgisterAsync(dto);

        if (!result.IsAuthenticated)
            return BadRequest(result.Message);


        return Ok(new { Token = result.Token, ExpireOn = result.ExpiresOn });
    }

    [HttpPost("Login")]
    public async Task<IActionResult> GetTokenAsync([FromBody] LoginDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(model);

        var result = await _authService.LoginAsync(model);


        if (!result.IsAuthenticated)
            return BadRequest(result.Message);

        return Ok(result);

    }
}
