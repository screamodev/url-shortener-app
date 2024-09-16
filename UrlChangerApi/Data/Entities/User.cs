using Microsoft.AspNetCore.Identity;
using UrlChangerApi.Enums;

namespace UrlChangerApi.Data.Entities;

public class User : IdentityUser
    {
        public Role Role { get; set; }
    }