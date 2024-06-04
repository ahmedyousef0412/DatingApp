using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Interfaces;

public interface IBaseRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync(bool withNoTracking = true);

    Task<IEnumerable<T>> GetAllAsync(string[]? includes = null);
    IQueryable<T> GetQueryable();

    Task<T?> GetByUserNameAsync(Expression<Func<T, bool>> predicate, string[]? includes = null);
   
    
    Task AddAsync(T entity);

    void Update(T entity);
    void Remove(T entity);






}
