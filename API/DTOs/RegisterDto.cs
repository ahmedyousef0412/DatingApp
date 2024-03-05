using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string UserName { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
    public string KnowAs { get; set; } = null!;

    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime LastActive { get; set; } = DateTime.Now;

    public string Gender { get; set; } = null!;
    public string Introduction { get; set; } = null!;
    public string LookingFor { get; set; } = null!;
    public string Intrestes { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Country { get; set; } = null!;
}
