import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];

    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) { }

    usuarioLogado: number;

    ngOnInit(): void {

        const usuarioSalvo = localStorage.getItem('usuario'); 
        if (usuarioSalvo) {
            const usuarioObj = JSON.parse(usuarioSalvo);
            this.usuarioLogado = usuarioObj.idUsuario; // pegar o ID do usuário logado
        }

        this.carregarUsuarios();
    }

    carregarUsuarios(): void {
        this.usuarioService.listarUsuarios().subscribe({
            next: (dados) => {
                this.usuarios = dados;
            },
            error: (err) => {
                console.error('Erro ao carregar usuários:', err);
            }
        });
    }

    logoff(): void {
        // Limpar dados do usuário/token
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        // Redirecionar para login
        this.router.navigate(['/login']);
    }

    editarUsuario(id: number): void {
        this.router.navigate(['/usuarios/editar', id]);
    }

    excluirUsuario(id: number): void {
        if (id === this.usuarioLogado) {
            alert('Você não pode excluir o usuário logado!');
            return; // impede exclusão
        }
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            this.usuarioService.deleteUsuario(id).subscribe({
                next: () => {
                    alert('Usuário excluído com sucesso!');
                    this.carregarUsuarios();
                },
                error: (err) => {
                    console.error('Erro ao excluir usuário:', err);
                    alert('Erro ao excluir usuário.');
                }
            });
        }
    }

    novoUsuario(): void {
        this.router.navigate(['/usuarios/novo']);
    }
}
