using QuizMasterMVC.Attributes;
using System.ComponentModel.DataAnnotations;

namespace QuizMasterMVC.Models.ViewModels
{
    public class QuestionViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Content { get; set; }
        [MinimumCount(1, ErrorMessage = "Quiz must have at least one question.")]
        public List<AnswerViewModel> Answers { get; set; } = new List<AnswerViewModel>();
    }
}
