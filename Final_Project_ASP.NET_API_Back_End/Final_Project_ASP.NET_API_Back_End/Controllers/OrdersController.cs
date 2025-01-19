using Common.Data_Transfer_Object;
using Data_Access_Layer_ASP.NET_Core.Data;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly IOrderRepository _orderRepository;

    public OrdersController(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    // GET: api/orders
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        var orders = await _orderRepository.GetAllOrdersAsync();
        return Ok(orders);
    }

    // GET: api/orders/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _orderRepository.GetOrderByIdAsync(id);
        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }




    // POST: api/orders
    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder([FromBody] OrderDataTransferObject orderDTO)
    {


        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }





        // If userId is 0 (anonymous order), validate email, name, and phone
        if (orderDTO.UserId == 0)
        {
            if (string.IsNullOrEmpty(orderDTO.Email) ||
                string.IsNullOrEmpty(orderDTO.Name) ||
                string.IsNullOrEmpty(orderDTO.Phone))
            {
                return BadRequest("Email, Name, and Phone are required for anonymous orders.");
            }
        }

        // Proceed to create the order
        var createdOrder = await _orderRepository.AddOrderAsync(orderDTO);

        return CreatedAtAction(nameof(GetOrder), new { id = createdOrder.OrderId }, createdOrder);
    }




    // PUT: api/orders/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderDataTransferObject orderDTO)
    {


        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }




        if (id != orderDTO.OrderId)
        {
            return BadRequest("Order ID mismatch");
        }

        var existingOrder = await _orderRepository.GetOrderByIdAsync(id);
        if (existingOrder == null)
        {
            return NotFound();
        }

        try
        {
            await _orderRepository.UpdateOrderAsync(id, orderDTO);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // DELETE: api/orders/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var existingOrder = await _orderRepository.GetOrderByIdAsync(id);
        if (existingOrder == null)
        {
            return NotFound();
        }

        try
        {
            await _orderRepository.DeleteOrderAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
