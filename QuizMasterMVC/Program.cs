using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuizMasterMVC;
using QuizMasterMVC.Models.DatabaseModels;
using QuizMasterMVC.Services;
using QuizMasterMVC.Services.Interfaces;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAllOrigins", builder =>
	{
		builder.AllowAnyOrigin()
			   .AllowAnyMethod()
			   .AllowAnyHeader();
	});
});
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IQuizService, QuizService>();
builder.Services.AddTransient<IAnswerService, AnswerService>();
builder.Services.AddTransient<IQuizResultService, QuizResultService>();

builder.Services.AddDbContext<QuizMasterDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<QuizMasterUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;

    // Ustawienia dotycz¹ce blokowania
    /*
    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    */
})
.AddEntityFrameworkStores<QuizMasterDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapControllers();

app.Run();
