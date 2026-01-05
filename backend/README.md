# Loya Backend API - SaaS E-commerce/PDV

Bem-vindo ao repositório da API do **Loya**, uma solução backend robusta e escalável desenvolvida para plataformas SaaS de E-commerce e Ponto de Venda (PDV). Este projeto foi arquitetado com foco em modularidade, segurança e performance, pronto para atender múltiplos inquilinos (Multi-tenancy) com controle de acesso granular (RBAC).

## 🚀 Visão Geral

O Loya Backend API é construído sobre o framework **NestJS**, aproveitando o poder do TypeScript para garantir tipagem estática e manutenibilidade. A arquitetura modular facilita a expansão e manutenção do código, permitindo que novas funcionalidades sejam adicionadas sem impactar o núcleo do sistema.

**Destaques:**
*   **Multi-tenancy:** Estrutura preparada para atender múltiplos clientes em uma única instância.
*   **RBAC (Role-Based Access Control):** Controle de permissões refinado para diferentes níveis de usuários (Admin, Gerente, Caixa).
*   **API Documentada:** Documentação completa e interativa via Swagger/OpenAPI.
*   **Prisma ORM:** Abstração de banco de dados moderna e segura.

## 🏗 Arquitetura & Stack Tecnológica

*   **Framework:** [NestJS](https://nestjs.com/) (Node.js)
*   **Linguagem:** TypeScript
*   **Banco de Dados:** SQLite (Dev/Demo) / PostgreSQL (Produção)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Autenticação:** JWT (JSON Web Tokens)
*   **Documentação:** Swagger (OpenAPI)
*   **Containerização:** Docker & Docker Compose

## ⚡ Setup Rápido (Demo Local)

Para facilitar a avaliação e o desenvolvimento, o projeto vem configurado para rodar instantaneamente usando **SQLite**. Você não precisa instalar nenhum banco de dados externo para testar.

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configure o banco de dados e popule com dados iniciais:**
    ```bash
    npx prisma migrate dev --name init
    npx prisma db seed
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run start:dev
    ```

O servidor estará rodando em `http://localhost:3000`.

## 🐳 Produção / Docker (PostgreSQL)

Para ambientes de produção ou se preferir usar um banco de dados mais robusto localmente, o projeto inclui configuração para **PostgreSQL** via Docker.

1.  **Ajuste as variáveis de ambiente:**
    Renomeie ou edite o arquivo `.env` para usar a conexão do PostgreSQL (veja `.env.example`).
    ```env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/loya_db?schema=public"
    ```

2.  **Suba os containers:**
    ```bash
    docker-compose up -d
    ```

3.  **Execute as migrações:**
    ```bash
    npx prisma migrate deploy
    ```

## 📚 Endpoints Principais & Documentação

A API possui documentação interativa gerada automaticamente pelo Swagger.

**Acesse a documentação completa em:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### Módulos Principais:
*   **Auth:** Login, Registro e Gerenciamento de Sessão.
*   **Users:** Gestão de usuários do sistema.
*   **Products:** Catálogo de produtos, estoque e preços.
*   **Customers:** Cadastro e gestão de clientes.
*   **PDV (Ponto de Venda):** Operações de caixa, vendas e fechamento.
*   **Orders:** Histórico e processamento de pedidos.

## 🔑 Credenciais de Acesso (Seed)

Ao rodar o `npx prisma db seed`, um usuário administrador padrão é criado para você acessar o sistema imediatamente:

*   **Email:** `admin@loya.com`
*   **Senha:** `Admin@123`

---
**Desenvolvido com ❤️ pela equipe Loya.**
