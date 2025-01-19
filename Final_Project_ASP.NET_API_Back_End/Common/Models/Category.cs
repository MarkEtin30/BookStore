using System.ComponentModel.DataAnnotations;

namespace Data_Access_Layer_ASP.NET_Core.Models
{
    public class Category
    {
        // Primary key for the Category entity
        public int Id { get; set; }

        // The name of the category, required with a maximum length constraint
        [Required]
        [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public required string Name { get; set; }

        // Navigation property for the many-to-many relationship via BookCategory
        // This establishes the link between categories and books
        public ICollection<BookCategory> BookCategories { get; set; } = new List<BookCategory>();
    }
}
