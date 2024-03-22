using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(IAuthService authService) : BaseApiController
{

    #region Fields

    private readonly IAuthService _authService = authService;

    #endregion


    #region Actions

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(dto);

        var result = await _authService.RgisterAsync(dto);

        if (!result.IsAuthenticated)
            return BadRequest(result.Message);


        return Ok(new { result.Token, ExpireOn = result.ExpiresOn });
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


    #endregion
}
