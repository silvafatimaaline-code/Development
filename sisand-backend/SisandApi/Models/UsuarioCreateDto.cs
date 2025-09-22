using System.ComponentModel.DataAnnotations;

namespace PrimeiraApi.Models
{
    public class UsuarioCreateDto
    {
        [Required]
        public string UsuarioLogin { get; set; } = string.Empty;

        [Required]
        public string NomeUsuario { get; set; } = string.Empty;

        [Required]
        public string Senha { get; set; } = string.Empty;

        [Required]
        public string ConfirmacaoSenha { get; set; } = string.Empty;

        [Required]
        public string Ativo { get; set; } = string.Empty; // 's' ou 'n'
    }
}
