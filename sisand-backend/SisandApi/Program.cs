using Microsoft.EntityFrameworkCore;
using SisandApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Connection string para SQL Server local (Windows Authentication)
builder.Services.AddDbContext<SisandContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SisandConnection")));

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowAngular");

app.UseAuthorization();
app.MapControllers();


// Middleware
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sisand API v1");
    c.RoutePrefix = string.Empty;
});

app.UseCors("CorsPolicy");
app.MapControllers();

// Garantir criação do banco e tabelas
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SisandContext>();
    db.Database.EnsureCreated();
}

app.Run();
