// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Rotas
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Forms

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioFormComponent } from './pages/Forms/usuario-form.component';

// Interceptor (opcional)
import { AuthInterceptor } from './auth.interceptor';


providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UsuariosComponent,
        UsuarioFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,    // Necessário para <router-outlet>
        HttpClientModule,    // Necessário para chamadas HTTP
        FormsModule,         // Necessário para ngModel
        ReactiveFormsModule  // Necessário para FormBuilder / FormGroup
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
