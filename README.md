# 🚀 Sistema de Autenticação e Gerenciamento de Usuários (Sisand)

> Uma solução full-stack para cadastro, autenticação e gerenciamento de usuários, construída com .NET e Angular.

Uma aplicação completa que oferece uma API RESTful segura para operações de usuário e um frontend reativo para interação. O projeto serve como uma base sólida para sistemas que necessitam de controle de acesso baseado em autenticação JWT.

---

## ✨ Funcionalidades Principais

* **Autenticação de Usuários:** Geração de token JWT no login.
* **Gerenciamento de Usuários (CRUD):** API para criar, ler, atualizar e deletar usuários.
* **Frontend Intuitivo:** Interface para listar e interagir com os dados dos usuários.
* **Segurança:** Rotas de API protegidas que exigem autenticação.

---

## 🛠️ Tecnologias Utilizadas

Esta seção lista as principais tecnologias, linguagens e frameworks usados no projeto.

* **Backend:**
  * **Linguagem:** C#
  * **Framework:** .NET 8 (ASP.NET Core Web API)
  * **ORM:** Entity Framework Core
  * **Autenticação:** JWT (JSON Web Tokens)
* **Frontend:**
  * **Linguagem:** TypeScript
  * **Framework:** Angular 16
  * **Estilização:** Bootstrap
* **Banco de Dados:**
  * **SGBD:** Microsoft SQL Server
* **Gerenciamento de Dependências:**
  * **Backend:** NuGet
  * **Frontend:** npm

---

## 🏁 Como Começar (Getting Started)

Siga estes passos para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### *Pré-requisitos*

* **[.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)**
* **[Node.js e npm](https://nodejs.org/)**
* **[Angular CLI](https://angular.io/cli)**
* **[SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads)** (Express ou Developer Edition)

### *Instalação e Execução*

#### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/sisand_full.git
cd sisand_full
```

#### 2. Configure o Banco de Dados
1.  Restaure o backup do banco de dados localizado em `Backup/Sisand.bak` para a sua instância do SQL Server.
2.  Abra o arquivo `sisand-backend/SisandApi/appsettings.json`.
3.  Atualize a string de conexão `SisandConnection` para apontar para a sua instância do SQL Server, se necessário.

    ```json
    "ConnectionStrings": {
      "SisandConnection": "Server=SUA_INSTANCIA_SQL;Database=Sisand;Trusted_Connection=True;TrustServerCertificate=True;"
    }
    ```

#### 3. Execute o Backend (.NET API)
```bash
# Navegue até o diretório da API
cd sisand-backend/SisandApi

# Instale as dependências do NuGet (geralmente automático com o build)
dotnet restore

# Execute a aplicação
dotnet run
```
A API estará disponível em `http://localhost:5000` e `https://localhost:5001`.

#### 4. Execute o Frontend (Angular)
```bash
# Em um novo terminal, navegue até o diretório do frontend
cd sisand-frontend

# Instale as dependências do npm
npm install

# Inicie o servidor de desenvolvimento
npm start
```
A aplicação web será aberta automaticamente no seu navegador em `http://localhost:4200`.

---

## 🧪 Executando os Testes

Para rodar a suíte de testes do frontend, execute o seguinte comando no diretório `sisand-frontend`:

```bash
npm test
```

---

## 📂 Estrutura do Projeto

```
.
├── sisand-backend/
│   └── SisandApi/            # Projeto da API .NET
│       ├── Controllers/      # Endpoints da API (AuthController, UsuariosController)
│       ├── Data/             # Contexto do Entity Framework
│       ├── Models/           # Modelos de dados e DTOs
│       ├── Services/         # Lógica de negócio
│       ├── appsettings.json  # Configurações da aplicação (ex: Connection String)
│       └── Program.cs        # Ponto de entrada da API
├── sisand-frontend/
│   └── src/app/              # Código-fonte do Angular
│       ├── models/           # Modelos/interfaces do frontend
│       ├── pages/            # Componentes de página (Login, Usuários)
│       ├── services/         # Serviços (AuthService, UsuarioService)
│       ├── app-routing.module.ts # Configuração de rotas
│       └── app.module.ts     # Módulo principal da aplicação
├── Backup/
│   └── Sisand.bak            # Backup do banco de dados SQL Server
└── README.md                 # Este arquivo
```

---

## 🤝 Como Contribuir

Instruções para quem deseja contribuir com o projeto.

1.  Faça um Fork do projeto
2.  Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Faça o Commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4.  Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5.  Abra um Pull Request

---

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.