using System.ComponentModel.DataAnnotations;

namespace Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object
{
    public class UpdateBookDataTransferObject
    {
        // Id of the book to be updated
        [Required(ErrorMessage = "Book Id is required.")]
        public int Id { get; set; }

        // Title of the book
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 200 characters.")]
        public string Title { get; set; }

        // Description of the book
        [Required(ErrorMessage = "Description is required.")]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Description must be between 1 and 1000 characters.")]
        public string Description { get; set; }

        // Language in which the book is written
        [Required(ErrorMessage = "Language is required.")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Language must be between 1 and 50 characters.")]
        public string Language { get; set; }

        // Price of the book
        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        // Image URL for the book
        [Required(ErrorMessage = "Image URL is required.")]
        [Url(ErrorMessage = "Please provide a valid URL for the Image.")]
        public string ImageUrl { get; set; }

        // List of CategoryIds associated with the book
        public List<int> CategoryIds { get; set; } = new List<int>(); // Defaulting to an empty list
    }
}
