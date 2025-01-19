using System.ComponentModel.DataAnnotations;

namespace Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object
{
    public class BookWithCategoriesDataTransferObject
    {
        // The unique identifier for the book
        public int Id { get; set; }

        // The title of the book, required and with a max length
        [Required]
        [MaxLength(255, ErrorMessage = "Title cannot exceed 255 characters.")]
        public string Title { get; set; }

        // The description of the book, required
        [Required]
        public string Description { get; set; }

        // The language in which the book is written, required
        [Required]
        [MaxLength(50, ErrorMessage = "Language cannot exceed 50 characters.")]
        public string Language { get; set; }

        // The price of the book, required, must be a positive value
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        // URL for the book's image, optional but validated for URL format
        [Url(ErrorMessage = "Invalid URL format.")]
        public string ImageUrl { get; set; }

        // Author details, required
        [Required]
        [MaxLength(100, ErrorMessage = "Author name cannot exceed 100 characters.")]
        public string Author { get; set; }

        // Publisher details, required
        [Required]
        [MaxLength(100, ErrorMessage = "Publisher name cannot exceed 100 characters.")]
        public string Publisher { get; set; }

        // Publication date, required
        [Required]
        public DateTime PublicationDate { get; set; }

        // A detailed list of categories associated with the book, optional
        public List<CategoryDataTransferObject> Categories { get; set; } = new List<CategoryDataTransferObject>();

        /*
         * This DTO represents a book with its details (title, description, author, etc.)
         * and includes a list of categories that the book belongs to.
         */
    }
}
