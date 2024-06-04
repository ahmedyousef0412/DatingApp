using API.Entities;

namespace API.Interfaces;

public interface IUnitOfWork
{

    IBaseRepository<ApplicationUser> Users { get; }
    IUserRpository  UserRpository { get; }
    IBaseRepository<Photo> Photos { get; }

    ApplicationDbContext Context { get; }

    Task<bool> Complete();
}
