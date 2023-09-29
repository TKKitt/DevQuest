using DevQuest.API.Models;
using DevQuest.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace DevQuest.API.Controllers;

[ApiController]
[Route("[controller]")]
public class PostController : ControllerBase
{
    private readonly ILogger<PostController> _logger;
    private readonly IPostRepository _postRepository;

    public PostController(ILogger<PostController> logger, IPostRepository repository)
    {
        _logger = logger;
        _postRepository = repository;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Post>> GetAllPosts()
    {
        return Ok(_postRepository.GetAllPosts());
    }

    [HttpGet]
    [Route("{Id:int}")]
    public ActionResult<Post> GetPostById(int Id)
    {
        var post = _postRepository.GetPostById(Id);
        if (post == null)
        {
            return NotFound();
        }
        return Ok(post);
    }

    [HttpGet]
    [Route("username/{username}")]
    public ActionResult<IEnumerable<Post>> GetPostsByUsername(string username)
    {
        var posts = _postRepository.GetPostsByUsername(username);
        if (posts == null)
        {
            return NotFound();
        }
        return Ok(posts);
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost]
    public ActionResult<Post> CreatePost(Post post, string username)
    {
        if (!ModelState.IsValid || post == null)
        {
            return BadRequest();
        }

        var newPost = _postRepository.CreatePost(post, username);
        return Created(nameof(GetPostById), newPost);
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPut]
    [Route("{Id:int}")]
    public ActionResult<Post> UpdatePost(Post post)
    {
        if (!ModelState.IsValid || post == null)
        {
            return BadRequest();
        }

        return Ok(_postRepository.UpdatePost(post));
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpDelete]
    [Route("{Id:int}")]
    public ActionResult DeletePost(int Id)
    {
        _postRepository.DeletePost(Id);
        return NoContent();
    }
}
