
using API.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Interfaces.Implementation;

public class BaseRepository<T>(ApplicationDbContext context) : IBaseRepository<T> where T : class
{


    protected readonly ApplicationDbContext _context = context;

    public async Task AddAsync(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
    }

    public async Task<IEnumerable<T>> GetAllAsync(bool withNoTracking = true)
    {
        IQueryable<T> query =  _context.Set<T>();

        if(withNoTracking)
            query = query.AsNoTracking();

        return  await query.ToListAsync();
    }
    public async Task<IEnumerable<T>> GetAllAsync(string[]? includes = null)
    {
        IQueryable<T> query = _context.Set<T>();

        if (includes is not null)
            foreach (var include in includes)
                query = query.Include(include);

        return await query.ToListAsync();
    }

    public async Task<T?> GetByUserNameAsync(Expression<Func<T, bool>> predicate, string[]? includes = null)
    {
        IQueryable<T> query = _context.Set<T>();

        if (includes is not null)
            foreach (var include in includes)
                query = query.Include(include);



        return await query.SingleOrDefaultAsync(predicate);
    }

  

    public IQueryable<T> GetQueryable()
    {
        return _context.Set<T>();
    }

    public void Update(T entity)
    {
        _context.Set<T>().Update(entity);
    }
    public void Remove(T entity)
    {
        _context.Set<T>().Remove(entity);
    }

   
}
