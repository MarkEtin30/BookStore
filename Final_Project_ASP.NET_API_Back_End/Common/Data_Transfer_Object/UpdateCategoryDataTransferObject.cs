using System.ComponentModel.DataAnnotations;

namespace Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object
{
    public class UpdateCategoryDataTransferObject
    {
        // The Id of the category to be updated
        [Required(ErrorMessage = "Category Id is required.")]
        public int Id { get; set; }

        // Name of the category, required field
        [Required(ErrorMessage = "Category Name is required.")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Category Name must be between 1 and 100 characters.")]
        public string Name { get; set; }
    }
}
