using QuizMasterMVC.Models.DatabaseModels;
using System.Text.Json.Serialization;

namespace QuizMasterMVC.Models
{
    public class Answer
    {
        public int AnswerId { get; set; }
        public string Content { get; set; }
        public bool isCorrect { get; set; }
        public int QuestionID { get; set; }
        [JsonIgnore]
        public Question Question { get; set; }
    }
}
