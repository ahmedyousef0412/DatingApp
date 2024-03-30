using API.Data;
using API.Entities;

namespace API.Interfaces.Implementation;

public class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
{

    private readonly ApplicationDbContext _context = context;

    public IBaseRepository<ApplicationUser> Users => new BaseRepository<ApplicationUser>(_context);
    public IBaseRepository<Photo> Photos => new BaseRepository<Photo>(_context);

    public async Task<bool> SaveChangesAsync()
    {
        var savedEntitiesCount = await _context.SaveChangesAsync();
        return savedEntitiesCount > 0;
    }
}
