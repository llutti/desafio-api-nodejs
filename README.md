# Desafio API NodeJS

Projeto "Desafio API NodeJS" apresentado pela Rocketseat em Agosto de 2025.

## Descrição

Esta é uma API RESTful desenvolvida em NodeJS com Fastify e TypeScript. A API permite o gerenciamento de cursos, incluindo a criação e consulta de cursos. O projeto utiliza Drizzle ORM para interação com o banco de dados PostgreSQL.

## Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/llutti/desafio-api-nodejs.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente. Renomeie o arquivo `.env.example` para `.env` e preencha com as informações do seu banco de dados:
    ```bash
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```
4.  Execute as migrações do banco de dados:
    ```bash
    npm run db:migrate
    ```

## Execução

Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:7001`.

## Scripts

*   `npm run dev`: Inicia o servidor em modo de desenvolvimento com watch mode.
*   `npm run db:generate`: Gera os arquivos de migração do Drizzle.
*   `npm run db:migrate`: Executa as migrações do banco de dados.
*   `npm run db:studio`: Abre o Drizzle Studio para visualizar e gerenciar o banco de dados.
*   `npm run lint`: Executa o linter para verificar o código.

## API Endpoints

A API possui os seguintes endpoints:

*   `POST /courses`: Cria um novo curso.
*   `GET /courses`: Retorna uma lista de todos os cursos.
*   `GET /courses/:id`: Retorna um curso específico pelo seu ID.

## Tecnologias

*   [Node.js](https://nodejs.org/)
*   [Fastify](https://www.fastify.io/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Drizzle ORM](https://orm.drizzle.team/)
*   [PostgreSQL](https://www.postgresql.org/)
*   [Zod](https://zod.dev/)

## Estrutura do Banco de Dados

Abaixo está a estrutura das tabelas do banco de dados.

### Tabela `users`

| Coluna | Tipo   | Restrições       |
|--------|--------|------------------|
| id     | uuid   | Chave Primária   |
| name   | text   | Não Nulo         |
| email  | text   | Não Nulo, Único  |

### Tabela `courses`

| Coluna      | Tipo   | Restrições       |
|-------------|--------|------------------|
| id          | uuid   | Chave Primária   |
| title       | text   | Não Nulo, Único  |
| description | text   |                  |

## Diagrama de Entidade e Relacionamento

O diagrama abaixo descreve a estrutura do banco de dados.

```mermaid
erDiagram
    users {
        uuid id PK
        text name
        text email
    }
    courses {
        uuid id PK
        text title
        text description
    }
```

## Fluxo de Execução

O diagrama abaixo descreve o fluxo principal de execução da aplicação.

```mermaid
sequenceDiagram
    participant Client
    participant "Server (Fastify)"
    participant "Database (PostgreSQL)"

    Client->>"Server (Fastify)": HTTP Request
    "Server (Fastify)"->>"Database (PostgreSQL)": Database Query (Drizzle)
    "Database (PostgreSQL)"-->>"Server (Fastify)": Query Result
    "Server (Fastify)"-->>Client: HTTP Response
```

## Licença

Este projeto está licenciado sob a licença ISC.
