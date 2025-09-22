namespace PrimeiraApi.Models
{
    public class UsuarioDto
    {
        public int IdUsuario { get; set; } 
        public string UsuarioLogin { get; set; } = string.Empty;
        public string NomeUsuario { get; set; } = string.Empty;
        public string Ativo { get; set; } = string.Empty;
    }
}
