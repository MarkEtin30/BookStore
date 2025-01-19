using Data_Access_Layer_ASP.NET_Core.Models;
using Final_Project_ASP.NET_API_Back_End.Data_Transfer_Object;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    // GET: api/categories
    [HttpGet("")]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryRepository.GetAllCategoriesAsync();
        return Ok(categories);
    }

    // GET: api/categories/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    // POST: api/categories
    [HttpPost("")]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDataTransferObject createCategoryDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }


        var category = new Category
        {
            Name = createCategoryDto.Name
        };

        var createdCategory = await _categoryRepository.AddAsync(category);
        return CreatedAtAction(nameof(GetCategory), new { id = createdCategory.Id }, createdCategory);
    }

    // PUT: api/categories/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDataTransferObject updateCategoryDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }



        if (id != updateCategoryDto.Id)
        {
            return BadRequest();
        }

        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        // Map the DTO to the entity
        category.Name = updateCategoryDto.Name;

        await _categoryRepository.UpdateAsync(category);

        return NoContent();
    }

    // DELETE: api/categories/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        await _categoryRepository.DeleteAsync(id);
        return NoContent();
    }
}
