using QuizMasterMVC.Models.DatabaseModels;
using QuizMasterMVC.Models.ViewModels;
namespace QuizMasterMVC.Services.Interfaces
{
    public interface IQuizService
    {
        public Task<List<Quiz>> GetAllQuizzesAsync();
        public Task<Quiz> GetQuizByIdAsync(int id);
        public Task<Quiz> CreateQuizAsync(QuizViewModel quizViewModel, QuizMasterUser user);
        public Task<bool> DeleteQuizAsync(int quizId);
        public Task<List<Quiz>> GetQuizBySearchTerm(string term, int pageNumber);
        public Task<List<Quiz>> GetLatestQuizzes();

        public Task<List<Quiz>> GetQuizArrayByUserId(string userId);

	}
}
