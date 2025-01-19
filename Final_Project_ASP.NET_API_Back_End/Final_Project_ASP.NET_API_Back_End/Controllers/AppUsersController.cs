using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Common.Data_Transfer_Object;
using Data_Access_Layer_ASP.NET_Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Final_Project_ASP.NET_API_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUsersController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole<int>> _roleManager;


        public AppUsersController(UserManager<AppUser> userManager, IConfiguration configuration, RoleManager<IdentityRole<int>> roleManager)
        {
            _userManager = userManager;
            _configuration = configuration;
            _roleManager = roleManager;

        }

        // GET: api/AppUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUserDataTransferObject>>> GetAppUsers()
        {
            var users = await _userManager.Users
                .Include(u => u.Orders)
                .Select(u => new AppUserDataTransferObject
                {
                    Id = u.Id,
                    Username = u.UserName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    ImageUrl = u.ImageUrl,
                    Orders = u.Orders.Select(o => new OrderDataTransferObject
                    {
                        OrderId = o.OrderId,
                        OrderDate = o.OrderDate,
                        TotalAmount = o.TotalAmount,
                        Status = o.Status,
                        ShippingAddress = o.ShippingAddress,
                        OrderItems = o.OrderItems.Select(oi => new OrderItemDataTransferObject
                        {
                            OrderId = oi.OrderId,
                            BookId = oi.BookId,
                            Quantity = oi.Quantity,
                            PriceAtTimeOfPurchase = oi.PriceAtTimeOfPurchase
                        }).ToList()
                    }).ToList()
                }).ToListAsync();

            return Ok(users);
        }

        // GET: api/AppUsers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUserDataTransferObject>> GetAppUser(int id)
        {
            var appUser = await _userManager.Users
                .Include(u => u.Orders)
                .Select(u => new AppUserDataTransferObject
                {
                    Id = u.Id,
                    Username = u.UserName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    ImageUrl = u.ImageUrl,
                    Orders = u.Orders.Select(o => new OrderDataTransferObject
                    {
                        OrderId = o.OrderId,
                        OrderDate = o.OrderDate,
                        TotalAmount = o.TotalAmount,
                        Status = o.Status,
                        ShippingAddress = o.ShippingAddress,
                        OrderItems = o.OrderItems.Select(oi => new OrderItemDataTransferObject
                        {
                            OrderId = oi.OrderId,
                            BookId = oi.BookId,
                            Quantity = oi.Quantity,
                            PriceAtTimeOfPurchase = oi.PriceAtTimeOfPurchase
                        }).ToList()
                    }).ToList()
                })
                .FirstOrDefaultAsync(u => u.Id == id);

            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }






        // POST: api/AppUsers
        [HttpPost]
        public async Task<ActionResult<AppUser>> PostAppUser(AppUserDataTransferObject appUserDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Transform DTO to model
            AppUser appUser = new AppUser
            {
                UserName = appUserDto.Username,
                Email = appUserDto.Email,
                PhoneNumber = appUserDto.PhoneNumber,
                ImageUrl = appUserDto.ImageUrl
                // Map additional properties if any
            };

            var result = await _userManager.CreateAsync(appUser, "DefaultPassword123!"); // Optionally set a default password

            if (result.Succeeded)
            {
                AppUserDataTransferObject createdUserDto = new AppUserDataTransferObject
                {
                    Id = appUser.Id,
                    Username = appUser.UserName,
                    Email = appUser.Email,
                    PhoneNumber = appUser.PhoneNumber,
                    ImageUrl = appUser.ImageUrl,
                    Orders = new List<OrderDataTransferObject>() // Map orders if necessary
                };
                return CreatedAtAction(nameof(GetAppUser), new { id = appUser.Id }, createdUserDto);
            }

            return BadRequest(result.Errors);
        }





        // PUT: api/AppUsers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppUser(int id, AppUserDataTransferObject appUserDTO)
        {
            if (id != appUserDTO.Id)
            {
                return BadRequest("Mismatched user ID.");
            }

            // Find the user in the database
            var appUser = await _userManager.FindByIdAsync(id.ToString());
            if (appUser == null)
            {
                return NotFound("User not found.");
            }

            // Update the user's properties
            appUser.UserName = appUserDTO.Username ?? appUser.UserName;
            appUser.Email = appUserDTO.Email ?? appUser.Email;
            appUser.PhoneNumber = appUserDTO.PhoneNumber ?? appUser.PhoneNumber;
            appUser.ImageUrl = appUserDTO.ImageUrl ?? appUser.ImageUrl;
            // Map additional fields as needed
            Console.WriteLine(appUser.Id);

            // Attempt to update the user in the database
            var result = await _userManager.UpdateAsync(appUser);
            if (result.Succeeded)
            {
                return NoContent();
            }

            return BadRequest(result.Errors);
        }




        // DELETE: api/AppUsers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUser(int id)
        {
            var appUser = await _userManager.FindByIdAsync(id.ToString());
            if (appUser == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(appUser);

            if (result.Succeeded)
            {
                return NoContent();
            }

            return BadRequest(result.Errors);
        }





        // Custom method to get user ID from token
        [HttpPost("id-from-token")]
        public async Task<ActionResult<int>> GetUserIdFromToken([FromBody] string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("Token is missing in the request body.");
            }

            var parts = token.Split('.');
            if (parts.Length != 3)
            {
                return BadRequest("Token format is invalid.");
            }

            var signingKey = _configuration["JwtSettings:SecretKey"];
            if (string.IsNullOrEmpty(signingKey))
            {
                return StatusCode(500, "Signing key is not configured. Check your appsettings.json or environment variables.");
            }

            var principal = ValidateToken(token, signingKey);
            if (principal == null)
            {
                return Unauthorized("Invalid token.");
            }

            var userId = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return NotFound("User ID not found in token.");
            }

            return Ok(int.Parse(userId));
        }

        // Token validation method
        private ClaimsPrincipal ValidateToken(string token, string signingKey)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(signingKey);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return principal;
            }
            catch
            {
                return null;
            }
        }







        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] AppUserPasswordChangeDataTransferObject model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.UserId) ||
                string.IsNullOrWhiteSpace(model.CurrentPassword) ||
                string.IsNullOrWhiteSpace(model.NewPassword))
            {
                return BadRequest("Invalid input");
            }

            // Assuming you're using Identity
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var isOldPasswordValid = await _userManager.CheckPasswordAsync(user, model.CurrentPassword);
            if (!isOldPasswordValid)
            {
                return Unauthorized("Old password is incorrect");
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.FirstOrDefault()?.Description ?? "Failed to change password");
            }

            return Ok("Password updated successfully");
        }










        // Get roles of a user
        [HttpGet("{userId}/roles")]
        public async Task<IActionResult> GetUserRoles(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return NotFound("User not found.");

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }

        // Assign a role to a user
        [HttpPost("{userId}/roles/{roleName}")]
        public async Task<IActionResult> AssignRoleToUser(int userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return NotFound("User not found.");

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
                return NotFound("Role not found.");

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (!result.Succeeded)
                return BadRequest("Failed to assign role.");

            return Ok("Role assigned successfully.");
        }

        // Remove a role from a user
        [HttpDelete("{userId}/roles/{roleName}")]
        public async Task<IActionResult> RemoveRoleFromUser(int userId, string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return NotFound("User not found.");

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
                return NotFound("Role not found.");

            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            if (!result.Succeeded)
                return BadRequest("Failed to remove role.");

            return Ok("Role removed successfully.");
        }






        [HttpPut("{userId}/roles")]
        public async Task<IActionResult> UpdateUserRoles(string userId, [FromBody] List<string> roles)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);
            await _userManager.AddToRolesAsync(user, roles);

            return Ok(new { message = "Roles updated successfully." });
        }




















    }
}
