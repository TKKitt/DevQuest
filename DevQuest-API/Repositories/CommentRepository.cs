using DevQuest.API.Models;
using DevQuest.API.Migrations;

namespace DevQuest.API.Repositories;

public class CommentRepository : ICommentRepository
{
    private readonly DataDbContext _context;

    public CommentRepository(DataDbContext context)
    {
        _context = context;
    }

    public Comment CreateComment(Comment newComment, string username, int postId)
    {
        newComment.CreatedAt = DateTime.Now;
        newComment.PostId = postId;
        newComment.Username = username;
        _context.Comment.Add(newComment);
        _context.SaveChanges();
        return newComment;
    }

    public void DeleteCommentById(int commentId)
    {
        var comment = _context.Comment.Find(commentId);
        if (comment != null)
        {
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }

    public Comment? GetCommentById(int commentId)
    {
        return _context.Comment.SingleOrDefault(c => c.Id == commentId);
    }

    public IEnumerable<Comment> GetCommentsByPostId(int postId)
    {
        return _context.Comment.Where(c => c.PostId == postId);
    }

    public Comment? UpdateComment(Comment newComment)
    {
        var originalComment = _context.Comment.Find(newComment.Id);
        if (originalComment != null)
        {
            originalComment.Content = newComment.Content;
            originalComment.PostId = newComment.PostId;
            _context.SaveChanges();
        }
        return originalComment;
    }
}