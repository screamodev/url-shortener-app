using System.ComponentModel.DataAnnotations;
using UrlChangerApi.Enums;

namespace UrlChangerApi.Models;

public class RegistrationRequest
{
    [Required]
    public string? Email { get; set; }
    
    [Required]
    public string? Password { get; set; }
    
    public Role Role { get; set; }
}