using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizMasterMVC.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatorToQuiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuizMasterUserId",
                table: "Quizzes",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_QuizMasterUserId",
                table: "Quizzes",
                column: "QuizMasterUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_AspNetUsers_QuizMasterUserId",
                table: "Quizzes",
                column: "QuizMasterUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_AspNetUsers_QuizMasterUserId",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_QuizMasterUserId",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "QuizMasterUserId",
                table: "Quizzes");
        }
    }
}
