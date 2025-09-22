using System.Collections.Generic;
using System.Threading.Tasks;
using PrimeiraApi.Models;

namespace PrimeiraApi.Services
{
    public interface IUsuarioService
    {
        Task<UsuarioDto> Authenticate(string usuario, string senha);
        Task<IEnumerable<UsuarioDto>> GetAll();
        Task<UsuarioDto> GetById(int id);
        Task<(bool success, string message)> Create(UsuarioCreateDto dto);
        Task<(bool success, string message)> Update(int id, UsuarioCreateDto dto);
        Task<bool> Delete(int id);
    }
}
