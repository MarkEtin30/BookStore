using System.ComponentModel.DataAnnotations;

namespace Common.Data_Transfer_Object
{
    public class OrderDataTransferObject
    {
        // Order Identifier
        [Key] // Ensures this is treated as the primary key for the order
        public int OrderId { get; set; }

        // User Information (nullable for anonymous users)
        [Range(0, int.MaxValue, ErrorMessage = "UserId must be a positive integer or 0.")]
        public int? UserId { get; set; }

        // Date when the order was created
        [Required(ErrorMessage = "OrderDate is required.")]
        public DateTime OrderDate { get; set; }

        // Total order amount (should be a positive value)
        [Range(0.01, double.MaxValue, ErrorMessage = "TotalAmount must be greater than 0.")]
        public decimal TotalAmount { get; set; }

        // Current status of the order, default is "pending"
        [StringLength(50, ErrorMessage = "Status length cannot exceed 50 characters.")]
        public string Status { get; set; } = "pending";

        // Shipping Address (nullable for anonymous users)
        [StringLength(255, ErrorMessage = "ShippingAddress cannot exceed 255 characters.")]
        public string? ShippingAddress { get; set; }


        // List of order items associated with the order
        [MinLength(1, ErrorMessage = "An order must have at least one item.")]
        public ICollection<OrderItemDataTransferObject> OrderItems { get; set; } = new List<OrderItemDataTransferObject>();






        [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters.")]
        public string? Email { get; set; } = "aa";   // Email for anonymous users



        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string? Name { get; set; } = "";   // Name for anonymous users

        [StringLength(20, ErrorMessage = "Phone number cannot exceed 20 characters.")]
        public string? Phone { get; set; } = "";  // Phone for anonymous users
    }
}
