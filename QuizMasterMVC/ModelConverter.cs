using QuizMasterMVC.Models;
using QuizMasterMVC.Models.DatabaseModels;
using QuizMasterMVC.Models.ViewModels;

namespace QuizMasterMVC
{
    public static class ModelConverter
    {
        public static QuizViewModel QuizToQuizViewModel(Quiz quiz)
        {
            List<QuestionViewModel> questionViewModels = new List<QuestionViewModel>();
            if(quiz.Questions != null)
            {
				foreach (var question in quiz.Questions)
				{
					questionViewModels.Add(QuestionToQuestionViewModel(question));
				}
			}
            QuizViewModel quizViewModel = new QuizViewModel { Id = quiz.QuizID, Questions = questionViewModels, Title = quiz.Title };
            return quizViewModel;
        }
        private static QuestionViewModel QuestionToQuestionViewModel(Question question)
        {
            List<AnswerViewModel> answersViewModel = new List<AnswerViewModel>();
            if(question.Answers != null)
            {
				foreach (var answer in question.Answers)
				{
					answersViewModel.Add(AnswerToAnswerViewModel(answer));
				}
			}
            QuestionViewModel questionViewModel = new QuestionViewModel { Id = question.QuestionID, Answers = answersViewModel, Content = question.Content };
            return questionViewModel;
        }
        private static AnswerViewModel AnswerToAnswerViewModel(Answer answer)
        {
            AnswerViewModel answerViewModel = new AnswerViewModel { Id = answer.AnswerId, AnswerText = answer.Content };
            return answerViewModel;
        }
    }
}
