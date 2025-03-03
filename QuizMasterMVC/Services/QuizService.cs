using QuizMasterMVC.Models.DatabaseModels;
using QuizMasterMVC.Models.ViewModels;
using QuizMasterMVC.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuizMasterMVC.Models;


namespace QuizMasterMVC.Services
{
    public class QuizService : IQuizService
    {
        private readonly int pageSize = 20;
        private readonly QuizMasterDbContext _context;
        public QuizService(QuizMasterDbContext context)
        {
            _context = context;
        }

        public async Task<Quiz> CreateQuizAsync(QuizViewModel quizViewModel, QuizMasterUser user)
        {
            Quiz quiz = new Quiz { Title = quizViewModel.Title, QuizMasterUser = user , CreationDateTime = DateTime.Now };
            _context.Quizzes.Add(quiz);
            foreach(var questionViewModel in quizViewModel.Questions)
            {
                Question question = new Question { Content = questionViewModel.Content, Quiz = quiz };
                _context.Questions.Add(question);
                foreach(var answerViewModel in questionViewModel.Answers)
                {
                    Answer answer = new Answer { Content = answerViewModel.AnswerText, isCorrect = answerViewModel.IsCorrect, Question = question };
                    _context.Answers.Add(answer);

                }
            }
            _context.SaveChanges();
            return quiz;
        }

        public async Task<bool> DeleteQuizAsync(int quizId)
        {
            Quiz? quiz = _context.Quizzes.FirstOrDefault(quiz => quiz.QuizID == quizId);
            if(quiz != null)
            {
                _context.Quizzes.Remove(quiz);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<List<Quiz>> GetAllQuizzesAsync()
        {
            var quizzes = _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).ToList();
            var questions = _context.Questions.Include(q => q.Quiz).ToList();
            foreach(var question in questions)
            {
                Console.WriteLine(question.QuizID);
            }
            return quizzes;
        }

        public async Task<Quiz> GetQuizByIdAsync(int id)
        {
            return _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).FirstOrDefault(quiz => quiz.QuizID == id);
        }
        public async Task<List<Quiz>> GetQuizBySearchTerm(string term, int pageNumber)
        {
            return await _context.Quizzes
                .OrderBy(q => q.QuizID)
				.Where(quiz => quiz.Title.Contains(term))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Include(q => q.Questions).ToListAsync();
        }
        public async Task<List<Quiz>> GetLatestQuizzes()
        {
			return await _context.Quizzes
	                .OrderByDescending(q => q.CreationDateTime)
                    .Take(pageSize)
					.Include(q => q.Questions).ToListAsync();
		}
		public async Task<List<Quiz>> GetQuizArrayByUserId(string userId)
        {
            return await _context.Quizzes
                .Where(q => q.QuizMasterUserId == userId)
                .Include(q => q.Questions)
                .ToListAsync();
        }

	}
}
