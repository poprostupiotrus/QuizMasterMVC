using QuizMasterMVC.Models.DatabaseModels;

namespace QuizMasterMVC.Models.ViewModels
{
	public class QuizMasterUserViewModel
	{
		public string UserName { get; set; }
		public DateTime TimeOfRegistration { get; set; }
		public string TimeOfRegistrationString { get; set; }
		public int AmountOfSolvedQuizzes { get; set; }
		public int AmountOfCreatedQuizzes { get; set; }
		public List<QuizViewModel> Quizzes { get; set; }
	}
}
