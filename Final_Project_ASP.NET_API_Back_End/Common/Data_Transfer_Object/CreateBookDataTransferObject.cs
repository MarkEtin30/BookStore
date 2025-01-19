using System.ComponentModel.DataAnnotations;
using Data_Access_Layer_ASP.NET_Core.Models;

namespace Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object
{
    public class CreateBookDataTransferObject
    {
        // The unique identifier for the book, typically used when updating a book
        public int Id { get; set; }

        // Title of the book, required with a length limit
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(255, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 255 characters.")]
        public string Title { get; set; }

        // Description of the book, required with a length limit
        [Required(ErrorMessage = "Description is required.")]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Description must be between 1 and 1000 characters.")]
        public string Description { get; set; }

        // Language of the book, required with a length limit
        [Required(ErrorMessage = "Language is required.")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Language must be between 1 and 50 characters.")]
        public string Language { get; set; }

        // Price of the book, required, must be greater than 0
        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        // URL of the book's image, required
        [Required(ErrorMessage = "Image URL is required.")]
        [Url(ErrorMessage = "Invalid URL format.")]
        public string ImageUrl { get; set; }

        // Author of the book, optional
        public string Author { get; set; }

        // Publisher of the book, optional
        public string Publisher { get; set; }

        // Publication date of the book, required
        [Required(ErrorMessage = "Publication date is required.")]
        public DateTime PublicationDate { get; set; }

        // List of categories the book belongs to, using category IDs
        [Required(ErrorMessage = "At least one category is required.")]
        public List<int> Categories { get; set; } = new List<int>();

        /*
         * This DTO is used for creating a new book.
         * It includes fields such as the title, description, language, price, and more.
         * Categories are passed as a list of category IDs, representing the book's association.
         */
    }

    public static class CreateBookDataAccessProductExtension
    {
        // Extension method to map CreateBookDataTransferObject to Book entity
        public static Book ToBook(this CreateBookDataTransferObject createBookDto)
        {
            return new Book
            {
                Id = createBookDto.Id,
                Title = createBookDto.Title,
                Description = createBookDto.Description,
                Price = createBookDto.Price,
                Language = createBookDto.Language,
                ImageUrl = createBookDto.ImageUrl,
                Author = createBookDto.Author,
                Publisher = createBookDto.Publisher,
                PublicationDate = createBookDto.PublicationDate,
                // Assuming BookCategory association will be handled later in the business logic
            };
        }
    }
}
