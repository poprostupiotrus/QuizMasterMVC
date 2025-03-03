using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMasterMVC.Models.DatabaseModels;
using QuizMasterMVC.Models.ViewModels;
using QuizMasterMVC.Services.Interfaces;
using System.Security.Claims;

namespace QuizMasterMVC.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserProfileController : ControllerBase
	{
		private readonly UserManager<QuizMasterUser> _userManager;
		private readonly IQuizService _quizService;
		public UserProfileController(UserManager<QuizMasterUser> userManager, IQuizService quizService)
		{
			_userManager = userManager;
			_quizService = quizService;
		}
		[HttpGet("details")]
		public async Task<ActionResult<QuizMasterUserViewModel>> GetUserDetails()
		{
			string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

			QuizMasterUser? user = await _userManager.FindByIdAsync(userId);
			List<Quiz> quizArray = await _quizService.GetQuizArrayByUserId(userId);

			List<QuizViewModel> quizViewModelArray = new List<QuizViewModel>();

			if(quizArray != null)
			{
				foreach (var quiz in quizArray)
				{
					quizViewModelArray.Add(ModelConverter.QuizToQuizViewModel(quiz));
				}
			}
			QuizMasterUserViewModel userViewModel = new QuizMasterUserViewModel();
			if(user != null)
			{
				userViewModel.UserName = user.UserName;
				userViewModel.TimeOfRegistration = user.TimeOfRegistration;
				userViewModel.TimeOfRegistrationString = user.TimeOfRegistration.ToString();
				userViewModel.AmountOfSolvedQuizzes = user.AmountOfSolvedQuizzes;
				userViewModel.AmountOfCreatedQuizzes = user.AmountOfCreatedQuizzes;
				userViewModel.Quizzes = quizViewModelArray;
				return Ok(userViewModel);
			}
			return NotFound("Nie znaleziono użytkownika");
		}
	}
}
