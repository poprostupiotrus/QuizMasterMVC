using System.ComponentModel.DataAnnotations;

namespace QuizMasterMVC.Models.ViewModels
{
    public class AnswerViewModel
    {
        public int Id { get; set; }
        [Required]
        public string AnswerText { get; set; }
        [Required]
        public bool IsCorrect { get; set; }
    }
}
