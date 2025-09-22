import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    usuarioLogin: string = '';
    senha: string = '';
    erroLogin: string = '';


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            usuario: ['', Validators.required],
            senha: ['', Validators.required]
        });
    }

    errorMessage: string = ''; // <- adiciona esta propriedade

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (res: any) => {
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/usuarios']);
                },
                error: err => {
                    console.error('Erro de login:', err);
                    // Aqui capturamos o erro 400 ou 401 da API
                    if (err.status === 400 || err.status === 401) {
                        this.errorMessage = 'Login e/ou senha incorretos';
                    } else {
                        this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
                    }
                }
            });
        }
    }


}
