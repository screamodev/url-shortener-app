using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UrlChangerApi.Data;
using UrlChangerApi.Data.Entities;
using UrlChangerApi.Enums;
using UrlChangerApi.Models;
using UrlChangerApi.Services;

namespace UrlChangerApi.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly TokenService _tokenService;

    public UsersController(UserManager<User> userManager, ApplicationDbContext context, TokenService tokenService)
    {
        _userManager = userManager;
        _context = context;
        _tokenService = tokenService;
    }
    
    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegistrationRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new User { UserName = request.Email, Email = request.Email, Role = Role.User };
        var result = await _userManager.CreateAsync(user, request.Password!);

        if (result.Succeeded)
        {
            var accessToken = _tokenService.CreateToken(user);

            return CreatedAtAction(nameof(Register), new AuthResponse
            {
                Id = user.Id,
                Email = user.Email,
                Token = accessToken,
                Role = user.Role
            });
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }

        return BadRequest(ModelState);
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var managedUser = await _userManager.FindByEmailAsync(request.Email!);
        if (managedUser == null)
        {
            return BadRequest("Bad credentials");
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, request.Password!);
        if (!isPasswordValid)
        {
            return BadRequest("Bad credentials");
        }

        var accessToken = _tokenService.CreateToken(managedUser);

        return Ok(new AuthResponse
        {
            Id = managedUser.Id,
            Email = managedUser.Email,
            Token = accessToken,
            Role = managedUser.Role
        });
    }
}