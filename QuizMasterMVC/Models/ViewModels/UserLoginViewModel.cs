using System.ComponentModel.DataAnnotations;

namespace QuizMasterMVC.Models.ViewModels
{
    public class UserLoginViewModel
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana.")]
        [StringLength(32, MinimumLength = 3)]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Hasło jest wymagane.")]
        [DataType(DataType.Password)]
        [StringLength(255)]
        public string Password { get; set; }
    }
}
