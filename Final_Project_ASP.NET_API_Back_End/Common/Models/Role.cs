using Microsoft.AspNetCore.Identity;

namespace Common.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();  // Navigation property for many-to-many
    }
}
