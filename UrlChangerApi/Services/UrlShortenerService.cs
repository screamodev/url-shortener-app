using System.Text;
using UrlChangerApi.Data;
using UrlChangerApi.Data.Entities;
using UrlChangerApi.Services.Interfaces;

namespace UrlChangerApi.Services;

public class UrlShortenerService : IUrlShortenerService
{
    private readonly ApplicationDbContext _context;

    public UrlShortenerService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public IEnumerable<ShortUrl> GetAllUrls()
    {
        return _context.ShortUrls.ToList();
    }

    public string ShortenUrl(string originalUrl, string userId)
    {
        var existingUrl = _context.ShortUrls.FirstOrDefault(u => u.OriginalUrl == originalUrl && u.UserId == userId);
        if (existingUrl != null)
        {
            return existingUrl.ShortenedUrl;
        }

        var shortUrl = new ShortUrl()
        {
            OriginalUrl = originalUrl,
            UserId = userId,
            CreatedDate = DateTime.UtcNow
        };

        _context.ShortUrls.Add(shortUrl);
        _context.SaveChanges();
        
        shortUrl.ShortenedUrl = ConvertToBase62(shortUrl.Id);
        _context.SaveChanges();

        return shortUrl.ShortenedUrl;
    }

    public ShortUrl? GetOriginalUrl(string shortUrl)
    {
        return _context.ShortUrls.FirstOrDefault(u => u.ShortenedUrl == shortUrl);
    }
    
    public ShortUrl? GetOriginalUrlById(int id)
    {
        return _context.ShortUrls.FirstOrDefault(u => u.Id == id);
    }
    
    public ShortUrl? DeleteUrl(int id)
    {
        var url = _context.ShortUrls.Find(id);
        
        if (url == null)
        {
            return null;
        }
        
        _context.Remove(url);
        _context.SaveChanges();

        return url;
    }

    private string ConvertToBase62(int id)
    {
        const string alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var result = new StringBuilder();

        while (id > 0)
        {
            result.Insert(0, alphabet[id % 62]);
            id /= 62;
        }

        return result.ToString();
    }
}