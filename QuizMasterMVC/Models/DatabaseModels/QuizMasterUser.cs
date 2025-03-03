using Microsoft.AspNetCore.Identity;

namespace QuizMasterMVC.Models.DatabaseModels
{
    public class QuizMasterUser : IdentityUser
    {
        public DateTime TimeOfRegistration { get; set; }
        public int AmountOfSolvedQuizzes { get; set; }
        public int AmountOfCreatedQuizzes { get; set; }
        public List<Quiz> Quizzes { get; set; }
    }
}
