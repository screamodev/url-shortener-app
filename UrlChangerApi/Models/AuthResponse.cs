using UrlChangerApi.Enums;

namespace UrlChangerApi.Models;

public class AuthResponse
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
    public Role Role { get; set; }

}