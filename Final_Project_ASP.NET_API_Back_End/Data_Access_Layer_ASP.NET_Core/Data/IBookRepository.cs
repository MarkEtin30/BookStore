using Common.Data_Transfer_Object;
using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object;

namespace Data_Access_Layer_ASP.NET_Core.Data
{
    public interface IBookRepository : IRepository<Book>
    {
        Task<Book> AddBookAsync(CreateBookDataTransferObject bookDto1);
        Task<Book> UpdateBookAsync(int id, CreateBookDataTransferObject bookDto);

        Task<IEnumerable<BookDataTransferObject>> GetAllBooksAsync();

        Task<BookDataTransferObject> GetSingleBookByIdAsync(int id);
    }
}
