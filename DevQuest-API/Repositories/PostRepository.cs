using DevQuest.API.Models;
using DevQuest.API.Migrations;

namespace DevQuest.API.Repositories;

public class PostRepository : IPostRepository
{
    private readonly DataDbContext _context;

    public PostRepository(DataDbContext context)
    {
        _context = context;
    }

    public Post CreatePost(Post newPost, string username)
    {
        newPost.CreatedAt = DateTime.Now;
        newPost.Username = username;
        _context.Post.Add(newPost);
        _context.SaveChanges();
        return newPost;
    }

    public void DeletePost(int postId)
    {
        var post = _context.Post.Find(postId);
        if (post != null)
        {
            _context.Post.Remove(post);
            _context.SaveChanges();
        }
    }

    public IEnumerable<Post> GetAllPosts()
    {
        return _context.Post.ToList();
    }

    public Post? GetPostById(int id)
    {
        return _context.Post.SingleOrDefault(p => p.Id == id);
    }

    public IEnumerable<Post> GetPostsByUsername(string username)
    {
        return _context.Post.Where(p => p.Username == username).ToList();
    }

    public Post UpdatePost(Post newPost)
    {
        var originalPost = _context.Post.Find(newPost.Id);
        if (originalPost != null)
        {
            originalPost.Username = newPost.Username;
            originalPost.Content = newPost.Content;
            originalPost.CreatedAt = newPost.CreatedAt;
            _context.SaveChanges();
        }
        return newPost;
    }
}