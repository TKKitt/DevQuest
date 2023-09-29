using DevQuest.API.Models;
using DevQuest.API.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevQuest.API.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly ILogger<CommentController> _logger;
    private readonly ICommentRepository _commentRepository;

    public CommentController(ILogger<CommentController> logger, ICommentRepository repository)
    {
        _logger = logger;
        _commentRepository = repository;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Comment>> GetCommentsByPostId(int postId)
    {
        return Ok(_commentRepository.GetCommentsByPostId(postId));
    }

    [HttpGet]
    [Route("{commentId:int}")]
    public ActionResult<Comment> GetCommentById(int commentId)
    {
        var comment = _commentRepository.GetCommentById(commentId);
        if (comment == null)
        {
            return NotFound();
        }
        return Ok(comment);
    }
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost]
    public ActionResult<Comment> CreateComment(Comment comment, int postId, string username)
    {
        if (!ModelState.IsValid || comment == null)
        {
            return BadRequest();
        }

        var newComment = _commentRepository.CreateComment(comment, username, postId);
        return Created(nameof(GetCommentById), newComment);
    }
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPut]
    [Route("{commentId:int}")]
    public ActionResult<Comment> UpdateComment(Comment comment)
    {
        if (!ModelState.IsValid || comment == null)
        {
            return BadRequest();
        }
        return Ok(_commentRepository.UpdateComment(comment));
    }
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpDelete]
    [Route("{commentId:int}")]
    public ActionResult DeleteComment(int commentId)
    {
        _commentRepository.DeleteCommentById(commentId);
        return NoContent();
    }
}