using Microsoft.EntityFrameworkCore;
using SisandApi.Models;

namespace SisandApi.Data
{
    public class SisandContext : DbContext
    {
        public SisandContext(DbContextOptions<SisandContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; } = null!;
    }
}
