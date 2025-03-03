using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuizMasterMVC.Models.DatabaseModels;
using QuizMasterMVC.Models.ViewModels;
using QuizMasterMVC.Services.Interfaces;
using System.Security.Claims;

namespace QuizMasterMVC.Controllers
{
    public class QuizController : Controller
    {
        private readonly IQuizService _quizService;
        private readonly UserManager<QuizMasterUser> _userManager;
        public QuizController(IQuizService quizService, UserManager<QuizMasterUser> userManager)
        {
            _quizService = quizService;
            _userManager = userManager;
        }
        public IActionResult Create()
        {
            if(User.Identity.IsAuthenticated)
            {
                QuizViewModel quizViewModel = new QuizViewModel { };
                return View(quizViewModel);
            }
            return RedirectToAction("Login", "User");
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(QuizViewModel quiz)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            QuizMasterUser? user = await _userManager.FindByIdAsync(userId);
            if(user != null)
            {
                await _quizService.CreateQuizAsync(quiz, user);
                user.AmountOfCreatedQuizzes++;
                await _userManager.UpdateAsync(user);
            }
            return RedirectToAction("Profile", "User");
        }
        public async Task<IActionResult> Solve([FromQuery(Name = "id")] string quizId)
        {
            if(quizId.IsNullOrEmpty())
            {
                return RedirectToAction("Index", "Home");
            }
            try
            {
                int id = Int32.Parse(quizId);
                if(await _quizService.GetQuizByIdAsync(id) == null)
                {
                    return RedirectToAction("Index", "Home");
                }
				return View();
			}
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
				return RedirectToAction("Index", "Home");
			}
        
        }
        
        public IActionResult Search([FromQuery(Name = "searchTerm")] string searchTerm)
        {
			if (searchTerm.IsNullOrEmpty())
			{
				return RedirectToAction("Index", "Home");
			}
			return View();
        }
		[Authorize]
		[HttpPost]
        public async Task<IActionResult> Delete(int id)
		{
            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            QuizMasterUser? user = await _userManager.FindByIdAsync(userId);
            List<Quiz> quizArray = await _quizService.GetQuizArrayByUserId(userId);
			Quiz? quiz = quizArray.FirstOrDefault(q => q.QuizID == id);
            if(quiz != null && user != null)
            {
				await _quizService.DeleteQuizAsync(id);
                user.AmountOfCreatedQuizzes--;
                await _userManager.UpdateAsync(user);
            }
            return RedirectToAction("Profile", "User");
		}
        public IActionResult Latest()
        {
            return View();
        }
    }
}
