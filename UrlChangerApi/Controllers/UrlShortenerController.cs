using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UrlChangerApi.Services.Interfaces;

namespace UrlChangerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlShortenerController : ControllerBase
    {
        private readonly IUrlShortenerService _urlShortenerService;

        public UrlShortenerController(IUrlShortenerService urlShortenerService)
        {
            _urlShortenerService = urlShortenerService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAllUrls()
        {
            var urls = _urlShortenerService.GetAllUrls();
            return Ok(urls);
        }

        [Authorize]
        [HttpPost]
        public IActionResult ShortenUrl([FromBody] string originalUrl)
        {
            if (string.IsNullOrWhiteSpace(originalUrl))
            {
                return BadRequest("URL can't be empty.");
            }

            var userId= User.Claims.Where(x => x.Type == "userId").FirstOrDefault()?.Value;
            if (userId == null)
            {
                return Unauthorized("User is not authorized.");
            }

            try
            {
                var shortUrl = _urlShortenerService.ShortenUrl(originalUrl, userId);
                return Ok(new { ShortUrl = shortUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error while shortening: {ex.Message}");
            }
        }

        [HttpGet("{shortUrl}")]
        [AllowAnonymous]
        public IActionResult GetOriginalUrl(string shortUrl)
        {
            var url = _urlShortenerService.GetOriginalUrl(shortUrl);
            if (url == null)
            {
                return NotFound("URL not found.");
            }
            return Ok(url);
        }
        
        
        [HttpGet("details/{id}")]
        public IActionResult GetUrlById(int id)
        {
            var url = _urlShortenerService.GetOriginalUrlById(id);
            if (url == null)
            {
                return NotFound("URL not found.");
            }
            return Ok(url);
        }


        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteUrl(int id)
        {
            var userId= User.Claims.Where(x => x.Type == "userId").FirstOrDefault()?.Value;

            if (userId == null)
            {
                return Unauthorized("User is not authorized.");
            }
            
            var url = _urlShortenerService.GetOriginalUrlById(id);
            if (url == null)
            {
                return NotFound("URL is not found.");
            }
            
            var userRole = User.FindFirstValue(ClaimTypes.Role);
            if (url.UserId != userId && userRole != "Admin")
            {
                return Forbid("Forbidden.");
            }
            
            _urlShortenerService.DeleteUrl(id);
            return NoContent();
        }
    }
}
