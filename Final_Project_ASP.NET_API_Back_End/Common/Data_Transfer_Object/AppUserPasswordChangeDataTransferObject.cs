using System.ComponentModel.DataAnnotations;

namespace Common.Data_Transfer_Object
{
    public class AppUserPasswordChangeDataTransferObject
    {

        public string UserId { get; set; }



        [Required]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }




        [Required]
        [MinLength(8)]
        [MaxLength(20)]
        [DataType(DataType.Password)] // has been changed!!!!!!!!!!!
        public string NewPassword { get; set; }
    }
}
