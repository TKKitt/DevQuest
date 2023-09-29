using System.Text;
using DevQuest.API.Migrations;
using DevQuest.API.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSqlite<DataDbContext>("Datasource=DevQuest.db");
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

var secretKey = Encoding.UTF8.GetBytes(builder.Configuration["TokenSecret"]);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = true;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
    {
        IssuerSigningKey = new SymmetricSecurityKey(secretKey),
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateLifetime = true,
        RequireExpirationTime = false,
        ClockSkew = TimeSpan.Zero,
        ValidateIssuerSigningKey = true
    };
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
    .WithOrigins("http://localhost:4200")
    .AllowAnyHeader()
    .AllowAnyMethod());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
