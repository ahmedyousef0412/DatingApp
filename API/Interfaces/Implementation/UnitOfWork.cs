using API.Data;
using API.Entities;

namespace API.Interfaces.Implementation;

public class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
{

    private readonly ApplicationDbContext _context = context;

    public IBaseRepository<ApplicationUser> Users => new BaseRepository<ApplicationUser>(_context);

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
