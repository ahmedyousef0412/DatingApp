using API.Entities;

namespace API.Interfaces;

public interface IUnitOfWork
{

    IBaseRepository<ApplicationUser> Users { get; }
    IBaseRepository<Photo> Photos { get; }

    Task<bool> SaveChangesAsync();
}
