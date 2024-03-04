using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace API.Entities;



public class ApplicationUser
{

    public int Id { get; set; }
    public string UserName { get; set; } = null!;
}
