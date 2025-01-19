using System.ComponentModel.DataAnnotations;

namespace Common.Data_Transfer_Object
{
    public class OrderItemDataTransferObject
    {
        // Foreign Key to Order (implicitly added when creating an order)
        [Required(ErrorMessage = "OrderId is required.")]
        public int OrderId { get; set; }

        // Foreign Key to Book
        [Required(ErrorMessage = "BookId is required.")]
        public int BookId { get; set; }

        // Quantity of the ordered book (must be positive)
        [Required(ErrorMessage = "Quantity is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than 0.")]
        public int Quantity { get; set; }

        // Price at the time of purchase (should not be negative)
        [Required(ErrorMessage = "PriceAtTimeOfPurchase is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal PriceAtTimeOfPurchase { get; set; }
    }
}
