namespace API.DTOs;

public class RegisterDto
{
     public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string KnowAs { get; set; } = null!;
     public string Gender { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
     public string City { get; set; } = null!;
    public string Country { get; set; } = null!;
    public virtual ICollection<PhotoDto> Photos { get; set; } = new List<PhotoDto>();
}
