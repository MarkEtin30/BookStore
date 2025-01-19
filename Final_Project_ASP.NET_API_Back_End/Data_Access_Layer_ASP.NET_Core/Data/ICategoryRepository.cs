using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object;

public interface ICategoryRepository
{
    Task<IEnumerable<CategoryDataTransferObject>> GetAllCategoriesAsync();
    Task<Category?> GetByIdAsync(int id);
    Task<Category> AddAsync(Category entity);
    Task UpdateAsync(Category entity);
    Task DeleteAsync(int id);
}
