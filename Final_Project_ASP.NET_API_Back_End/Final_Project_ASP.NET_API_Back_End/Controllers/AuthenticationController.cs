using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object;
using Final_Project_ASP.NET_API_Back_End.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Final_Project_ASP.NET_API_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly JwtSecurityService _jwtSecurityService;

        public AuthenticationController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<IdentityRole<int>> roleManager,
            JwtSecurityService jwtSecurityService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _jwtSecurityService = jwtSecurityService;
        }






        //[HttpPost("Register")]
        //public async Task<ActionResult> Register([FromBody] RegisterDataTransferObject registerDto)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    IdentityResult result = await _userManager.CreateAsync(registerDto.ToUser(), registerDto.Password);
        //    if (result.Succeeded)
        //    {



        //        return Ok(new { message = "Registration successful." });
        //    }

        //    var errors = result.Errors.Select(e => e.Description);
        //    return BadRequest(new { error = "Registration failed.", details = errors });
        //}
        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] RegisterDataTransferObject registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Convert DTO to AppUser object
            var user = registerDto.ToUser();



            // Check if the email already exists in the database
            var emailExists = await _userManager.Users.AnyAsync(u => u.Email == user.Email);

            if (emailExists == true)
            {
                return BadRequest("This email is already registered.");
            }

            // Create the user
            IdentityResult createUserResult = await _userManager.CreateAsync(user, registerDto.Password);

            if (!createUserResult.Succeeded)
            {
                var errors = createUserResult.Errors.Select(e => e.Description);
                return BadRequest(new { error = "User creation failed.", details = errors });
            }

            // Check if the "User" role exists
            var userRoleExists = await _roleManager.RoleExistsAsync("User");
            if (!userRoleExists)
            {
                // Create the "User" role (with integer key)
                var createRoleResult = await _roleManager.CreateAsync(new IdentityRole<int>("User"));
                if (!createRoleResult.Succeeded)
                {
                    var errors = createRoleResult.Errors.Select(e => e.Description);
                    return BadRequest(new { error = "Failed to create default role.", details = errors });
                }
            }

            // Assign the "User" role to the newly created user
            IdentityResult addToRoleResult = await _userManager.AddToRoleAsync(user, "User");

            if (addToRoleResult.Succeeded)
            {
                return Ok(new { message = "Registration successful with default role 'User'." });
            }
            else
            {
                var errors = addToRoleResult.Errors.Select(e => e.Description);
                return BadRequest(new { error = "Failed to assign default role.", details = errors });
            }
        }











        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginDataTranferObject loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser? user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user is null || user.UserName is null)
                return Unauthorized(new { error = "Invalid email or password." });

            Microsoft.AspNetCore.Identity.SignInResult result =
                await _signInManager.PasswordSignInAsync(user.UserName, loginDto.Password, false, false);

            if (!result.Succeeded)
                return Unauthorized(new { error = "Invalid email or password." });

            string token = await _jwtSecurityService.CreateToken(user);
            return Ok(new { token });
        }



    }
}
