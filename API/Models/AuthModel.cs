namespace API.Models;

public class AuthModel
{
    public string Message { get; set; }
    public bool IsAuthenticated { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string KnowAs { get; set; }
    public string Gender { get; set; }
    public List<string> Roles { get; set; }
    public string Token { get; set; }
    public string? PhotoUrl { get; set; }
    public DateTime ExpiresOn { get; set; }
}
