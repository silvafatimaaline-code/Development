// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model'; 

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private apiUrl = 'http://localhost:5000/api/Usuarios';

    constructor(private http: HttpClient) { }

    // Incluir usuário
    incluirUsuario(usuario: Usuario): Observable<Usuario> {
        // remove idUsuario se existir, para não enviar no POST
        const { idUsuario, ...usuarioParaEnviar } = usuario;
        return this.http.post<Usuario>(this.apiUrl, usuarioParaEnviar);
    }

    // Carregar usuários
    listarUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }

    // Exemplo de deletar
    deleteUsuario(id: number) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Atualizar usuário
    atualizarUsuario(id: number, usuario: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, usuario);
    }

    // Obter usuário por ID
    obterUsuarioPorId(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    // Verificar se login já existe
    verificarLogin(usuarioLogin: string): Observable<boolean> {
        return this.http.get<Usuario[]>(`${this.apiUrl}`).pipe(
            map(usuarios => usuarios.some(u => u.usuarioLogin === usuarioLogin))
        );
    }
}
