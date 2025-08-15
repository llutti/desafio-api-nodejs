# Desafio API NodeJS


![Status do Build](https://img.shields.io/badge/build-passing-brightgreen)

Projeto "Desafio API NodeJS" apresentado pela [Rocketseat](https://rocketseat.com.br/) em Agosto de 2025.

## Sumário

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Execução](#execução)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Exemplos de Uso](#exemplos-de-uso)
- [Fluxo de Autenticação](#fluxo-de-autenticação)
- [Tecnologias](#tecnologias)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Diagrama de Entidade e Relacionamento](#diagrama-de-entidade-e-relacionamento)
- [Fluxo de Execução](#fluxo-de-execução)
- [Boas Práticas de Segurança](#boas-práticas-de-segurança)
- [Contato](#contato)
- [Licença](#licença)

## Descrição

Esta é uma API RESTful desenvolvida em NodeJS com Fastify e TypeScript. A API permite o gerenciamento de cursos, incluindo a criação, consulta e listagem de cursos. O projeto utiliza Drizzle ORM para interação com o banco de dados PostgreSQL, Zod para validação de schemas e Vitest para testes.

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
5.  (Opcional) Popule o banco de dados com dados de teste:
    ```bash
    npm run db:seed
    ```

## Execução

Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:7001`.

A API também disponibiliza uma documentação interativa usando Swagger, que pode ser acessada em `http://localhost:7001/docs`.

## Scripts

*   `npm run dev`: Inicia o servidor em modo de desenvolvimento com watch mode.
*   `npm run start`: Inicia o servidor em modo de produção.
*   `npm run db:generate`: Gera os arquivos de migração do Drizzle.
*   `npm run db:migrate`: Executa as migrações do banco de dados.
*   `npm run db:seed`: Popula o banco de dados com dados de teste.
*   `npm run db:studio`: Abre o Drizzle Studio para visualizar e gerenciar o banco de dados.
*   `npm run lint`: Executa o linter para verificar o código.
*   `npm test`: Executa os testes da aplicação.

## API Endpoints

A API possui os seguintes endpoints:

*   `POST /login`: Autentica um usuário e retorna um token JWT.
    *   **Request Body:**
        ```json
        {
          "email": "string",
          "password": "string"
        }
        ```
    *   **Response (200):**
        ```json
        {
          "token": "string"
        }
        ```
*   `POST /courses`: Cria um novo curso.
    *   **Request Body:**
        ```json
        {
          "title": "string",
          "description": "string"
        }
        ```
    *   **Response (201):**
        ```json
        {
          "courseId": "uuid"
        }
        ```
*   `GET /courses`: Retorna uma lista de todos os cursos.
    *   **Query Params:**
        *   `search` (string, opcional): Filtra os cursos pelo título.
        *   `orderBy` (string, opcional, 'id' ou 'title'): Ordena os cursos.
        *   `page` (number, opcional): Paginação dos resultados.
    *   **Response (200):**
        ```json
        {
          "courses": [
            {
              "id": "uuid",
              "title": "string",
              "enrollments": "number"
            }
          ],
          "total": "number"
        }
        ```
*   `GET /courses/:id`: Retorna um curso específico pelo seu ID.
    *   **Response (200):**
        ```json
        {
          "course": {
            "id": "uuid",
            "title": "string",
            "description": "string"
          }
        }
        ```

    ## Exemplos de Uso

    ### Autenticação (Login)

    ```bash
    curl -X POST http://localhost:7001/login \
        -H "Content-Type: application/json" \
        -d '{"email": "usuario@exemplo.com", "password": "senha123"}'
    # Resposta esperada:
    # { "token": "<jwt>" }
    ```

    ### Criar Curso

    ```bash
    curl -X POST http://localhost:7001/courses \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer <token>" \
        -d '{"title": "Node.js", "description": "Curso de Node"}'
    # Resposta esperada:
    # { "courseId": "<uuid>" }
    ```

    ### Listar Cursos

    ```bash
    curl "http://localhost:7001/courses?search=node&page=1&orderBy=title" \
        -H "Authorization: Bearer <token>"
    # Resposta esperada:
    # {
    #   "courses": [ { "id": "<uuid>", "title": "Node.js", "enrollments": 10 } ],
    #   "total": 1
    # }
    ```

    ### Buscar Curso por ID

    ```bash
    curl http://localhost:7001/courses/<id> \
        -H "Authorization: Bearer <token>"
    # Resposta esperada:
    # {
    #   "course": { "id": "<uuid>", "title": "Node.js", "description": "Curso de Node" }
    # }
    ```

  ## Fluxo de Autenticação

  1. O usuário faz login via `POST /login` e recebe um token JWT.
  2. Para acessar rotas protegidas (ex: criar/listar cursos), envie o token no header:
        ```
        Authorization: Bearer <token>
        ```
  3. O token é validado pelo middleware JWT. Se inválido, a API retorna 401.
  4. Usuários não autorizados recebem 403.
  5. Para testar, crie um usuário no banco ou utilize o seed (caso disponível).

  ## Tecnologias

  *   [Node.js](https://nodejs.org/)
  *   [Fastify](https://www.fastify.io/)
  *   [TypeScript](https://www.typescriptlang.org/)
  *   [Drizzle ORM](https://orm.drizzle.team/)
  *   [PostgreSQL](https://www.postgresql.org/)
  *   [Zod](https://zod.dev/)
  *   [Vitest](https://vitest.dev/)
  *   [@fastify/swagger](https://github.com/fastify/fastify-swagger)
  *   [@scalar/fastify-api-reference](https://github.com/scalar/scalar)
  *   [Pino Pretty](https://github.com/pinojs/pino-pretty)

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

### Tabela `enrollments`

| Coluna      | Tipo      | Restrições                |
|-------------|-----------|---------------------------|
| id          | uuid      | Chave Primária            |
| userId      | uuid      | Chave Estrangeira (users) |
| courseId    | uuid      | Chave Estrangeira (courses)|
| createdAt   | timestamp | Não Nulo                  |


## Diagrama de Entidade e Relacionamento

> Exemplo visual da estrutura (pode ser visualizado no VSCode ou em ferramentas compatíveis com Mermaid):

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
    enrollments {
        uuid id PK
        uuid userId FK
        uuid courseId FK
        timestamp createdAt
    }
    users ||--o{ enrollments : "has"
    courses ||--o{ enrollments : "has"
```

## Fluxo de Execução

> Exemplo visual do fluxo principal da aplicação:

O diagrama abaixo descreve o fluxo principal de execução da aplicação.

```mermaid
sequenceDiagram
    participant Client
    participant "Server (Fastify)"
    participant "JWT Middleware"
    participant "Role Middleware"
    participant "Zod"
    participant "Drizzle ORM"
    participant "Database (PostgreSQL)"

    Client->>Server (Fastify): HTTP Request (e.g., POST /courses)
    Server (Fastify)->>JWT Middleware: Verify JWT
    JWT Middleware-->>Server (Fastify): JWT Payload
    alt JWT is Valid
        Server (Fastify)->>Role Middleware: Check User Role
        Role Middleware-->>Server (Fastify): Role is Valid
        alt Role is Authorized
            Server (Fastify)->>Zod: Validate Request Body/Params
            Zod-->>Server (Fastify): Validation Result
            alt Request is Valid
                Server (Fastify)->>Drizzle ORM: Database Query
                Drizzle ORM->>Database (PostgreSQL): Execute SQL
                Database (PostgreSQL)-->>Drizzle ORM: SQL Result
                Drizzle ORM-->>Server (Fastify): Query Result
                Server (Fastify)-->>Client: HTTP Response (e.g., 201 Created)
            else Request is Invalid
                Server (Fastify)-->>Client: HTTP Response (e.g., 400 Bad Request)
            end
        else Role is Unauthorized
            Server (Fastify)-->>Client: HTTP Response (e.g., 403 Forbidden)
        end
    else JWT is Invalid
        Server (Fastify)-->>Client: HTTP Response (e.g., 401 Unauthorized)
    end
```

## Boas Práticas de Segurança

- Nunca compartilhe seu arquivo `.env` ou credenciais sensíveis.
- Use variáveis de ambiente para dados sigilosos.
- Altere a senha padrão do banco de dados.
- Utilize HTTPS em produção.
- Mantenha dependências sempre atualizadas.

## Contato

Autor: Luciano Cargnelutti
GitHub: [llutti](https://github.com/llutti)
LinkedIn: [linkedin.com/in/llutti](https://linkedin.com/in/llutti)

## Licença

Este projeto está licenciado sob a licença ISC.
