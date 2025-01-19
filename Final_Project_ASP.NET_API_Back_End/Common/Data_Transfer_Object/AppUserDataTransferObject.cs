using System.ComponentModel.DataAnnotations;

namespace Common.Data_Transfer_Object
{
    public class AppUserDataTransferObject
    {
        // The unique identifier for the user
        public int Id { get; set; }

        // The username of the user, required and with a max length
        [Required]
        [MaxLength(50, ErrorMessage = "Username cannot exceed 50 characters.")]
        public required string Username { get; set; }

        // The email address of the user, required and validated for proper email format
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        [MaxLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        public required string Email { get; set; }

        // The user's phone number, optional with validation if provided
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string? PhoneNumber { get; set; }

        // The URL of the user's profile image, optional
        public string? ImageUrl { get; set; }

        // List of orders associated with the user, optional
        // JsonIgnore can be used if we don't want to serialize this property in some scenarios (commented out for now)
        public List<OrderDataTransferObject>? Orders { get; set; } = new List<OrderDataTransferObject>();

        /*
         * This DTO class represents user information for data transfer, 
         * including their username, email, phone, profile image URL, and associated orders.
         * The Orders property holds a list of OrderDataTransferObject, representing the user's orders.
         */
    }
}
