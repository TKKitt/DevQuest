using System.ComponentModel.DataAnnotations;

namespace DevQuest.API.Models;

public class User
{
    public int Id { get; set; }
    [Required]
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Bio { get; set; }
    [Required]
    public string? FirstName { get; set; }
    [Required]
    public string? LastName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

}