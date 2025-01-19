using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Data_Access_Layer_ASP.NET_Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Final_Project_ASP.NET_API_Back_End.Services
{
    public class JwtSecurityService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;

        // Constructor to inject dependencies
        public JwtSecurityService(IConfiguration configuration, UserManager<AppUser> userManager)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        // Method to create JWT token
        public async Task<string> CreateToken(AppUser user)
        {
            // Retrieve JWT settings from configuration
            IConfigurationSection jwtSettings = _configuration.GetSection("JwtSettings");

            string secretKey = jwtSettings["SecretKey"] ?? throw new Exception("Secret key must be set in app settings");

            // Prepare claims to be added to the JWT token
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            // Check if user is an admin and add role claim if necessary
            bool isAdmin = await _userManager.IsInRoleAsync(user, "admin");
            if (isAdmin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            }

            // Create a symmetric security key using the secret key from configuration
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            // Create signing credentials with the symmetric key and algorithm
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Create the JWT token with specified claims and signing credentials
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddHours(1), // Shorter expiration for better security
                claims: claims,
                signingCredentials: credentials
            );

            // Return the token as a string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
