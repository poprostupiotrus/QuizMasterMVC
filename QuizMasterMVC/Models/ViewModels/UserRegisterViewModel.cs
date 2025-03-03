using System.ComponentModel.DataAnnotations;

namespace QuizMasterMVC.Models.ViewModels
{
    public class UserRegisterViewModel
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana.")]
        [StringLength(32, MinimumLength = 3)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Hasło jest wymagane.")]
        [DataType(DataType.Password)]
        [StringLength(255)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Potwierdzenie hasła jest wymagane.")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Hasła nie są zgodne.")]
        [StringLength(255)]
        public string ConfirmPassword { get; set; }
    }
}
