using System.ComponentModel.DataAnnotations;
using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object;

namespace Common.Data_Transfer_Object // Updated namespace
{
    public class BookDataTransferObject
    {
        // Unique identifier for the book
        public int Id { get; set; }

        // Title of the book
        [Required]
        [MaxLength(255, ErrorMessage = "Title cannot exceed 255 characters.")]
        public string Title { get; set; }

        // Description of the book
        [Required]
        public string Description { get; set; }

        // Language of the book
        [Required]
        [MaxLength(50, ErrorMessage = "Language cannot exceed 50 characters.")]
        public string Language { get; set; }

        // Price of the book (should be a decimal to ensure precision)
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        // URL for the book's image
        [Url(ErrorMessage = "Invalid URL format.")]
        public string ImageUrl { get; set; }

        // List of categories associated with the book
        public List<CategoryDataTransferObject> Categories { get; set; } = new List<CategoryDataTransferObject>();

        // Author of the book
        [Required]
        [MaxLength(100, ErrorMessage = "Author name cannot exceed 100 characters.")]
        public string Author { get; set; }

        // Publisher of the book
        [Required]
        [MaxLength(100, ErrorMessage = "Publisher name cannot exceed 100 characters.")]
        public string Publisher { get; set; }

        // Publication date of the book
        [Required]
        public DateTime PublicationDate { get; set; }
    }

    public static class BookExtensions
    {
        // Extension method to transform a Book object into a BookDataTransferObject
        public static BookDataTransferObject TransformBookObjectToBookDataTransferObject(this Book book)
        {
            return new BookDataTransferObject()
            {
                Id = book.Id,
                Title = book.Title,
                Description = book.Description,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                Language = book.Language,
                Author = book.Author,
                Publisher = book.Publisher,
                PublicationDate = book.PublicationDate
            };
        }
    }
}
