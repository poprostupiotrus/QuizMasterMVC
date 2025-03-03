using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMasterMVC.Models.DatabaseModels;
using QuizMasterMVC.Models.ViewModels;
using QuizMasterMVC.Services.Interfaces;
using System.Security.Claims;

namespace QuizMasterMVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizzesController : ControllerBase
    {
        private readonly IQuizService _quizService;
        private readonly UserManager<QuizMasterUser> _userManager;
        private readonly IQuizResultService _quizResultService;
        public QuizzesController(IQuizService quizService, UserManager<QuizMasterUser> userManager, IQuizResultService quizResultService)
        {
            _userManager = userManager;
            _quizService = quizService;
            _quizResultService = quizResultService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizViewModel>>> GetAll()
        {
            List<Quiz> quizzes = await _quizService.GetAllQuizzesAsync();
            List<QuizViewModel> quizzesViewModels = new List<QuizViewModel>();
            foreach(var quiz in quizzes)
            {
                quizzesViewModels.Add(ModelConverter.QuizToQuizViewModel(quiz));
            }
            return Ok(quizzesViewModels);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> GetById(int id)
        {
            Quiz quiz = await _quizService.GetQuizByIdAsync(id);
            QuizViewModel quizViewModel = ModelConverter.QuizToQuizViewModel(quiz);
            return Ok(quizViewModel);
        }
		[HttpPost("score")]
        public async Task<ActionResult> CalculateScore([FromBody] List<UserAnswerViewModel> answers)
        {
            int score = await _quizResultService.CalculateScore(answers);
            return Ok(new { Score = score });
        }
        [HttpGet("search/{term}")]
        public async Task<ActionResult<IEnumerable<QuizViewModel>>> SearchByTerm(string term, int pageNumber = 1)
        {
            List<Quiz> quizzes = await _quizService.GetQuizBySearchTerm(term, pageNumber);
            List<QuizViewModel> quizViewModels = new List<QuizViewModel>();
            foreach(var quiz in quizzes)
            {
                quizViewModels.Add(ModelConverter.QuizToQuizViewModel(quiz));
            }
            return Ok(quizViewModels);
        }
        [HttpGet("latest")]
        public async Task<ActionResult<IEnumerable<QuizViewModel>>> GetLatestQuizzes()
        {
            List<Quiz> quizzes = await _quizService.GetLatestQuizzes();
			List<QuizViewModel> quizViewModels = new List<QuizViewModel>();
			foreach (var quiz in quizzes)
			{
				quizViewModels.Add(ModelConverter.QuizToQuizViewModel(quiz));
			}
            return Ok(quizViewModels);
		}
	}
}
