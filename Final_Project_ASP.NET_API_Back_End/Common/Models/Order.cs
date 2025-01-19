using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Common.Models;
using Data_Access_Layer_ASP.NET_Core.Models;

public class Order
{
    // Primary key for the Order entity
    public int OrderId { get; set; }

    // Foreign key to User entity, nullable to support anonymous orders
    public int? UserId { get; set; }




    // The date the order was placed
    [Required]
    [DataType(DataType.DateTime)]
    public required DateTime OrderDate { get; set; }




    // The total amount for the order
    [Required]
    [Column(TypeName = "money")]
    [Range(0.01, 100000, ErrorMessage = "Total amount must be between 0.01 and 100,000.")]
    public required decimal TotalAmount { get; set; }




    // The current status of the order, defaulting to "pending"
    [MaxLength(50)]
    public string Status { get; set; } = "pending";





    // Shipping address for the order
    [MaxLength(500)]
    public string? ShippingAddress { get; set; }





    // Navigation property to the associated User entity
    [JsonIgnore]
    public AppUser? User { get; set; }




    // Navigation property to the collection of OrderItems
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();





    // Contact details for anonymous users
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    [MaxLength(100)]
    public string? Email { get; set; } // Email for anonymous users





    [MaxLength(100)]
    public string? Name { get; set; }  // Name for anonymous users




    [Phone(ErrorMessage = "Invalid phone number format.")]
    [MaxLength(15)]
    public string? Phone { get; set; } // Phone for anonymous users
}
