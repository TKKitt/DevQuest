using DevQuest.API.Models;

namespace DevQuest.API.Repositories;

public interface ICommentRepository
{
    IEnumerable<Comment> GetCommentsByPostId(int postId);
    Comment? GetCommentById(int commentId);
    Comment CreateComment(Comment newComment, string username, int postId);
    Comment? UpdateComment(Comment newComment);
    void DeleteCommentById(int commentId);
}