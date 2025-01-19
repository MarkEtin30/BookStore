using System.ComponentModel.DataAnnotations;

namespace Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object
{
    public class CreateCategoryDataTransferObject
    {
        // Category name, required with a length limit
        [Required(ErrorMessage = "Category name is required.")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Category name must be between 1 and 100 characters.")]
        public string Name { get; set; }

        /*
         * This DTO is used to create a new category. The name is required and must be a string 
         * with a length between 1 and 100 characters.
         */
    }
}
