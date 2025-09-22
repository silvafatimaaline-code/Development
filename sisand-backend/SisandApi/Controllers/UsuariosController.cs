using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SisandApi.Data;
using SisandApi.Models;

namespace SisandApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly SisandContext _context;

        public UsuariosController(SisandContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // GET: api/Usuarios/verificar-login/ana
        [HttpGet("verificar-login/{login}")]
        public async Task<ActionResult<bool>> VerificarLogin(string login)
        {
            bool existe = await _context.Usuarios.AnyAsync(u => u.UsuarioLogin == login);
            return Ok(existe);
        }

        // POST: api/Usuarios
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario([FromBody] Usuario usuario)
        {
            // 🔎 Verifica duplicidade
            var existe = await _context.Usuarios
                .AnyAsync(u => u.UsuarioLogin == usuario.UsuarioLogin);

            if (existe)
            {
                return BadRequest(new { mensagem = "Já existe um usuário com este login." });
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuario);
        }

        // PUT: api/Usuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, [FromBody] Usuario usuario)
        {
            if (id != usuario.IdUsuario)
            {
                return BadRequest(new { mensagem = "ID informado não confere com o usuário." });
            }

            // 🔎 Verifica duplicidade em edição
            var existe = await _context.Usuarios
                .AnyAsync(u => u.UsuarioLogin == usuario.UsuarioLogin && u.IdUsuario != id);

            if (existe)
            {
                return BadRequest(new { mensagem = "Já existe outro usuário com este login." });
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Usuarios.Any(e => e.IdUsuario == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
