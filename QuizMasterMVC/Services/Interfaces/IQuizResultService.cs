using QuizMasterMVC.Models.ViewModels;

namespace QuizMasterMVC.Services.Interfaces
{
	public interface IQuizResultService
	{
		public Task<int> CalculateScore(List<UserAnswerViewModel> answers);
	}
}
