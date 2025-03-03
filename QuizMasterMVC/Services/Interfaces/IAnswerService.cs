using QuizMasterMVC.Models;

namespace QuizMasterMVC.Services.Interfaces
{
	public interface IAnswerService
	{
		public Task<List<Answer>> GetAnswers();
	}
}
