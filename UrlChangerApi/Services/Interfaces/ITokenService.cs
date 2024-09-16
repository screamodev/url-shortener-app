using System.IdentityModel.Tokens.Jwt;
using UrlChangerApi.Data.Entities;

namespace UrlChangerApi.Services.Interfaces;

public interface ITokenService
{
    string CreateToken(User user);
}