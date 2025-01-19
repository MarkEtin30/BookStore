using Common.Data_Transfer_Object;
using Data_Access_Layer_ASP.NET_Core.Data;
using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object;
using Microsoft.EntityFrameworkCore;

public class BookRepository : IBookRepository
{
    private readonly Data_Access_Layer_ASPNET_CoreContext _context;

    public BookRepository(Data_Access_Layer_ASPNET_CoreContext context)
    {
        _context = context;
    }

    // Add a new book
    public async Task<Book> AddBookAsync(CreateBookDataTransferObject bookDto)
    {
        // Validate input
        if (bookDto == null || bookDto.Categories == null || !bookDto.Categories.Any())
        {
            throw new ArgumentException("Invalid book data provided.");
        }

        // Manually map the DTO to the Book model
        Book book = new Book
        {
            Title = bookDto.Title,
            Description = bookDto.Description,
            Language = bookDto.Language,
            Price = bookDto.Price,
            ImageUrl = bookDto.ImageUrl,
            Author = bookDto.Author,             // Added Author field
            Publisher = bookDto.Publisher,       // Added Publisher field
            PublicationDate = bookDto.PublicationDate // Added PublicationDate field
        };

        // Fetch categories based on the IDs passed in the DTO
        List<Category> categories = await _context.Categories
            .Where(c => bookDto.Categories.Contains(c.Id))
            .ToListAsync();

        // Handle case where categories are not found
        if (categories.Count != bookDto.Categories.Count)
        {
            throw new KeyNotFoundException("One or more categories were not found.");
        }

        // Create relationships for Book-Category (Many-to-Many)
        book.BookCategories = categories.Select(c => new BookCategory
        {
            Book = book,
            Category = c
        }).ToList();

        // Save the book and its categories to the database
        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();

        return book;  // Return the created Book entity
    }

    public Task AddAsync(Book entity)
    {
        throw new NotImplementedException();
    }


    // Delete a book by id
    public async Task DeleteAsync(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            throw new ArgumentException("Book not found.");
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
    }



    // Get all books
    public async Task<IEnumerable<BookDataTransferObject>> GetAllBooksAsync()
    {
        return await _context.Books
                             .Include(b => b.BookCategories)
                             .ThenInclude(bc => bc.Category)
                             .Select(b => new BookDataTransferObject
                             {
                                 Id = b.Id,
                                 Title = b.Title,
                                 Description = b.Description,
                                 Language = b.Language,
                                 Price = b.Price,
                                 ImageUrl = b.ImageUrl,
                                 Author = b.Author,             // Added Author field
                                 Publisher = b.Publisher,       // Added Publisher field
                                 PublicationDate = b.PublicationDate, // Added PublicationDate field
                                 Categories = b.BookCategories.Select(bc => new CategoryDataTransferObject
                                 {
                                     Id = bc.Category.Id,
                                     Name = bc.Category.Name
                                 }).ToList()
                             })
                             .ToListAsync();
    }



    // Get a book by id
    public async Task<BookDataTransferObject> GetSingleBookByIdAsync(int id)
    {
        var book = await _context.Books
                                 .Include(b => b.BookCategories)
                                 .ThenInclude(bc => bc.Category)
                                 .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
        {
            return null;
        }

        return new BookDataTransferObject
        {
            Id = book.Id,
            Title = book.Title,
            Description = book.Description,
            Language = book.Language,
            Price = book.Price,
            ImageUrl = book.ImageUrl,
            Author = book.Author,             // Added Author field
            Publisher = book.Publisher,       // Added Publisher field
            PublicationDate = book.PublicationDate, // Added PublicationDate field
            Categories = book.BookCategories.Select(bc => new CategoryDataTransferObject
            {
                Id = bc.Category.Id,
                Name = bc.Category.Name
            }).ToList()
        };
    }


    // Save changes to the database
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    // Update an existing book
    public async Task UpdateAsync(Book entity)
    {
        var book = await _context.Books.FindAsync(entity.Id);
        if (book != null)
        {
            // Update the book properties
            book.Title = entity.Title;
            book.Description = entity.Description;
            book.Language = entity.Language;
            book.Price = entity.Price;
            book.ImageUrl = entity.ImageUrl;

            book.Author = entity.Author;             // Added Author field
            book.Publisher = entity.Publisher;      // Added Publisher field
            book.PublicationDate = entity.PublicationDate;


            // Mark the sbook as modified
            _context.Books.Update(book);

            // Save changes to the database
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Book not found");
        }
    }

    Task<Book> IRepository<Book>.AddAsync(Book entity)
    {
        throw new NotImplementedException();
    }


    public async Task<Book> UpdateBookAsync(int id, CreateBookDataTransferObject bookDto)
    {


        // Find the existing book
        Book? book = await _context.Books
            .Include(b => b.BookCategories) // Include existing BookCategory relationships
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
        {
            throw new KeyNotFoundException($"Book with ID {id} not found.");
        }

        // Update book fields
        book.Title = bookDto.Title;
        book.Description = bookDto.Description;
        book.Price = bookDto.Price;
        book.Language = bookDto.Language;
        book.ImageUrl = bookDto.ImageUrl;

        book.Author = bookDto.Author;             // Added Author field
        book.Publisher = bookDto.Publisher;      // Added Publisher field
        book.PublicationDate = bookDto.PublicationDate;

        // Fetch categories based on the IDs passed in the DTO
        List<Category> categories = await _context.Categories
            .Where(c => bookDto.Categories.Contains(c.Id))
            .ToListAsync();

        // Validate categories
        if (categories.Count != bookDto.Categories.Count)
        {
            throw new KeyNotFoundException("One or more categories were not found.");
        }

        // Update the BookCategories relationship
        book.BookCategories.Clear(); // Remove old relationships
        book.BookCategories = categories.Select(c => new BookCategory
        {
            BookId = book.Id,
            CategoryId = c.Id
        }).ToList();

        // Save changes to the database
        _context.Books.Update(book); // Mark the book entity as modified
        await _context.SaveChangesAsync();

        return book;
    }

    public Task<IEnumerable<Book>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Book> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }
}