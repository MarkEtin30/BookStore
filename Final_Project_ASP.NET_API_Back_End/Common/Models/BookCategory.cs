using System.ComponentModel.DataAnnotations;

namespace Data_Access_Layer_ASP.NET_Core.Models
{
    public class BookCategory
    {
        // Foreign key for the Book entity
        [Required]
        public int BookId { get; set; }



        // Navigation property for the related Book entity
        [Required]
        public Book Book { get; set; }



        // Foreign key for the Category entity
        [Required]
        public int CategoryId { get; set; }



        // Navigation property for the related Category entity
        [Required]
        public Category Category { get; set; }
    }
}
