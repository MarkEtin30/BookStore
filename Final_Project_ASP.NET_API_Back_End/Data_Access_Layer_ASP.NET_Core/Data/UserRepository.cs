using Data_Access_Layer_ASP.NET_Core.Models;

using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer_ASP.NET_Core.Data
{
    public class UserRepository
    {
        private readonly Data_Access_Layer_ASPNET_CoreContext _context;

        public UserRepository(Data_Access_Layer_ASPNET_CoreContext context)
        {
            _context = context;
        }

        // Method to retrieve user by ID
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
                                 .AsNoTracking()
                                 .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
