using Common.Data_Transfer_Object;

namespace Data_Access_Layer_ASP.NET_Core.Data
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task<Order> AddOrderAsync(OrderDataTransferObject order);
        Task UpdateOrderAsync(int id, OrderDataTransferObject orderDTO);
        Task DeleteOrderAsync(int id);
    }
}
