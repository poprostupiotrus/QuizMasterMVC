using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMasterMVC.Models.DatabaseModels;
using QuizMasterMVC.Models.ViewModels;
using QuizMasterMVC.Services.Interfaces;
using System.Security.Claims;

namespace QuizMasterMVC.Controllers
{
    public class UserController : Controller
    {
        private readonly UserManager<QuizMasterUser> _userManager;
        private readonly SignInManager<QuizMasterUser> _signInManager;
        private readonly IQuizService _quizService;
        public UserController(UserManager<QuizMasterUser> userManager, SignInManager<QuizMasterUser> signInManager, IQuizService quizService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _quizService = quizService;
        }
        [HttpGet]
		public IActionResult Login()
		{
            if(!User.Identity.IsAuthenticated)
            {
                return View();
            }
            return RedirectToAction("Index", "Home");
		}
        [HttpPost]
        public async Task<IActionResult> Login(UserLoginViewModel userLogin)
        {
            if(!User.Identity.IsAuthenticated)
            {
                if (!ModelState.IsValid)
                {
                    return View(userLogin);
                }
                var result = await _signInManager.PasswordSignInAsync(userLogin.UserName, userLogin.Password, false, false);

                if (!result.Succeeded)
                {
                    ViewBag.ErrorMessage = "Niepoprawne dane logowania.";
                    return View(userLogin);
                }
                Console.WriteLine("Uzytkownik zalogowany");
                return RedirectToAction("Index", "Home");
            }
            return RedirectToAction("Index", "Home");
        }
        [HttpGet]
        public IActionResult Register()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return View();
            }
            return RedirectToAction("Index", "Home");
        }
        [HttpPost]
        public async Task<IActionResult> Register(UserRegisterViewModel userRegister)
        {
            if(!User.Identity.IsAuthenticated)
            {
                if (!ModelState.IsValid)
                {
                    ViewBag.ErrorMessage = "Niepoprawne dane rejestracji.";
                    return View(userRegister);
                }
                QuizMasterUser user = new QuizMasterUser
                {
                    UserName = userRegister.Username,
                    TimeOfRegistration = DateTime.Now,
                    AmountOfCreatedQuizzes = 0,
                    AmountOfSolvedQuizzes = 0
                };
                var result = await _userManager.CreateAsync(user, userRegister.Password);
                if (!result.Succeeded)
                {
                    ViewBag.ErrorMessage = "Niepoprawne dane rejestracji.";
                    return View(userRegister);
                }
                await _signInManager.SignInAsync(user, false);
                return RedirectToAction("Index", "Home");
            }
            return RedirectToAction("Index", "Home");
        }
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction("Index", "Home");
        }
        [Authorize]
        public IActionResult Profile()
        {
            return View();
        }
    }
}
