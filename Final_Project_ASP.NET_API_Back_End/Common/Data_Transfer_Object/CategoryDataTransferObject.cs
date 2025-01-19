using System.ComponentModel.DataAnnotations;

namespace Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object
{
    public class CategoryDataTransferObject
    {
        // Unique identifier for the category
        public int Id { get; set; }

        // Name of the category, required and with a max length
        [Required]
        [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public string Name { get; set; }

        /*
         * This DTO represents a category with an ID and a name.
         * It's used for transferring category data across the application.
         */
    }
}
