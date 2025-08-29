using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HabitRPG.Api.Data;
using HabitRPG.Api.Services;
using System.ComponentModel.DataAnnotations;
using System.Xml.XPath;

namespace HabitRPG.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IGameService _gameService;

        public UserController(ApplicationDbContext db, IGameService gameService)
        {
            _db = db;
            _gameService = gameService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            return int.Parse(userIdClaim!);
        }

        [HttpGet("profile")]
        public async Task<ActionResult<UserProfileDto>> GetProfile()
        {
            var userId = GetCurrentUserId();

            var user = await _db.Users
                .Include(u => u.Id == userId)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound();

            var currentLevelXpRequired = _gameService.GetXpRequiredForLevel(user.Level);
            var nextLevelXpRequired = _gameService.GetXpRequiredForLevel(user.Level + 1);
            var xpProgress = user.TotalXP - currentLevelXpRequired;
            var xpToNextLevel = nextLevelXpRequired - user.TotalXP;

            var activeHabitsCount = user.Habits.Count(h => h.IsActive);
            var totalCompletions = await _db.CompletionLogs
                .CountAsync(cl => user.Habits.Any(h => h.Id == cl.HabitId));

            return Ok(new UserProfileDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Level = user.Level,
                XP = user.XP,
                TotalXP = user.TotalXP,
                XpToNextLevel = xpToNextLevel,
                xpProgress = xpProgress,
                XpRequiredForNextLevel = nextLevelXpRequired - currentLevelXpRequired,
                ActiveHabitsCount = activeHabitsCount,
                TotalCompletions = totalCompletions,
                CreatedAt = user.CreatedAt
            });
        }

        public class UserProfileDto
        {
            public int Id { get; set; }
            public string Username { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public int Level { get; set; }
            public int XP { get; set; }
            public int TotalXP { get; set; }
            public int XpToNextLevel { get; set; }
            public int XpProgress { get; set; }
            public int XpRequiredForNextLevel { get; set; }
            public int ActiveHabitsCount { get; set; }
            public int TotalCompletions { get; set; }
            public DateTime CreatedAt { get; set; }
        }
    }
}