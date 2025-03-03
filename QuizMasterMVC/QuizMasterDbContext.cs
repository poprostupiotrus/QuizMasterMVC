using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizMasterMVC.Models;
using QuizMasterMVC.Models.DatabaseModels;

namespace QuizMasterMVC
{
    public class QuizMasterDbContext : IdentityDbContext<QuizMasterUser>
    {
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public QuizMasterDbContext(DbContextOptions<QuizMasterDbContext> options) : base(options) {}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>()
            .HasOne(q => q.Quiz)
            .WithMany(q => q.Questions)
            .HasForeignKey(q => q.QuizID);
            base.OnModelCreating(modelBuilder);
        }
    }
}
