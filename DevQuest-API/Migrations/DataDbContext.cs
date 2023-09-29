using DevQuest.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DevQuest.API.Migrations;
public class DataDbContext : DbContext
{
    public DbSet<Post> Post { get; set; }
    public DbSet<User> User { get; set; }

    public DbSet<Comment> Comment { get; set; }

    public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Username);
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.CreatedAt);

        });
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.PostId);
            entity.Property(e => e.Username);
            entity.Property(e => e.Content).IsRequired();
        });
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName).IsRequired();
            entity.Property(e => e.LastName).IsRequired();
            entity.Property(e => e.Username).IsRequired();
            entity.HasIndex(e => e.Username).IsUnique();
            entity.Property(e => e.Password).IsRequired();
            entity.Property(e => e.Bio);
        });
    }
}