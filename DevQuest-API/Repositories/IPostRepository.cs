using DevQuest.API.Models;

namespace DevQuest.API.Repositories;

public interface IPostRepository
{
    IEnumerable<Post> GetAllPosts();
    Post? GetPostById(int id);
    IEnumerable<Post> GetPostsByUsername(string username);
    Post CreatePost(Post newPost, string username);
    Post UpdatePost(Post newPost);
    void DeletePost(int postId);
}