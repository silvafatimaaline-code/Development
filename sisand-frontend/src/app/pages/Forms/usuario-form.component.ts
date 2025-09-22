import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

    usuario: Usuario = {
        idUsuario: undefined,
        usuarioLogin: '',
        nomeUsuario: '',
        senha: '',
        ativo: 's'
    };

    senha: string = '';
    confirmacaoSenha: string = '';
    usuarioAtivoBoolean: boolean = true; // checkbox ativo
    idUsuario?: number; // usado para edição
    mensagemErro: string = '';

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
        if (this.idUsuario) {
            this.usuarioService.obterUsuarioPorId(this.idUsuario).subscribe({
                next: u => {
                    this.usuario = u;
                    this.usuarioAtivoBoolean = (u.ativo?.toLowerCase() === 's');
                    this.senha = u.senha;
                    this.confirmacaoSenha = u.senha;
                },
                error: err => console.error('Erro ao carregar usuário:', err)
            });
        }
    }

    salvarUsuario(): void {
        this.mensagemErro = '';

        // Validações básicas
        if (!this.usuario.nomeUsuario || !this.usuario.usuarioLogin || !this.senha) {
            this.mensagemErro = 'Preencha todos os campos obrigatórios!';
            return;
        }

        // Valida senha
        if (this.senha !== this.confirmacaoSenha) {
            this.mensagemErro = 'As senhas não conferem.';
            return;
        }

        // Atualiza campos antes de enviar
        this.usuario.senha = this.senha;
        this.usuario.ativo = this.usuarioAtivoBoolean ? 's' : 'n';

        // Verifica duplicidade de login antes de salvar
        this.usuarioService.verificarLogin(this.usuario.usuarioLogin).subscribe(existe => {
            if (existe && !this.usuario.idUsuario) {
                this.mensagemErro = 'Já existe um usuário com esse login.';
                return;
            }

            // Criação ou atualização
            if (this.usuario.idUsuario) {
                this.usuarioService.atualizarUsuario(this.usuario.idUsuario, this.usuario)
                    .subscribe({
                        next: () => {
                            alert('Usuário atualizado com sucesso!');
                            this.router.navigate(['/usuarios']);
                        },
                        error: err => {
                            console.error('Erro ao atualizar usuário:', err);
                            this.mensagemErro = err.error?.mensagem || 'Erro ao atualizar usuário.';
                        }
                    });
            } else {
                this.usuarioService.incluirUsuario(this.usuario)
                    .subscribe({
                        next: () => {
                            alert('Usuário criado com sucesso!');
                            this.router.navigate(['/usuarios']);
                        },
                        error: err => {
                            console.error('Erro ao criar usuário:', err);
                            this.mensagemErro = err.error?.mensagem || 'Erro ao criar usuário.';
                        }
                    });
            }
        });
    }

    cancelar(): void {
        this.router.navigate(['/usuarios']);
    }
}
