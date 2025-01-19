using Common.Data_Transfer_Object;
using Common.Models;
using Data_Access_Layer_ASP.NET_Core.Data;
using Microsoft.EntityFrameworkCore;

public class OrderRepository : IOrderRepository
{
    private readonly Data_Access_Layer_ASPNET_CoreContext _context;

    public OrderRepository(Data_Access_Layer_ASPNET_CoreContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Order>> GetAllOrdersAsync()
    {
        // Eagerly load OrderItems to avoid null values
        return await _context.Orders
            .Include(order => order.OrderItems) // Ensure OrderItems is included in the result
            .ToListAsync();
    }


    public async Task<Order> GetOrderByIdAsync(int id)
    {
        // Eagerly load OrderItems to avoid null values
        return await _context.Orders
            .Include(order => order.OrderItems) // Ensure OrderItems is included
            .FirstOrDefaultAsync(order => order.OrderId == id); // Use FirstOrDefaultAsync for retrieving by ID
    }



    public async Task<Order> AddOrderAsync(OrderDataTransferObject orderDTO)
    {
        // Map DTO to entity model
        var order = new Order
        {
            // Check if the user is authenticated or anonymous
            UserId = orderDTO.UserId == 0 ? null : orderDTO.UserId, // Set UserId to null for anonymous users
            Email = orderDTO.UserId == 0 ? orderDTO.Email : null,   // Set Email for anonymous users
            Name = orderDTO.UserId == 0 ? orderDTO.Name : null,     // Set Name for anonymous users
            Phone = orderDTO.UserId == 0 ? orderDTO.Phone : null,   // Set Phone for anonymous users
            OrderDate = orderDTO.OrderDate,
            TotalAmount = orderDTO.TotalAmount,
            ShippingAddress = orderDTO.ShippingAddress,
            OrderItems = orderDTO.OrderItems?.Select(o => new OrderItem
            {
                BookId = o.BookId,
                Quantity = o.Quantity,
                PriceAtTimeOfPurchase = o.PriceAtTimeOfPurchase
            }).ToList() // Map each OrderItemDTO to OrderItem
        };

        // Add the mapped order entity to the context
        _context.Orders.Add(order);

        // Save changes to the database
        await _context.SaveChangesAsync();

        // Return the saved order entity (not the DTO)
        return order;
    }



    public async Task UpdateOrderAsync(int id, OrderDataTransferObject orderDTO)
    {
        // Fetch the existing order from the database
        var existingOrder = await _context.Orders
            .Include(order => order.OrderItems)
            .FirstOrDefaultAsync(order => order.OrderId == id);

        if (existingOrder == null)
        {
            throw new KeyNotFoundException($"Order with ID {id} not found.");
        }

        // Update the existing order with the new details
        existingOrder.UserId = orderDTO.UserId;
        existingOrder.OrderDate = orderDTO.OrderDate;
        existingOrder.TotalAmount = orderDTO.TotalAmount;
        existingOrder.ShippingAddress = orderDTO.ShippingAddress;
        existingOrder.Status = orderDTO.Status;

        // Update OrderItems
        existingOrder.OrderItems.Clear(); // Remove existing items
        if (orderDTO.OrderItems != null)
        {
            foreach (var itemDTO in orderDTO.OrderItems)
            {
                existingOrder.OrderItems.Add(new OrderItem
                {
                    BookId = itemDTO.BookId,
                    Quantity = itemDTO.Quantity,
                    PriceAtTimeOfPurchase = itemDTO.PriceAtTimeOfPurchase
                });
            }
        }

        // Save changes to the database
        await _context.SaveChangesAsync();
    }





    public async Task DeleteOrderAsync(int id)
    {
        // Fetch the existing order from the database
        var existingOrder = await _context.Orders
            .Include(order => order.OrderItems)
            .FirstOrDefaultAsync(order => order.OrderId == id);

        if (existingOrder == null)
        {
            throw new KeyNotFoundException($"Order with ID {id} not found.");
        }

        // Remove the order
        _context.Orders.Remove(existingOrder);

        // Save changes to the database
        await _context.SaveChangesAsync();
    }





}
