
using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object;
using Microsoft.EntityFrameworkCore;

public class CategoryRepository : ICategoryRepository
{
    private readonly Data_Access_Layer_ASPNET_CoreContext _context;

    public CategoryRepository(Data_Access_Layer_ASPNET_CoreContext context)
    {
        _context = context;
    }

    // Returns all categories as DTOs
    public async Task<IEnumerable<CategoryDataTransferObject>> GetAllCategoriesAsync()
    {
        return await _context.Categories
                             .Select(c => new CategoryDataTransferObject
                             {
                                 Id = c.Id,
                                 Name = c.Name
                             })
                             .ToListAsync();
    }

    // Gets a category by ID
    public async Task<Category?> GetByIdAsync(int id)
    {
        return await _context.Categories.FindAsync(id);
    }

    // Adds a new category
    public async Task<Category> AddAsync(Category entity)
    {
        _context.Categories.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    // Updates an existing category
    public async Task UpdateAsync(Category entity)
    {
        _context.Categories.Update(entity);
        await _context.SaveChangesAsync();
    }

    // Deletes a category by ID
    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Categories.FindAsync(id);
        if (entity != null)
        {
            _context.Categories.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    // This method isn't needed if not required
    // Task SaveChangesAsync() is already covered by the other methods like AddAsync, UpdateAsync, DeleteAsync
}
