using DevQuest.API.Models;
using DevQuest.API.Migrations;
using System.Text;
using bcrypt = BCrypt.Net.BCrypt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace DevQuest.API.Repositories;

public class AuthService : IAuthService
{
    private static DataDbContext _context;
    private static IConfiguration _config;

    public AuthService(DataDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public User UpdateUser(User user)
    {
        var originalUser = _context.User.Find(user.Id);
        if (originalUser != null)
        {
            originalUser.FirstName = user.FirstName;
            originalUser.LastName = user.LastName;
            originalUser.Username = user.Username;
            originalUser.Bio = user.Bio;
            originalUser.CreatedAt = user.CreatedAt;
            _context.SaveChanges();
        }
        originalUser.Password = null;
        return originalUser;
    }

    public User GetUserData(string username)
    {
        var user = _context.User.SingleOrDefault(x => x.Username == username);
        return user;
    }

    public User CreateUser(User user)
    {
        var passwordHash = bcrypt.HashPassword(user.Password);
        user.Password = passwordHash;

        _context.Add(user);
        _context.SaveChanges();
        return user;
    }

    public string SignIn(string username, string password)
    {
        var user = _context.User.SingleOrDefault(x => x.Username == username);
        var verified = false;

        if (user != null)
        {
            verified = bcrypt.Verify(password, user.Password);
        }

        if (user == null || !verified)
        {
            return String.Empty;
        }

        return BuildToken(user);
    }

    private string BuildToken(User user)
    {
        var secret = _config.GetValue<string>("TokenSecret");
        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

        var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var claims = new Claim[] {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim("username", user.Username)
        };

        var jwt = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(5),
            signingCredentials: signingCredentials
        );

        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        return encodedJwt;
    }
}