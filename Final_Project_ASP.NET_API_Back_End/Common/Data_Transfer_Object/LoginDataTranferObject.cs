using System.ComponentModel.DataAnnotations;

namespace Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object
{
    public class LoginDataTranferObject
    {

        [Required]
        [EmailAddress]
        [MinLength(2), MaxLength(20)]
        public required string Email { get; set; }



        [Required]
        [DataType(DataType.Password)]
        [MinLength(2), MaxLength(20)]
        public required string Password { get; set; }

    }
}

