using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace API.Entities;



public class ApplicationUser:IdentityUser
{
    public DateTime DateOfBirth  { get; set; }
    public string KnowAs { get; set; } = null!;
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime LastActive { get; set; } = DateTime.Now;
    public string Gender { get; set; } = null!;
    public string? Introduction { get; set; } 
    public string? LookingFor { get; set; } 
    public string? Intrestes { get; set; } 
    public string? City { get; set; } 
    public string? Country { get; set; } 
    public ICollection<Photo> Photos { get; set; } = [];




}
