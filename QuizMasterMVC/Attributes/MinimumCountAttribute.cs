using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace QuizMasterMVC.Attributes
{
    public class MinimumCountAttribute : ValidationAttribute
    {
        private readonly int _minCount;

        public MinimumCountAttribute(int minCount)
        {
            _minCount = minCount;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var list = value as IList;

            if (list != null && list.Count >= _minCount)
            {
                return ValidationResult.Success;
            }

            return new ValidationResult($"The list must contain at least {_minCount} items.");
        }
    }
}
