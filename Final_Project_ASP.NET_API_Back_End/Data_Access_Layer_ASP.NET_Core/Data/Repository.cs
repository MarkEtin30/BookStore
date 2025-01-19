using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer_ASPNET_Core.Data
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        // Use readonly to ensure that DbSet is not reassigned after it's initialized.
        protected readonly Data_Access_Layer_ASPNET_CoreContext _context;
        protected readonly DbSet<T> DbSet;

        // Constructor that initializes context and DbSet
        public Repository(Data_Access_Layer_ASPNET_CoreContext context)
        {
            _context = context;
            DbSet = context.Set<T>(); // Set the DbSet for the specific entity type
        }

        // Asynchronous Add method
        public virtual async Task AddAsync(T entity)
        {
            await DbSet.AddAsync(entity);
            await _context.SaveChangesAsync();  // Save changes asynchronously
        }

        // Asynchronous Delete by id
        public virtual async Task DeleteAsync(int id)
        {
            var item = await GetByIdAsync(id);
            if (item != null)
            {
                await DeleteAsync(item);  // Asynchronously delete the entity
            }
            else
            {
                throw new ArgumentException("Item not found");
            }
        }

        // Asynchronous Delete by entity
        public virtual async Task DeleteAsync(T entity)
        {
            DbSet.Remove(entity);
            await _context.SaveChangesAsync();  // Save changes asynchronously
        }

        // Asynchronous Delete by condition (predicate)
        public virtual async Task DeleteAsync(Expression<Func<T, bool>> predicate)
        {
            var entities = await FindAllAsync(predicate);
            DbSet.RemoveRange(entities);
            await _context.SaveChangesAsync();  // Save changes asynchronously
        }

        // Asynchronous FindAll (filter by condition)
        public virtual async Task<IEnumerable<T>> FindAllAsync(Expression<Func<T, bool>> predicate)
        {
            return await DbSet.Where(predicate).ToListAsync();
        }

        // Asynchronous FindOne (single entity by condition)
        public virtual async Task<T?> FindOneAsync(Expression<Func<T, bool>> predicate)
        {
            return await DbSet.SingleOrDefaultAsync(predicate);
        }

        // Asynchronous GetAll
        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await DbSet.ToListAsync();
        }

        // Asynchronous GetById
        public virtual async Task<T?> GetByIdAsync(int id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        // Asynchronous Update
        public virtual async Task UpdateAsync(T entity)
        {
            DbSet.Update(entity);
            await _context.SaveChangesAsync();  // Save changes asynchronously
        }

        Task<T> IRepository<T>.AddAsync(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
