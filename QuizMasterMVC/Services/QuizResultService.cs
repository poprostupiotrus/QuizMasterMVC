using QuizMasterMVC.Models;
using QuizMasterMVC.Models.ViewModels;
using QuizMasterMVC.Services.Interfaces;

namespace QuizMasterMVC.Services
{
	public class QuizResultService : IQuizResultService
	{
		private readonly IAnswerService _answerService;

		public QuizResultService(IAnswerService answerService)
		{
			_answerService = answerService;
		}
		public async Task<int> CalculateScore(List<UserAnswerViewModel> userAnswers)
		{
			int score = 0;
			var answers = await _answerService.GetAnswers();
			foreach(var userAnswer in userAnswers)
			{
				if(IsUserAnswerCorrect(userAnswer, answers))
				{
					score++;
				}
			}
			return score;
		}
		public bool IsUserAnswerCorrect(UserAnswerViewModel userAnswer, List<Answer> answers)
		{
			foreach(var answer in answers)
			{
				if(answer.AnswerId == userAnswer.AnswerId)
				{
					return answer.isCorrect;
				}
			}
			return false;
		}
	}
}
