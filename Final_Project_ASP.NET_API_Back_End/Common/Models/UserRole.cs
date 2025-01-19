using System.ComponentModel.DataAnnotations;
using Common.Models;
using Data_Access_Layer_ASP.NET_Core.Models;

public class UserRole
{
    // Foreign key to Role entity
    [Required]
    public int RoleId { get; set; }




    // Navigation property to Role entity
    public Role Role { get; set; } = null!; // Non-nullable, must be initialized or set




    // Foreign key to AppUser entity
    [Required]
    public int UserId { get; set; }

    // Navigation property to AppUser entity


    public AppUser User { get; set; } = null!; // Non-nullable, must be initialized or set
}
