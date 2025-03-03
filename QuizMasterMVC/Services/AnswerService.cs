using Microsoft.EntityFrameworkCore;
using QuizMasterMVC.Models;
using QuizMasterMVC.Services.Interfaces;

namespace QuizMasterMVC.Services
{
	public class AnswerService : IAnswerService
	{
		private readonly QuizMasterDbContext _context;
		public AnswerService(QuizMasterDbContext context)
		{
			_context = context;
		}

		public async Task<List<Answer>> GetAnswers()
		{
			return await _context.Answers.ToListAsync();
		}
	}
}
