using Microsoft.EntityFrameworkCore;
using TelefonRehberim.Models;

namespace TelefonRehberim.Repositories
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options) : base(options) 
        {
            
        }
     
        public DbSet<Person> Persons { get; set; }

    }
}
