using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Data_Access_Layer_ASP.NET_Core.Models
{
    public class Book
    {
        // Primary key for the Book entity
        public int Id { get; set; }



        // The title of the book, required and with a maximum length constraint
        [Required]
        [MaxLength(200)]
        public required string Title { get; set; }





        // A brief description of the book, required
        [Required]
        [MaxLength(1000)]
        public required string Description { get; set; }




        // The language the book is written in, required
        [Required]
        [MaxLength(50)]
        public required string Language { get; set; }






        // The price of the book, stored as a money type in the database
        [Required]
        [Column(TypeName = "money")]
        [Range(0.01, 10000, ErrorMessage = "Price must be between 0.01 and 10,000.")]
        public required decimal Price { get; set; }



        // The URL for the book's cover image, required and with a max length constraint
        [Required]
        [MaxLength(500)]
        public required string ImageUrl { get; set; }




        // The name of the book's author, required
        [Required]
        [MaxLength(100)]
        public required string Author { get; set; }




        // The name of the publisher, required
        [Required]
        [MaxLength(100)]
        public required string Publisher { get; set; }




        // The date the book was published, required
        [Required]
        [DataType(DataType.Date)]
        public required DateTime PublicationDate { get; set; }




        // Navigation property for the many-to-many relationship via BookCategory
        // This property is ignored during JSON serialization to prevent circular references
        [JsonIgnore]
        public ICollection<BookCategory> BookCategories { get; set; } = new List<BookCategory>();
    }
}
