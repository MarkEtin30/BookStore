using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Data_Access_Layer_ASP.NET_Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Final_Project_ASP.NET_API_Back_End.Services
{
    public class JwtSecurityService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;

        public JwtSecurityService(IConfiguration configuration, UserManager<AppUser> userManager)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        public async Task<string> CreateToken(AppUser user)
        {
            IConfigurationSection jwtSettings = _configuration.GetSection("JwtSettings");

            string secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("Secret key must be set in app settings");

            // Define standard claims
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) // Add userId as a claim
            };

            // Add role claims if the user is an admin
            bool isAdmin = await _userManager.IsInRoleAsync(user, "admin");
            if (isAdmin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            }



            // Add role claims if the user is an admin
            bool isUser = await _userManager.IsInRoleAsync(user, "user");
            if (isUser)
            {
                claims.Add(new Claim(ClaimTypes.Role, "user"));
            }





            // Generate signing credentials
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            // Create JWT token
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(1),
                claims: claims,
                signingCredentials: credentials
            );

            // Return the token as a string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
