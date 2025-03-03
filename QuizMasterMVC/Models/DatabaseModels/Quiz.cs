using System.ComponentModel.DataAnnotations;

namespace QuizMasterMVC.Models.DatabaseModels
{
    public class Quiz
    {
        public int QuizID { get; set; }
        public string Title { get; set; }
        public DateTime CreationDateTime { get; set; }
		public List<Question> Questions { get; set; }
        public string QuizMasterUserId { get; set; }
        public QuizMasterUser QuizMasterUser { get; set; }
    }
}
