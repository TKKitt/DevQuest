using DevQuest.API.Models;

namespace DevQuest.API.Repositories;

public interface IAuthService
{
    User UpdateUser(User user);
    User GetUserData(string username);
    User CreateUser(User user);
    string SignIn(string username, string password);
}