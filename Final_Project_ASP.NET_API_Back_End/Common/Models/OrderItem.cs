using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Data_Access_Layer_ASP.NET_Core.Models;

namespace Common.Models
{
    public class OrderItem
    {
        // Primary key for the OrderItem entity
        public int OrderItemId { get; set; }

        // Foreign key to Order entity

        public int OrderId { get; set; }





        // Foreign key to Book entity
        [Required]
        public required int BookId { get; set; }






        // Quantity of the book purchased
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public required int Quantity { get; set; }






        // Price of the book at the time of purchase
        [Required]
        [Column(TypeName = "money")]
        [Range(0.01, 100000, ErrorMessage = "Price must be between 0.01 and 100,000.")]
        public required decimal PriceAtTimeOfPurchase { get; set; }








        // Navigation property to the associated Order entity
        [JsonIgnore]
        public Order? Order { get; set; }  // check if ? is ok????????????????





        // Navigation property to the associated Book entity
        [JsonIgnore]
        public virtual Book? Book { get; set; }

        /*
         * The "PriceAtTimeOfPurchase" property stores the price of the book
         * at the time of the purchase. This ensures that changes to the book's
         * price do not affect historical order data.
         */
    }
}
