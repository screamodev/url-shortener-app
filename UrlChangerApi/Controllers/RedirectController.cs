using Microsoft.AspNetCore.Mvc;
using UrlChangerApi.Services.Interfaces;

namespace UrlChangerApi.Controllers
{
    public class RedirectController : Controller
    {
        private readonly IUrlShortenerService _urlShortenerService;

        public RedirectController(IUrlShortenerService urlShortenerService)
        {
            _urlShortenerService = urlShortenerService;
        }

        [HttpGet("/{shortUrl}")]
        public IActionResult RedirectToOriginal(string shortUrl)
        {
            var shortUrlEntity = _urlShortenerService.GetOriginalUrl(shortUrl);
            if (shortUrlEntity == null)
            {
                return NotFound("Shortened URL not found.");
            }
            
            return Redirect(shortUrlEntity.OriginalUrl);
        }
    }
}