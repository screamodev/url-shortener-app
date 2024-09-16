using UrlChangerApi.Data.Entities;
using UrlChangerApi.Models;

namespace UrlChangerApi.Services.Interfaces;

public interface IUrlShortenerService
{
    IEnumerable<ShortUrl> GetAllUrls();
    string ShortenUrl(string originalUrl, string userId);
    ShortUrl? GetOriginalUrl(string shortUrl);
    ShortUrl? GetOriginalUrlById(int id);
    ShortUrl? DeleteUrl(int id);

}