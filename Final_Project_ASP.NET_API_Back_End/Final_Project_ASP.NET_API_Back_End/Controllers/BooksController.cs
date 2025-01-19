using Data_Access_Layer_ASP.NET_Core.Data;
using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]

public class BooksController : ControllerBase
{
    private readonly IBookRepository _bookRepository;

    public BooksController(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    [HttpPost("")]
    public async Task<IActionResult> CreateBook([FromBody] CreateBookDataTransferObject bookDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }


        // Add the book asynchronously and get the created book
        CreateBookDataTransferObject bookDto1 = bookDto;
        Book createdBook = await _bookRepository.AddBookAsync(bookDto1);

        // Return a "201 Created" response with the location header and the created book's data
        return CreatedAtAction(
            nameof(GetBook), // Action that fetches the created book
            new { id = createdBook.Id }, // Route parameter that identifies the created resource
            createdBook // The body of the response containing the created book
        );
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        await _bookRepository.DeleteAsync(id);
        return NoContent();
    }




    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAllBooks()
    {
        IEnumerable<Common.Data_Transfer_Object.BookDataTransferObject> books = await _bookRepository.GetAllBooksAsync();
        return Ok(books);
    }




    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(int id)
    {
        var book = await _bookRepository.GetSingleBookByIdAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        return Ok(book);
    }




    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, [FromBody] CreateBookDataTransferObject bookDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }


        if (id != bookDto.Id)
        {
            return BadRequest("Book ID in the URL and body do not match.");
        }

        var existingBook = await _bookRepository.GetSingleBookByIdAsync(id);
        if (existingBook == null)
        {
            return NotFound($"No book found with ID {id}.");
        }

        // Update the book using the repository
        Book updatedBook = await _bookRepository.UpdateBookAsync(id, bookDto);

        // Return the updated book
        return Ok(updatedBook);
    }

}
