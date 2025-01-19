using System.ComponentModel.DataAnnotations;
using Data_Access_Layer_ASP.NET_Core.Models;

namespace Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object
{
    public class RegisterDataTransferObject
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }


        [Required]
        [MinLength(2), MaxLength(20)]
        public required string Username { get; set; }



        [Required]
        [DataType(DataType.Password)]
        [MinLength(2), MaxLength(20)]
        public required string Password { get; set; }

    }


    public static class RegisterDtoExtensions
    {
        public static AppUser ToUser(this RegisterDataTransferObject registerDataTransferObject1)
        {
            return new AppUser()
            {
                Email = registerDataTransferObject1.Email,
                UserName = registerDataTransferObject1.Username
            };
        }
    }
}
