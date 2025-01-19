using Common.Data_Transfer_Object;
using Common.Models;
using Data_Access_Layer_ASP.NET_Core.Data;
using Microsoft.AspNetCore.Mvc;

namespace Final_Project_ASP.NET_API_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        private readonly IOrderItemRepository _orderItemRepository;

        public OrderItemsController(IOrderItemRepository orderItemRepository)
        {
            _orderItemRepository = orderItemRepository;
        }

        // GET: api/orderitem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderItems()
        {
            var orderItems = await _orderItemRepository.GetOrderItemsByOrderIdAsync(1);  // Adjust as needed
            return Ok(orderItems);
        }

        // GET: api/orderitem/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItem>> GetOrderItem(int id)
        {
            var orderItem = await _orderItemRepository.GetOrderItemByIdAsync(id);
            if (orderItem == null)
            {
                return NotFound();
            }
            return Ok(orderItem);
        }

        // POST: api/orderitem
        [HttpPost]
        public async Task<ActionResult<OrderItem>> CreateOrderItem([FromBody] OrderItemDataTransferObject orderItem)
        {


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            var createdOrderItem = await _orderItemRepository.AddOrderItemAsync(orderItem);
            return CreatedAtAction(nameof(GetOrderItem), new { id = createdOrderItem.OrderItemId }, createdOrderItem);
        }


        // PUT: api/orderitem/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderItem(int id, [FromBody] OrderItemDataTransferObject orderItem)
        {


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            try
            {
                await _orderItemRepository.UpdateOrderItemAsync(id, orderItem);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

        // DELETE: api/orderitem/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderItem(int id)
        {
            try
            {
                await _orderItemRepository.DeleteOrderItemAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

    }
}
