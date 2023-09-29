using DevQuest.API.Repositories;
using DevQuest.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace DevQuest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;

    public AuthController(ILogger<AuthController> logger, IAuthService service)
    {
        _logger = logger;
        _authService = service;
    }

    [HttpGet]
    [Route("user")]
    public ActionResult<User> GetUserData(string username)
    {
        var user = _authService.GetUserData(username);
        user.Password = null;
        return Ok(user);
    }

    [HttpPost]
    [Route("register")]
    public ActionResult<User> Register(User newUser)
    {
        User user = new()
        {
            Username = newUser.Username,
            Password = newUser.Password,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Bio = newUser.Bio,
        };

        _authService.CreateUser(user);
        return Ok(newUser);
    }

    [HttpPost]
    [Route("login")]
    public ActionResult<string> Login(UserDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Username or password is missing");
        }
        var token = _authService.SignIn(request.Username, request.Password);

        if (string.IsNullOrWhiteSpace(token))
        {
            return Unauthorized();
        }

        return Ok(token);
    }

    [HttpGet]
    [Route("validateToken")]
    public ActionResult<bool> ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("super-secret-key-thats-long-enough-for-sha256");

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return true;
        }
        catch
        {
            return false;
        }
    }

    [HttpPut]
    [Route("{Id:int}")]
    public ActionResult<User> UpdateUser(User user)
    {
        if (!ModelState.IsValid || user == null)
        {
            return BadRequest();
        }
        return Ok(_authService.UpdateUser(user));
    }
}
