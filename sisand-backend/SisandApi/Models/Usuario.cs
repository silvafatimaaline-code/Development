using System.ComponentModel.DataAnnotations;

namespace SisandApi.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }

        [Required]
        [MaxLength(50)]
        public string UsuarioLogin { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string NomeUsuario { get; set; } = string.Empty;

        [Required]
        public string Senha { get; set; } = string.Empty;

        [Required]
        [MaxLength(1)]
        public string Ativo { get; set; } = string.Empty; // 's' ou 'n'
    }
}
