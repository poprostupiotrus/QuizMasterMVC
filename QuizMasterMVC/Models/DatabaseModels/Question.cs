using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace QuizMasterMVC.Models.DatabaseModels
{
    public class Question
    {
        public int QuestionID { get; set; }
        public string Content { get; set; }
        public int QuizID { get; set; }
        [JsonIgnore]
        public Quiz Quiz { get; set; }

        public List<Answer> Answers { get; set; }
    }
}
