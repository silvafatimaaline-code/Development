using SisandApi.Data;
using SisandApi.Dtos;
using Microsoft.AspNetCore.Mvc;
using SisandApi.Models;
using System.Linq;

namespace SisandApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SisandContext _context;

        public AuthController(SisandContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Usuario) || string.IsNullOrWhiteSpace(login.Senha))
                return BadRequest("Login ou senha inválidos");

            // Busca no banco considerando espaços e case-insensitive
            var usuario = _context.Usuarios
                .FirstOrDefault(u =>
                    u.UsuarioLogin.Trim().ToLower() == login.Usuario.Trim().ToLower() &&
                    u.Senha.Trim() == login.Senha.Trim() &&
                    u.Ativo.Trim().ToLower() == "s"
                );

            if (usuario == null)
                return Unauthorized("Login e/ou senha incorretos");

            // Login aprovado, retorna dados do usuário
            return Ok(new
            {
                IdUsuario = usuario.IdUsuario,
                NomeUsuario = usuario.NomeUsuario,
                UsuarioLogin = usuario.UsuarioLogin
            });
        }
    }
}
