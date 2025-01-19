using Common.Data_Transfer_Object;
using Common.Models;

namespace Data_Access_Layer_ASP.NET_Core.Data
{
    public interface IOrderItemRepository
    {
        Task<OrderItem> AddOrderItemAsync(OrderItemDataTransferObject orderItem);
        Task DeleteOrderItemAsync(int id);
        Task<OrderItem> GetOrderItemByIdAsync(int orderItemId);
        Task<IEnumerable<OrderItem>> GetOrderItemsByOrderIdAsync(int orderId);
        Task UpdateOrderItemAsync(int id, OrderItemDataTransferObject orderItem);
    }
}
