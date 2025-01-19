using System.Text;
using Data_Access_Layer_ASP.NET_Core.Data;
using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Final_Project_ASP.NET_API_Back_End
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Set up the builder for the application
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            // Configure DbContext with SQL Server connection string from appsettings.json
            builder.Services.AddDbContext<Data_Access_Layer_ASPNET_CoreContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("Data_Access_Layer_ASPNET_CoreContext")
                                     ?? throw new InvalidOperationException("Connection string 'Data_Access_Layer_ASPNET_CoreContext' not found.")));

            // Register repositories (Add Scoped for DI)
            builder.Services.AddScoped<IBookRepository, BookRepository>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

            builder.Services.AddScoped<IOrderRepository, OrderRepository>();
            builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();

            // Set up Identity (User Authentication) using AppUser class and IdentityRole for roles
            builder.Services.AddIdentity<AppUser, IdentityRole<int>>()
                .AddEntityFrameworkStores<Data_Access_Layer_ASPNET_CoreContext>()
                .AddDefaultTokenProviders();

            // Set up JWT Authentication
            IConfigurationSection jwtSettings = builder.Configuration.GetSection("JwtSettings");

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"])),
                };
            });

            // Add JWT security service
            builder.Services.AddScoped<JwtSecurityService>();

            // CORS policy setup to allow specific origins (for React frontend)
            string corsPolicy = "CorsPolicy";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: corsPolicy, policy =>
                {
                    policy.WithOrigins(
                            "http://localhost:3000",
                            "http://localhost:5173",
                            "http://localhost:5174"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            // Add controllers to the DI container
            builder.Services.AddControllers();

            // Set up Swagger for API documentation
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });






            // Build the application
            WebApplication app = builder.Build();

            // Apply CORS policy
            app.UseCors(corsPolicy);

            // Configure the HTTP request pipeline for Swagger and other middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Enable Authentication and Authorization middleware
            app.UseAuthentication();
            app.UseAuthorization();





            // Map controllers to the API endpoints
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}
