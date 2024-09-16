using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UrlChangerApi.Controllers
{
    [AllowAnonymous]  
    public class AboutController : Controller
    {
        [HttpGet("/About")]
        public IActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Edit(string description)
        {
            ViewBag.Description = description;
            return View("Index");
        }
    }
}