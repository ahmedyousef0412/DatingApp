using API.Data;
using API.Entities;

namespace API.Interfaces.Implementation;

public class UnitOfWork(ApplicationDbContext context , IMapper mapper ,ILogger<UnitOfWork> logger) : IUnitOfWork
{
    private readonly IMapper _mapper = mapper;
    private readonly ApplicationDbContext _context = context;
    private readonly ILogger<UnitOfWork> _logger = logger;
    public ApplicationDbContext Context => _context;
    public IBaseRepository<ApplicationUser> Users => new BaseRepository<ApplicationUser>(_context);
    public IBaseRepository<Photo> Photos => new BaseRepository<Photo>(_context);

    public IUserRpository UserRpository => new UserRpository(_context ,_mapper );

    public async Task<bool> Complete()
    {
        try
        {
            var savedEntitiesCount = await _context.SaveChangesAsync();
            return savedEntitiesCount > 0;
        }
        catch (Exception ex)
        {
            // Log the exception and rethrow it or handle it as necessary
            _logger.LogError(ex, "An error occurred while saving changes to the database.");
            return false;
        }
    }
}
