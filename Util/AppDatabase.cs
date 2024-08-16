using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ToDoList.ModelTO;

namespace ToDoList.Util
{
    public class AppDatabase : DbContext
    {
        public AppDatabase(DbContextOptions<AppDatabase>options): base (options)
        { 
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        public DbSet<Tarefa> Tarefa { get; set; }

    }
}
