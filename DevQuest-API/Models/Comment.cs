using System.ComponentModel.DataAnnotations;

namespace DevQuest.API.Models;


public class Comment
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public string? Username { get; set; }
    [Required]
    public string? Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}