using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using HabitRPG.Api.Data;
using HabitRPG.Api.Models;
using HabitRPG.Api.Services;

namespace HabitRPG.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HabitsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IGameService _gameService;

        public HabitsController(ApplicationDbContext db, IGameService gameService)
        {
            _db = db;
            _gameService = gameService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            return int.Parse(userIdClaim!);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HabitDto>>> GetHabits()
        {
            var userId = GetCurrentUserId();

            var habits = await _db.Habits
                .Where(h => h.UserId == userId && h.IsActive)
                .OrderByDescending(h => h.CreatedAt)
                .ToListAsync();

            var habitDtos = new List<HabitDto>();

            foreach (var habit in habits)
            {
                var canCompleteToday = await _gameService.CanCompleteHabitTodayAsync(habit.Id);

                habitDtos.Add(new HabitDto
                {
                    Id = habit.Id,
                    Title = habit.Title,
                    Description = habit.Description,
                    Frequency = habit.Frequency,
                    Difficulty = habit.Difficulty,
                    CurrentStreak = habit.CurrentStreak,
                    BestStreak = habit.BestStreak,
                    LastCompletedAt = habit.LastCompletedAt,
                    IsActive = habit.IsActive,
                    CanCompleteToday = canCompleteToday,
                    CreatedAt = habit.CreatedAt
                });
            }

            return Ok(habitDtos);
        }

        [HttpPost]
        public async Task<ActionResult<HabitDto>> CreateHabit([FromBody] CreateHabitRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetCurrentUserId();

            var habit = new Habit
            {
                UserId = userId,
                Title = request.Title,
                Description = request.Description,
                Frequency = request.Frequency,
                Difficulty = request.Difficulty
            };

            _db.Habits.Add(habit);
            await _db.SaveChangesAsync();

            var canCompleteToday = await _gameService.CanCompleteHabitTodayAsync(habit.Id);

            var habitDto = new HabitDto
            {
                Id = habit.Id,
                Title = habit.Title,
                Description = habit.Description,
                Frequency = habit.Frequency,
                Difficulty = habit.Difficulty,
                CurrentStreak = habit.CurrentStreak,
                BestStreak = habit.BestStreak,
                LastCompletedAt = habit.LastCompletedAt,
                IsActive = habit.IsActive,
                CanCompleteToday = canCompleteToday,
                CreatedAt = habit.CreatedAt
            };

            return CreatedAtAction(nameof(GetHabit), new { id = habit.Id }, habitDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HabitDto>> GetHabit(int id)
        {
            var userId = GetCurrentUserId();

            var habit = await _db.Habits
                .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);

            if (habit == null)
                return NotFound();

            var canCompleteToday = await _gameService.CanCompleteHabitTodayAsync(habit.Id);

            var habitDto = new HabitDto
            {
                Id = habit.Id,
                Title = habit.Title,
                Description = habit.Description,
                Frequency = habit.Frequency,
                Difficulty = habit.Difficulty,
                CurrentStreak = habit.CurrentStreak,
                BestStreak = habit.BestStreak,
                LastCompletedAt = habit.LastCompletedAt,
                IsActive = habit.IsActive,
                CanCompleteToday = canCompleteToday,
                CreatedAt = habit.CreatedAt
            };

            return Ok(habitDto);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateHabit(int id, [FromBody] UpdateHabitRequest request)
        {
            var userId = GetCurrentUserId();

            var habit = await _db.Habits
                .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);

            if (habit == null)
                return NotFound();

            if (!string.IsNullOrEmpty(request.Title))
                habit.Title = request.Title;

            if (!string.IsNullOrEmpty(request.Description))
                habit.Description = request.Description;

            if (request.Frequency.HasValue)
                habit.Frequency = request.Frequency.Value;

            if (request.Difficulty.HasValue)
                habit.Difficulty = request.Difficulty.Value;

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabit(int id)
        {
            var userId = GetCurrentUserId();

            var habit = await _db.Habits
                .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);

            if (habit == null)
                return NotFound();

            habit.IsActive = false;
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/complete")]
        public async Task<ActionResult<GameReward>> CompleteHabit(int id)
        {
            var userId = GetCurrentUserId();

            var result = await _gameService.CompleteHabitAsync(userId, id);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(result);
        }

        public class CreateHabitRequest
        {
            public string Title { get; set; } = string.Empty;
            public string? Description { get; set; }
            public HabitFrequency Frequency { get; set; } = HabitFrequency.Daily;
            public HabitDifficulty Difficulty { get; set; } = HabitDifficulty.Medium;
        }

        public class UpdateHabitRequest
        {
            public string? Title { get; set; }
            public string? Description { get; set; }
            public HabitFrequency? Frequency { get; set; }
            public HabitDifficulty? Difficulty { get; set; }
        }
    }
}