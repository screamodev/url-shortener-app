namespace UrlChangerApi.Data.Entities;

public class ShortUrl
{ 
        public int Id { get; set; }
        
        public string? OriginalUrl { get; set; }
        
        public string? ShortenedUrl { get; set; }
        
        public string UserId { get; set; }
        
        public DateTime CreatedDate { get; set; }
        
        public User User { get; set; }
}