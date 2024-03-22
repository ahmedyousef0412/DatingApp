using API.Entities;

namespace API.Interfaces;

public interface IUnitOfWork
{

    IBaseRepository<ApplicationUser> Users { get; }

    Task<int> SaveChangesAsync();
}
