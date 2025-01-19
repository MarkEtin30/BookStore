using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Data_Access_Layer_ASP.NET_Core.Models
{
    public class AppUser : IdentityUser<int>
    {
        // Navigation property to Orders (One-to-Many relationship)
        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<UserRole> UserRoles { get; set; }  // Navigation property for many-to-many roles



        // New ImageUrl property to store the profile image URL
        public string? ImageUrl { get; set; } = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";

    }

    public static class UserManagerExtensions
    {
        public static ClaimsPrincipal ValidateToken(this UserManager<AppUser> userManager, string token, string signingKey)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(signingKey);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false, // Set to true and configure Issuer if necessary
                    ValidateAudience = false // Set to true and configure Audience if necessary
                }, out var validatedToken);

                return principal;
            }
            catch
            {
                return null; // Token validation failed
            }
        }
    }
}
