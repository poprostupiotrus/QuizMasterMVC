using QuizMasterMVC.Attributes;
using QuizMasterMVC.Models.DatabaseModels;
using System.ComponentModel.DataAnnotations;

namespace QuizMasterMVC.Models.ViewModels
{
    public class QuizViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [MinimumCount(1, ErrorMessage = "Quiz musi mieć conajmniej jedno pytanie")]
        public List<QuestionViewModel> Questions { get; set; } = new List<QuestionViewModel>();
    }
}
