using Microsoft.EntityFrameworkCore;
using UrlChangerApi.Data;
using UrlChangerApi.Data.Entities;
using UrlChangerApi.Services;

namespace UrlChangerApi.UnitTests.Services;

public class UrlShortenerServiceTests
{
    private readonly ApplicationDbContext _context;
    private readonly UrlShortenerService _service;

    public UrlShortenerServiceTests()
    {
        // Настройка InMemoryDatabase
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "UrlShortenerTestDb")
            .Options;

        _context = new ApplicationDbContext(options);
        _service = new UrlShortenerService(_context);
    }

    [Fact]
    public void GetAllUrls_ShouldReturnAllUrls()
    {
        _context.ShortUrls.RemoveRange(_context.ShortUrls);
        _context.SaveChanges();

        // Arrange
        var url1 = new ShortUrl { OriginalUrl = "http://test.com/1", ShortenedUrl = "abc123", UserId = "user1" };
        var url2 = new ShortUrl { OriginalUrl = "http://test.com/2", ShortenedUrl = "def456", UserId = "user2" };
        
        _context.ShortUrls.Add(url1);
        _context.ShortUrls.Add(url2);
        _context.SaveChanges();

        // Act
        var result = _service.GetAllUrls();

        // Assert
        Assert.Equal(2, result.Count()); 
    }
    
    [Fact]
    public void ShortenUrl_ShouldReturnShortenedUrl_WhenUrlDoesNotExist()
    {
        // Arrange
        _context.ShortUrls.RemoveRange(_context.ShortUrls);
        _context.SaveChanges();

        var originalUrl = "http://test.com/1";
        var userId = "user1";

        // Act
        var shortenedUrl = _service.ShortenUrl(originalUrl, userId);

        // Assert
        Assert.NotNull(shortenedUrl);
        Assert.Equal(1, _context.ShortUrls.Count()); 
    }


    [Fact]
    public void GetOriginalUrl_ShouldReturnOriginalUrl_WhenShortUrlExists()
    {
        // Arrange
        var shortUrlEntity = new ShortUrl { OriginalUrl = "http://test.com/1", ShortenedUrl = "abc123", UserId = "user1" };
        _context.ShortUrls.Add(shortUrlEntity);
        _context.SaveChanges();

        // Act
        var result = _service.GetOriginalUrl("abc123");

        // Assert
        Assert.NotNull(result);
        Assert.Equal("http://test.com/1", result.OriginalUrl);
    }

    [Fact]
    public void DeleteUrl_ShouldReturnDeletedUrl_WhenUrlExists()
    {
        // Arrange
        _context.ShortUrls.RemoveRange(_context.ShortUrls); 
        _context.SaveChanges();

        var shortUrlEntity = new ShortUrl { OriginalUrl = "http://test.com/1", ShortenedUrl = "abc123", UserId = "user1" };
        _context.ShortUrls.Add(shortUrlEntity);
        _context.SaveChanges();

        // Act
        var result = _service.DeleteUrl(shortUrlEntity.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("abc123", result.ShortenedUrl);
        Assert.Equal(0, _context.ShortUrls.Count()); 
    }

}
